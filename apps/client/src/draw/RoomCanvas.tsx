"use client";

import { useEffect, useRef, useState } from "react";
import DoubleContainer from "@/components/Auxiliary/DoubleContainer";
import { WS_BACKEND_URL } from "@/app/lib/config";
import Canvas from "./Canvas";

type ShapeChoice = "rectangle" | "circle" | "line" | "null" | "pencile";

export default function RoomCanvas({ roomId }: { roomId: string }) {
  const [shapeChoice, setShapeChoice] = useState<ShapeChoice>("rectangle");

  // * Effect for setting up Socket
  const socketRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  useEffect(() => {
    const ws = new WebSocket(
      `${WS_BACKEND_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmYzZkODQ5Ni01ZjRjLTQ3M2UtYTU1OS00NTM0YjQ5NmYyMDAiLCJpYXQiOjE3NTk5MTkyMjIsImV4cCI6MTc1OTk0ODAyMn0.HZjOGqDD-y1cbP2nTPwyh04iaTHJ_g20vapTbhgH18o`
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
    <div className="relative min-w-screen h-screen">
      <Canvas roomId={roomId} socket={socketRef.current} />
      {/* // TODO: make it a draggable, resizable component */}
      <DoubleContainer
        className="fixed flex z-5 top-[20%] left-[2%] min-w-60 min-h-100 bg-neutral-700 "
        w={70}
        h={100}
      >
        <div className=" w-60 min-h-100 flex flex-col border-0 rounded-lg bg-neutral-700">
          <DoubleContainer
            w={70}
            h={96}
            className=" min-w-60 h-1/3 flex flex-col items-center justify-center "
          >
            <div className="w-full h-full bg-neutral-500 border-2 rounded-2xl flex items-center justify-around  p-2 m-[0.25px]">
              <div>
                <button
                  className="text-4xl hover:cursor-pointer hover:bg-neutral-400 p-2  rounded-lg"
                  onClick={() => setShapeChoice("rectangle")}
                >
                  ▯
                </button>
              </div>
              <div>
                <button
                  className="text-5xl hover:cursor-pointer hover:bg-neutral-400  p-2 pr-11  rounded-lg"
                  onClick={() => setShapeChoice("circle")}
                >
                  ⃝
                </button>
              </div>
              <div>
                <button
                  className="text-3xl hover:cursor-pointer hover:bg-neutral-400 p-2  rounded-lg text-white"
                  onClick={() => setShapeChoice("pencile")}
                >
                  🖍
                </button>
              </div>

              <div>
                <button
                  className="text-4xl hover:cursor-pointer hover:bg-neutral-400 p-2  rounded-lg"
                  onClick={() => setShapeChoice("line")}
                >
                  ―
                </button>
              </div>
            </div>
          </DoubleContainer>
          <DoubleContainer
            w={70}
            h={96}
            className=" min-w-60 min-h-2/3 flex flex-col items-center justify-center "
          >
            <div className="w-full h-full bg-neutral-500 border-2 rounded-2xl flex items-center justify-around  p-2 m-[0.25px]">
frswfwfws
            </div>
          </DoubleContainer>
        </div>
      </DoubleContainer>
    </div>
  );
}
