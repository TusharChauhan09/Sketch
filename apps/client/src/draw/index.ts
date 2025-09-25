interface Shape{
    type: "rectangle" | "circle",
}

type rectangle = {
    x: number,
    y: number,
    width: number,
    height: number
}
type circle = {
    x: number,
    y: number,
    radius: number
}


export default function Draw(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");

    let ShapeStore: Shape[] =[];

  if (!ctx) return;
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
  });
  canvas.addEventListener("mousemove", (e) => {
    if (clicked) {
      endX = e.clientX;
      endY = e.clientY;
      const width = endX - startX;
      const height = endY - startY;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeRect(startX, startY, width, height);
    }
  });
}
