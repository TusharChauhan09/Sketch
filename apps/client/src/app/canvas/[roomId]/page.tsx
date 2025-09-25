"use client";
import Draw from "@/draw";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function CanvasRoom() {
  const { roomId } = useParams();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      Draw(canvas);
    }
  }, [canvasRef]);
  return (
    <div>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        className="w-screen h-screen bg-black"
      ></canvas>
    </div>
  );
}
