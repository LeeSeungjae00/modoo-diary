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
    eraseFn,
    drawMobileFn,
    colorChange,
    setIsDraw,
    clearCanvas,
  } = useDrawCanvas(canvasRef);
  const [color, setColor] = React.useState<string>("#000000");
  const onClickColor = (e: React.MouseEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setColor(target.value);
    colorChange(target.value);
    setIsDraw(true);
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
      <Pallet
        colorChange={colorChange}
        isDraw={isDraw}
        setIsDraw={setIsDraw}
        colors={[
          "#000000",
          "#6b7280",
          "#ffffff",
          "#ef4444",
          "#3b82f6",
          "#22c55e",
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
