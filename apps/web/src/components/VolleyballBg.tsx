"use client";

import { useEffect, useRef } from "react";

interface Ball {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  offset: number;
}

export function VolleyballBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const count = Math.min(12, Math.floor(window.innerWidth / 120));
    const balls: Ball[] = [];

    for (let i = 0; i < count; i++) {
      balls.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 30 + 20,
        speed: Math.random() * 0.2 + 0.05,
        opacity: Math.random() * 0.06 + 0.02,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.3,
        offset: Math.random() * Math.PI * 2,
      });
    }

    function drawVolleyball(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, rot: number) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((rot * Math.PI) / 180);
      ctx.globalAlpha = 1;

      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fillStyle = "#f0f0f0";
      ctx.fill();
      ctx.strokeStyle = "#d4d4d4";
      ctx.lineWidth = 0.5;
      ctx.stroke();

      ctx.strokeStyle = "#c4c4c4";
      ctx.lineWidth = 0.8;

      ctx.beginPath();
      ctx.moveTo(0, -r * 1.1);
      ctx.quadraticCurveTo(r * 1.4, 0, 0, r * 1.1);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, -r * 1.1);
      ctx.quadraticCurveTo(-r * 1.4, 0, 0, r * 1.1);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-r * 1.1, 0);
      ctx.lineTo(r * 1.1, 0);
      ctx.stroke();

      ctx.restore();
    }

    let anim: number;
    let time = 0;

    const frame = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      balls.forEach((b) => {
        const floatY = Math.sin(time * b.speed * 5 + b.offset) * 15;
        const floatX = Math.cos(time * b.speed * 3 + b.offset) * 8;
        b.rotation += b.rotationSpeed;

        ctx.save();
        ctx.globalAlpha = b.opacity;
        drawVolleyball(ctx, b.x + floatX, b.y + floatY, b.size, b.rotation);
        ctx.restore();
      });

      anim = requestAnimationFrame(frame);
    };
    frame();

    return () => {
      cancelAnimationFrame(anim);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
