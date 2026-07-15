"use client";

import { useRef, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { activeTheme } from "@/lib/theme";

const STAR_COUNT = 40;
const CONNECTION_RADIUS = 150;
const MAX_CONNECTIONS = 5;

const starPoints = Array.from({ length: STAR_COUNT }, () => ({
  fx: Math.random(),
  fy: Math.random(),
}));

export default function ConstellationOverlay() {
  const shouldReduce = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (shouldReduce) return;
    if (typeof window !== "undefined" && !window.matchMedia("(pointer: fine)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mouse = { x: -1000, y: -1000 };
    let rafId = 0;
    let visible = true;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();

    function draw() {
      if (!canvas || !ctx) { rafId = requestAnimationFrame(draw); return; }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const points = starPoints.map((s) => ({
        x: s.fx * canvas!.width,
        y: s.fy * canvas!.height,
      }));

      if (!visible) { rafId = requestAnimationFrame(draw); return; }

      const starRgb = activeTheme.effects.starColorRgb;

      for (const p of points) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 0.7, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${starRgb}, 0.22)`;
        ctx.fill();
      }

      if (mouse.x > 0) {
        const nearby = points
          .map((p) => ({ ...p, d: Math.hypot(p.x - mouse.x, p.y - mouse.y) }))
          .filter((p) => p.d < CONNECTION_RADIUS)
          .sort((a, b) => a.d - b.d)
          .slice(0, MAX_CONNECTIONS);

        for (const p of nearby) {
          const alpha = 0.06 + 0.02 * (1 - p.d / CONNECTION_RADIUS);
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = `rgba(${starRgb}, ${alpha.toFixed(3)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      rafId = requestAnimationFrame(draw);
    }

    const section = canvas.parentElement;

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);

    section?.addEventListener("mousemove", onMove);
    section?.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", resize);
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      io.disconnect();
      section?.removeEventListener("mousemove", onMove);
      section?.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", resize);
    };
  }, [shouldReduce]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
      aria-hidden
    />
  );
}
