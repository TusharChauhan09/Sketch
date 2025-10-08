import { WebSocketServer, WebSocket } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";

import { JWT_SECRET } from "@repo/backend-common/config";
import { prismaClient } from "@repo/db/client";

interface User {
  userId: string;
  rooms: string[];
  ws: WebSocket;
}
const users: User[] = [];

const wss = new WebSocketServer({ port: 3002 });

function checkUser(token: string): string | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded || !(decoded as JwtPayload).userId) {
      return null;
    }
    return (decoded as JwtPayload).userId;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}

wss.on("connection", function connection(ws, req) {
  const url = req.url;
  if (!url) return;
  const query = new URLSearchParams(url.split("?")[1]);
  const token = query.get("token") ?? "";

  const userId = checkUser(token);
  if (userId == null) {
    ws.close(1008, "Unauthorized");
    return null;
  }

  const existingUser = users.find((user) => user.userId === userId);
  if (existingUser) {
    // Allow multiple connections from same user (for testing with multiple windows)
    users.push({ userId, rooms: [], ws });
  } else {
    users.push({ userId, rooms: [], ws });
  }

  ws.on("close", function close() {
    // Remove this WebSocket connection from users array
    const userIndex = users.findIndex((user) => user.ws === ws);
    if (userIndex !== -1) {
      users.splice(userIndex, 1);
    }
  });

  ws.on("message", async function message(data) {
    try {
      const parseData = JSON.parse(data.toString());

      if (parseData.type === "joinRoom") {
        const roomId = parseData.roomId;
        const user = users.find((user) => user.ws === ws);
        user?.rooms.push(roomId);
        ws.send(JSON.stringify({ type: "joinedRoom", roomId }));
      }

      if (parseData.type === "leaveRoom") {
        const roomId = parseData.roomId;
        const user = users.find((user) => user.ws === ws);
        if (!user) {
          return;
        }
        user.rooms = user.rooms.filter((room) => room !== roomId);
        ws.send(JSON.stringify({ type: "leftRoom", roomId }));
      }

      if (parseData.type === "chat") {
        const roomId = parseData.roomId;
        const measurement = parseData.measurement;
        const user = users.find((user) => user.ws === ws);
        if (!user || !user.rooms.includes(roomId)) {
          return;
        }

        const chat = await prismaClient.chat.create({
          data: {
            roomId,
            userId: user.userId,
            measurement,
          },
        });

        //console.log("Chat created:", chat);

        users.forEach((u) => {
          if (u.rooms.includes(roomId) && u.ws !== ws) {
            u.ws.send(
              JSON.stringify({
                type: "chat",
                roomId,
                measurement,
                sendersId: user.userId,
              })
            );
          }
        });
      }
    } catch (err) {
      console.error("Error processing message:", err);
      ws.send(
        JSON.stringify({ type: "error", message: "Invalid message format" })
      );
    }
  });
});
