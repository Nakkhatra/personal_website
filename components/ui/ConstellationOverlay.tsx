"use client";

import { useRef, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { useTheme } from "@/components/providers/ThemeProvider";
import { hexToRgb } from "@/lib/theme";

const STAR_COUNT = 45;
const CONNECTION_RADIUS = 160;
const MAX_CONNECTIONS = 5;

// Fixed fractional positions — stable across renders and resizes
const starFractions = Array.from({ length: STAR_COUNT }, () => ({
  fx: Math.random(),
  fy: Math.random(),
}));

export default function ConstellationOverlay() {
  const shouldReduce = useReducedMotion();
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (shouldReduce) return;
    if (typeof window !== "undefined" && !window.matchMedia("(pointer: fine)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mouse = { x: -9999, y: -9999 };
    let rafId = 0;
    let visible = true;

    const starRgb = hexToRgb(theme.colors.text.primary);
    const accentRgbStr = hexToRgb(theme.colors.accent.primary);

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();

    function draw() {
      if (!canvas || !ctx) { rafId = requestAnimationFrame(draw); return; }
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!visible) { rafId = requestAnimationFrame(draw); return; }

      const points = starFractions.map((s) => ({
        x: s.fx * canvas!.width,
        y: s.fy * canvas!.height,
      }));

      // Draw ambient star dots
      for (const p of points) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${starRgb}, 0.18)`;
        ctx.fill();
      }

      // Draw connection lines from cursor using accent color
      if (mouse.x > 0) {
        const nearby = points
          .map((p) => ({ ...p, d: Math.hypot(p.x - mouse.x, p.y - mouse.y) }))
          .filter((p) => p.d < CONNECTION_RADIUS)
          .sort((a, b) => a.d - b.d)
          .slice(0, MAX_CONNECTIONS);

        for (const p of nearby) {
          // Distance-based alpha: nearby = bright, far = almost invisible
          const t = 1 - p.d / CONNECTION_RADIUS;
          const alpha = t * 0.22;

          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = `rgba(${accentRgbStr}, ${alpha.toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Brighten the star dot slightly when connected
          ctx.beginPath();
          ctx.arc(p.x, p.y, 0.8 + t * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${accentRgbStr}, ${(t * 0.35).toFixed(3)})`;
          ctx.fill();
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
      mouse.x = -9999;
      mouse.y = -9999;
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
  }, [shouldReduce, theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
      aria-hidden
    />
  );
}
