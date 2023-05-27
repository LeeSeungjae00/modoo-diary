// react
import React, { useRef, useEffect, useState } from "react";
// style

export default function Canvas() {
  // useRef
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // getCtx
  const [getCtx, setGetCtx] = useState<CanvasRenderingContext2D | null>(null);
  // painting state
  const [painting, setPainting] = useState(false);

  useEffect(() => {
    // canvas useRef
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 300;
      canvas.height = 200;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineJoin = "round";
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = "#000000";
        setGetCtx(ctx);
      }
    }
  }, []);

  const drawFn = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    // mouse position
    const mouseX = e.nativeEvent.offsetX;
    const mouseY = e.nativeEvent.offsetY;
    // drawing
    if (getCtx) {
      if (!painting) {
        getCtx.beginPath();
        getCtx.moveTo(mouseX, mouseY);
      } else {
        getCtx.lineTo(mouseX, mouseY);
        getCtx.stroke();
      }
    }
  };

  console.log(canvasRef);

  return (
    <div className="max-w-full w-full">
      <div className="max-w-full">
        <canvas
          className="m-auto border-gray-500 border-2"
          ref={canvasRef}
          onMouseDown={() => setPainting(true)}
          onMouseUp={() => setPainting(false)}
          onMouseMove={(e) => drawFn(e)}
          onMouseLeave={() => setPainting(false)}
          width="300"
          height="200"
        ></canvas>
      </div>
    </div>
  );
}
