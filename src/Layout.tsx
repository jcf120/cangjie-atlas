import React, { useEffect, useRef } from "react";
import layoutsJson from "./data/layouts.json";
import style from "./Layout.module.css";

type LayoutData = Record<string, string | undefined>;
type LayoutsData = Record<string, LayoutData | undefined>;
const layoutsData: LayoutsData = layoutsJson;

const row1Keys = Array.from("qwertyuiop");
const row2Keys = Array.from("asdfghjkl");
const row3Keys = Array.from("zxcvbnm");
const units = row1Keys.length;

function setupCanvas(canvas: HTMLCanvasElement) {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.scale(dpr, dpr);
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
  }
  return ctx;
}

function drawRecursive(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  scope: string
) {
  const layout = layoutsData[scope];
  if (!layout) return;
  const unit = width / units;
  ctx.font = `300 ${unit * ((units - 3) / units)}px sans-serif`;
  for (let i = 0; i < row1Keys.length; i++) {
    const key = row1Keys[i];
    const chars = layout[key];
    if (chars) {
      ctx.fillText(chars, x + unit * 0.5 + unit * i, y + unit, unit);
    }
  }
  for (let i = 0; i < row2Keys.length; i++) {
    const key = row2Keys[i];
    const chars = layout[key];
    if (chars) {
      ctx.fillText(chars, x + unit * 0.7 + unit * i, y + unit * 2, unit);
    }
  }
  for (let i = 0; i < row3Keys.length; i++) {
    const key = row3Keys[i];
    const chars = layout[key];
    if (chars) {
      ctx.fillText(chars, x + unit * 0.9 + unit * i, y + unit * 3, unit);
    }
  }
  if (unit > 4) {
    for (let i = 0; i < row1Keys.length; i++) {
      const key = row1Keys[i];
      drawRecursive(ctx, x + unit * i, y + unit * 0.9, unit, scope + key);
    }
    for (let i = 0; i < row2Keys.length; i++) {
      const key = row2Keys[i];
      drawRecursive(
        ctx,
        x + unit * 0.2 + unit * i,
        y + unit * 1.9,
        unit,
        scope + key
      );
    }
    for (let i = 0; i < row3Keys.length; i++) {
      const key = row3Keys[i];
      drawRecursive(
        ctx,
        x + unit * 0.4 + unit * i,
        y + unit * 2.9,
        unit,
        scope + key
      );
    }
  }
}

function drawQwerty(ctx: CanvasRenderingContext2D, width: number) {
  const unit = width / units;
  ctx.font = `bold ${unit}px sans-serif`;
  for (let i = 0; i < row1Keys.length; i++) {
    ctx.fillText(
      row1Keys[i].toUpperCase(),
      unit * 0.5 + unit * i,
      unit * 1.2,
      unit
    );
  }
  for (let i = 0; i < row2Keys.length; i++) {
    ctx.fillText(
      row2Keys[i].toUpperCase(),
      unit * 0.7 + unit * i,
      unit * 2.2,
      unit
    );
  }
  for (let i = 0; i < row3Keys.length; i++) {
    ctx.fillText(
      row3Keys[i].toUpperCase(),
      unit * 0.9 + unit * i,
      unit * 3.2,
      unit
    );
  }
}

export default function Layout({ scope }: { scope: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!ctxRef.current && canvas) ctxRef.current = setupCanvas(canvas);
    const ctx = ctxRef.current;
    if (ctx && canvas) {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.fillStyle = "#222";
      drawQwerty(ctx, rect.width);
      ctx.fillStyle = "white";
      drawRecursive(ctx, 0, 0, rect.width, scope);
    }
  }, [scope]);
  return <canvas className={style.canvas} ref={canvasRef} />;
}
