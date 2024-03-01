"use client";

import React from "react";
import FontButton from "../../common/fontButton";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import useDrawCanvas from "@/hooks/useDrawCanvas";
import Pallet from "./Pallet";

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
    drawMobileFn,
    eraseFn,
    eraseMobileFn,
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
            onTouchMove={isDraw ? drawMobileFn : eraseMobileFn}
            width="300"
            height="200"
          ></canvas>
        </div>
      </div>
      <Pallet
        colorChange={colorChange}
        isDraw={isDraw}
        setIsDraw={setIsDraw}
        colors={[
          { code: "#000000", tailwind: "bg-black" },
          { code: "#6b7280", tailwind: "bg-gray-500" },
          { code: "#ffffff", tailwind: "bg-white" },
          { code: "#ef4444", tailwind: "bg-red-500" },
          { code: "#3b82f6", tailwind: "bg-blue-500" },
          { code: "#22c55e", tailwind: "bg-green-500" },
        ]}
      ></Pallet>
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
