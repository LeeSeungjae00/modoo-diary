import { CANVAS_HEIGHT, CANVAS_WIDTH } from "@/components/client/write/Canvas";
import React, { useEffect, useState } from "react";

export default function useDrawCanvas(
  canvasRef: React.RefObject<HTMLCanvasElement>
) {
  const [getCtx, setGetCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [painting, setPainting] = useState(false);
  const [isDraw, setIsDraw] = useState(true);

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

  const getMousePos = (
    canvasDom: React.RefObject<HTMLCanvasElement>,
    mouseEvent: React.TouchEvent<HTMLCanvasElement>
  ) => {
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
  };

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
    setPainting(true);
  };

  const clearCanvas = () => {
    setPainting(false);
    getCtx?.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  };

  const eraseFn = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    // mouse position
    const mouseX = e.nativeEvent.offsetX;
    const mouseY = e.nativeEvent.offsetY;
    // erasing
    if (getCtx) {
      if (painting) getCtx.clearRect(mouseX - 5, mouseY - 5, 10, 10);
    }
  };
  const eraseMobileFn = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const { x, y } = getMousePos(canvasRef, e);
    const mouseX = x;
    const mouseY = y;
    // erasing
    if (getCtx) {
      if (painting) getCtx.clearRect(mouseX - 5, mouseY - 5, 10, 10);
    }
    setPainting(true);
  };

  const colorChange = (color: string) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineJoin = "round";
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = color;
        setIsDraw(true);
        setGetCtx(ctx);
      }
    }
  };
  return {
    setPainting,
    drawFn,
    eraseFn,
    eraseMobileFn,
    isDraw,
    drawMobileFn,
    clearCanvas,
    colorChange,
    setIsDraw,
  };
}
