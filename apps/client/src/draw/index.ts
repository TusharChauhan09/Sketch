import axios from "axios";
import { HTTP_BACKEND_URL } from "../app/lib/config";

type Shape =
  | {
      type: "rectangle";
      x: number;
      y: number;
      width: number;
      height: number;
    }
  | {
      type: "circle";
      x: number;
      y: number;
      radius: number;
    };

export default async function Draw(
  canvas: HTMLCanvasElement,
  roomId: string,
  socket: WebSocket
) {
  const ctx = canvas.getContext("2d");

  // * store existing shapes to redraw them when needed
  let existingShapes: Shape[] = await getExistingShapes(roomId);

  if (!ctx) return;

  // * Listen for messages from the server and update the canvas accordingly
  socket.onmessage = (event) => {
    const parsedData = JSON.parse(event.data);

    if (parsedData.type === "chat") {
      const measurement = JSON.parse(parsedData.measurement) as Shape;
      existingShapes.push(measurement);
      clearCanvasRedraw(existingShapes, ctx, canvas);
    }
  };

  clearCanvasRedraw(existingShapes, ctx, canvas);

  ctx.fillStyle = "white";
  ctx.strokeStyle = "white";

  let clicked = false;

  let startX = 0;
  let startY = 0;
  let endX = 0;
  let endY = 0;

  canvas.addEventListener("mousedown", (e) => {
    clicked = true;
    startX = e.clientX;
    startY = e.clientY;
  });
  canvas.addEventListener("mouseup", (e) => {
    clicked = false;
    endX = e.clientX;
    endY = e.clientY;
    const width = endX - startX;
    const height = endY - startY;

    // * store existing shapes
    const shape : Shape  = {
      type: "rectangle",
      x: startX,
      y: startY,
      width,
      height,
    };
    existingShapes.push(shape as Shape);

    // * send the new shape to the ws server
    socket.send(
      JSON.stringify({
        type: "chat",
        roomId,
        measurement: JSON.stringify(shape),
      })
    );
  });
  canvas.addEventListener("mousemove", (e) => {
    if (clicked) {
      endX = e.clientX;
      endY = e.clientY;
      const width = endX - startX;
      const height = endY - startY;

      // * clear canvas and redraw existing shapes
      clearCanvasRedraw(existingShapes, ctx, canvas);
      // ctx.clearRect(0, 0, canvas.width, canvas.height);

      // * draw new rectangle
      ctx.strokeRect(startX, startY, width, height);
      // ctx.beginPath();
      // let radius = Math.sqrt(width * width + height * height);
      // ctx.arc( startX,startY, radius, 0 , Math.PI * 2);
      // ctx.stroke();
    }
  });
}

// * clear canvas and redraw existing shapes
function clearCanvasRedraw(
  exisitingShapes: Shape[],
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  exisitingShapes.map((shape) => {
    if (shape.type === "rectangle") {
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    } else if (shape.type === "circle") {
      ctx.beginPath();
      ctx.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2);
      ctx.stroke();
    }
  });
}

// * Get the existing shapes from the DB for a particular room
async function getExistingShapes(roomId: string) {
  const res = await axios.get(`${HTTP_BACKEND_URL}/api/room/shapes/${roomId}`);
  const measurement = res.data.measurement;

  const shapes = measurement.map((m: { measurement: string }) => {
    const shape: Shape = JSON.parse(m.measurement);
    return shape;
  });

  return shapes;
}
