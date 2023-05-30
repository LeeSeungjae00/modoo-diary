// react
import React, { useRef, useEffect, useState } from "react";
import FontButton from "./common/fontButton";
// style

export const CANVAS_WIDTH = 300;
export const CANVAS_HEIGHT = 200;

export default function Canvas({
  canvasRef,
}: {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}) {
  // useRef
  // getCtx
  const [getCtx, setGetCtx] = useState<CanvasRenderingContext2D | null>(null);
  // painting state
  const [painting, setPainting] = useState(false);

  function getMousePos(canvasDom: any, mouseEvent: any) {
    var rect = canvasDom.current.getBoundingClientRect();
    return {
      x: mouseEvent.touches[0].clientX - rect.left,
      y: mouseEvent.touches[0].clientY - rect.top,
    };
  }

  useEffect(() => {
    // canvas useRef
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = CANVAS_WIDTH;
      canvas.height = CANVAS_HEIGHT;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineJoin = "round";
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = "#000000";
        setGetCtx(ctx);
      }
    }
  }, [canvasRef]);

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

  const drawMobileFn = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const { x, y } = getMousePos(canvasRef, e);
    const mouseX = x;
    const mouseY = y;
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

  const clearCanvas = () => {
    getCtx?.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  };

  return (
    <>
      <div className="max-w-full w-full">
        <div className="max-w-full">
          <canvas
            className="m-auto border-gray-300 border-2"
            ref={canvasRef}
            onMouseDown={() => setPainting(true)}
            onMouseUp={() => setPainting(false)}
            onMouseLeave={() => setPainting(false)}
            onMouseMove={drawFn}
            onTouchStart={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setPainting(true);
            }}
            onTouchEnd={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setPainting(false);
            }}
            onTouchMove={drawMobileFn}
            width="300"
            height="200"
          ></canvas>
        </div>
      </div>
      <FontButton
        type="button"
        onClick={clearCanvas}
        className="m-auto mt-2 text-sm"
      >
        다 지울래
      </FontButton>
    </>
  );
}
