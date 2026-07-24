"use client";

import { useRef, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { useTheme } from "@/components/providers/ThemeProvider";
import { hexToRgb } from "@/lib/theme";

interface Gear {
  x: number; y: number; r: number; speed: number; angle: number; teeth: number;
}

interface Crystal {
  x: number; y: number; vx: number; vy: number; w: number; h: number; alpha: number; phase: number;
}

function drawGear(ctx: CanvasRenderingContext2D, gear: Gear, color: string) {
  const { x, y, r, angle, teeth } = gear;
  const innerR = r * 0.72;
  const toothH = r * 0.28;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.beginPath();
  for (let i = 0; i < teeth; i++) {
    const a0 = (i / teeth) * Math.PI * 2;
    const a1 = ((i + 0.35) / teeth) * Math.PI * 2;
    const a2 = ((i + 0.65) / teeth) * Math.PI * 2;
    const a3 = ((i + 1) / teeth) * Math.PI * 2;
    ctx.lineTo(Math.cos(a0) * innerR, Math.sin(a0) * innerR);
    ctx.lineTo(Math.cos(a1) * (r + toothH), Math.sin(a1) * (r + toothH));
    ctx.lineTo(Math.cos(a2) * (r + toothH), Math.sin(a2) * (r + toothH));
    ctx.lineTo(Math.cos(a3) * innerR, Math.sin(a3) * innerR);
  }
  ctx.closePath();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.stroke();
  // hub circle
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.18, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawCrystal(ctx: CanvasRenderingContext2D, c: Crystal, color: string) {
  ctx.save();
  ctx.translate(c.x, c.y);
  ctx.globalAlpha = c.alpha;
  ctx.beginPath();
  ctx.moveTo(0, -c.h / 2);
  ctx.lineTo(c.w / 2, 0);
  ctx.lineTo(0, c.h / 2);
  ctx.lineTo(-c.w / 2, 0);
  ctx.closePath();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.restore();
}

export default function HeroArtifacts() {
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

    const accent2Rgb = hexToRgb(theme.colors.accent2.primary);
    const accentRgb = hexToRgb(theme.colors.accent.primary);
    const gearColor = `rgba(${accent2Rgb}, 0.10)`;
    const crystalColor = `rgba(${accentRgb}, 0.12)`;

    let rafId = 0;
    let visible = true;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();

    const gears: Gear[] = [
      { x: 0.12, y: 0.25, r: 55, speed: 0.003, angle: 0, teeth: 12 },
      { x: 0.88, y: 0.55, r: 40, speed: -0.004, angle: 1, teeth: 9 },
      { x: 0.08, y: 0.75, r: 30, speed: 0.006, angle: 0.5, teeth: 8 },
      { x: 0.80, y: 0.15, r: 22, speed: -0.007, angle: 2, teeth: 7 },
    ].map(g => ({ ...g, x: g.x, y: g.y })) as Gear[];

    const crystals: Crystal[] = Array.from({ length: 10 }, (_, i) => ({
      x: (0.1 + i * 0.09) * 800,
      y: Math.random() * 600,
      vx: (Math.random() - 0.5) * 0.15,
      vy: -(0.25 + Math.random() * 0.25),
      w: 6 + Math.random() * 8,
      h: 12 + Math.random() * 16,
      alpha: 0.4 + Math.random() * 0.6,
      phase: Math.random() * Math.PI * 2,
    }));

    function draw(t: number) {
      if (!canvas || !ctx) { rafId = requestAnimationFrame(draw); return; }
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!visible) { rafId = requestAnimationFrame(draw); return; }

      const ts = t * 0.001;

      for (const g of gears) {
        g.angle += g.speed;
        const px = g.x * canvas.width;
        const py = g.y * canvas.height;
        drawGear(ctx, { ...g, x: px, y: py }, gearColor);
      }

      for (const c of crystals) {
        c.x += c.vx;
        c.y += c.vy;
        const bob = Math.sin(ts * 1.2 + c.phase) * 1.5;
        if (c.y < -30) {
          c.y = canvas.height + 20;
          c.x = Math.random() * canvas.width;
        }
        drawCrystal(ctx, { ...c, y: c.y + bob }, crystalColor);
      }

      rafId = requestAnimationFrame(draw);
    }

    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    io.observe(canvas);
    window.addEventListener("resize", resize);
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [shouldReduce, theme]);

  if (shouldReduce) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[1] [@media(pointer:coarse)]:hidden"
      aria-hidden
    />
  );
}
