"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  opacityDelta: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  active: boolean;
}

export default function BackgroundEffects() {
  const shouldReduce = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (shouldReduce) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const STAR_COUNT = 120;
    const stars: Star[] = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.2 + 0.3,
      opacity: Math.random(),
      opacityDelta:
        (Math.random() * 0.003 + 0.001) * (Math.random() > 0.5 ? 1 : -1),
    }));

    let shootingStar: ShootingStar | null = null;
    let lastShootingTime = 0;
    const SHOOTING_INTERVAL = 25000 + Math.random() * 5000;

    function spawnShootingStar() {
      shootingStar = {
        x: Math.random() * canvas!.width * 0.5,
        y: Math.random() * canvas!.height * 0.3,
        vx: 4 + Math.random() * 3,
        vy: 1.5 + Math.random() * 1.5,
        opacity: 1,
        active: true,
      };
    }

    function draw(timestamp: number) {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const star of stars) {
        star.opacity += star.opacityDelta;
        if (star.opacity <= 0 || star.opacity >= 1) star.opacityDelta *= -1;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(237, 237, 237, ${Math.max(0, Math.min(1, star.opacity))})`;
        ctx.fill();
      }

      if (!shootingStar && timestamp - lastShootingTime > SHOOTING_INTERVAL) {
        spawnShootingStar();
        lastShootingTime = timestamp;
      }

      if (shootingStar?.active) {
        const s = shootingStar;
        s.x += s.vx;
        s.y += s.vy;
        s.opacity -= 0.012;
        if (s.opacity <= 0 || s.x > canvas.width) {
          s.active = false;
        } else {
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(s.x - s.vx * 8, s.y - s.vy * 8);
          const grad = ctx.createLinearGradient(
            s.x, s.y,
            s.x - s.vx * 8, s.y - s.vy * 8
          );
          grad.addColorStop(0, `rgba(237,237,237,${s.opacity})`);
          grad.addColorStop(1, "rgba(237,237,237,0)");
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }

      rafId = requestAnimationFrame(draw);
    }

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, [shouldReduce]);

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden
    >
      {/* Blob 1 — top-left, copper */}
      <div
        className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full opacity-[0.07]"
        style={{
          background: "radial-gradient(circle, #C8875A 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: shouldReduce ? "none" : "blob-drift-a 35s ease-in-out infinite",
          willChange: "transform",
        }}
      />
      {/* Blob 2 — bottom-right, navy-blue */}
      <div
        className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full opacity-[0.05]"
        style={{
          background: "radial-gradient(circle, #1A6B8A 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: shouldReduce ? "none" : "blob-drift-b 42s ease-in-out infinite",
          willChange: "transform",
        }}
      />
      {/* Blob 3 — center-right, copper */}
      <div
        className="absolute top-[40%] right-[10%] w-[300px] h-[300px] rounded-full opacity-[0.04]"
        style={{
          background: "radial-gradient(circle, #C8875A 0%, transparent 70%)",
          filter: "blur(50px)",
          animation: shouldReduce ? "none" : "blob-drift-c 28s ease-in-out infinite",
          willChange: "transform",
        }}
      />
      {/* Canvas starfield */}
      {!shouldReduce && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-40"
          aria-hidden
        />
      )}
    </div>
  );
}
