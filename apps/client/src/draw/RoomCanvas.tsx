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
  useEffect(() => {
    const ws = new WebSocket(`${WS_BACKEND_URL}?token${123}`);
    ws.onopen = () => {
      socketRef.current = ws;
      ws.send(JSON.stringify({ type: "join", roomId }));
    };
  }, []);

  if (!socketRef.current) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative w-screen h-screen">
      <Canvas roomId={roomId} socket={socketRef.current} />
      {/* // TODO: make it a draggable, resizable component */}
      // * tool box
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
