// react
import React, { useRef, useEffect, useState } from "react";
import FontButton from "./common/fontButton";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import useDrawCanvas from "@/hooks/useDrawCanvas";
// style

export const CANVAS_WIDTH = 300;
export const CANVAS_HEIGHT = 200;

export default function Canvas({
  canvasRef,
}: {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}) {
  const body = document.querySelector("body") as HTMLElement;
  const {
    setPainting,
    isDraw,
    drawFn,
    eraseFn,
    drawMobileFn,
    colorChange,
    setIsDraw,
    clearCanvas,
  } = useDrawCanvas(canvasRef);

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
            onMouseMove={isDraw ? drawFn : eraseFn}
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
      <button type="button" onClick={() => colorChange("#b7b7b7")}>
        연필
      </button>
      <button type="button" onClick={() => colorChange("#010101")}>
        검정펜
      </button>
      <button type="button" onClick={() => colorChange("#ff2a2a")}>
        빨간펜
      </button>
      <button type="button" onClick={() => colorChange("#1582ff")}>
        파란펜
      </button>
      <button type="button" onClick={() => colorChange("#00720d")}>
        초록펜
      </button>
      <button type="button" onClick={() => colorChange("#ffffff")}>
        하얀펜
      </button>
      <button
        type="button"
        onClick={() => {
          setIsDraw(false);
        }}
      >
        지우개
      </button>
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
