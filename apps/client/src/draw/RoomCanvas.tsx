"use client";

import { useEffect, useRef, useState } from "react";
import DoubleContainer from "@/components/Auxiliary/DoubleContainer";
import { WS_BACKEND_URL } from "@/app/lib/config";
import Canvas from "./Canvas";

type ShapeChoice = "rectangle" | "circle" | "line" | "null";

export default function RoomCanvas({ roomId }: { roomId: string }) {
  const [shapeChoice, setShapeChoice] = useState<ShapeChoice>("rectangle");

  // * Effect for setting up Socket
  const socketRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  useEffect(() => {
    const ws = new WebSocket(
      `${WS_BACKEND_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmYzZkODQ5Ni01ZjRjLTQ3M2UtYTU1OS00NTM0YjQ5NmYyMDAiLCJpYXQiOjE3NTk4MDkwMTgsImV4cCI6MTc1OTgzNzgxOH0.HU3AZ79nJWB0hIRqU8I0jNjGpXkM5Sbzc7ifYe0rvyM`
    );
    ws.onopen = () => {
      socketRef.current = ws;
      setIsConnected(true);
      ws.send(JSON.stringify({ type: "joinRoom", roomId }));
    };
    ws.onclose = () => {
      socketRef.current = null;
      setIsConnected(false);
    };
    ws.onerror = () => {
      socketRef.current = null;
      setIsConnected(false);
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [roomId]);

  if (!socketRef.current || !isConnected) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative w-screen h-screen">
      <Canvas roomId={roomId} socket={socketRef.current} />
      {/* // TODO: make it a draggable, resizable component */}
      <DoubleContainer
        className="fixed z-10 top-[20%] left-[2%]"
        w={60}
        h={100}
      >
        <div className="w-full h-full flex border-0 rounded-lg bg-neutral-700 items-center justify-center">
          <DoubleContainer
            w={56}
            h={96}
            className="flex items-center justify-center"
          >
            <select
              className="bg-neutral-800 text-white px-3 py-1 rounded-lg"
              name=""
              value={shapeChoice}
              onChange={(e) => setShapeChoice(e.target.value as ShapeChoice)}
              id=""
            >
              <option value="rectangle">Rectangle</option>
              <option value="circle">Circle</option>
              <option value="line">Line</option>
              <option value="null">None</option>
            </select>
          </DoubleContainer>
        </div>
      </DoubleContainer>
    </div>
  );
}
