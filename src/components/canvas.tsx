// react
import React, { useRef, useEffect, useState } from "react";
import FontButton from "./common/fontButton";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
// style

export const CANVAS_WIDTH = 300;
export const CANVAS_HEIGHT = 200;

export default function Canvas({
  canvasRef,
}: {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}) {
  const [getCtx, setGetCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [painting, setPainting] = useState(false);
  const body = document.querySelector("body") as HTMLElement;
  function getMousePos(
    canvasDom: React.RefObject<HTMLCanvasElement>,
    mouseEvent: React.TouchEvent<HTMLCanvasElement>
  ) {
    var rect = canvasDom.current?.getBoundingClientRect();
    if (rect)
      return {
        x: mouseEvent.touches[0].clientX - (rect.left || 0),
        y: mouseEvent.touches[0].clientY - (rect.top || 0),
      };
    return {
      x: 0,
      y: 0,
    };
  }

  useEffect(() => {
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
        console.log("tes111t");
      } else {
        getCtx.lineTo(mouseX, mouseY);
        getCtx.stroke();
      }
    }
  };

  const drawMobileFn = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const { x, y } = getMousePos(canvasRef, e);
    const mouseX = x;
    const mouseY = y;
    // drawing
    if (getCtx) {
      if (!painting) {
        getCtx.beginPath();
        getCtx.moveTo(mouseX, mouseY);
        console.log("tes111t");
      } else {
        getCtx.lineTo(mouseX, mouseY);
        getCtx.stroke();
      }
    }
    setPainting(true);
  };

  const clearCanvas = () => {
    setPainting(false);
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
              disableBodyScroll(body);
              setPainting(false);
            }}
            onTouchEnd={(e) => {
              enableBodyScroll(body);
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
