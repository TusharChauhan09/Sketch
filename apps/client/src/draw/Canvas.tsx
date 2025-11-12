"use client";
import { useEffect, useRef } from "react";
import Draw from ".";

export default function Canvas({
  roomId,
  socket,
}: {
  roomId: string;
  socket: WebSocket | null;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // * Effect for setting up canvas
  useEffect(() => {
    if (canvasRef.current && socket && socket.readyState === WebSocket.OPEN) {
      const canvas = canvasRef.current;
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      Draw(canvasRef.current, roomId, socket);
    }
  }, [canvasRef, socket, roomId]);
  return (
    <canvas
      ref={canvasRef}
      width={0}
      height={0}
      className="w-screen h-screen bg-black"
    />
  );
}
