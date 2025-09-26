import { RefObject, useEffect, useRef } from "react";
import Draw from ".";

export default async function Canvas({ roomId , socket  }: { roomId: string, socket : WebSocket}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // * Effect for setting up canvas
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      Draw(canvasRef.current, roomId,socket);
    }
  }, [canvasRef]);
  return (
    <canvas
      ref={canvasRef}
      width={0}
      height={0}
      className="w-screen h-screen bg-black"
    />
  );
}
