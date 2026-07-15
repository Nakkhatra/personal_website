"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { activeTheme } from "@/lib/theme";

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

function gaussianRandom(mean: number, sigma: number): number {
  const u1 = Math.random() + Number.EPSILON;
  const u2 = Math.random();
  return mean + Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2) * sigma;
}

const CLUSTER_COUNT = 7;
const clusterCenters = Array.from({ length: CLUSTER_COUNT }, () => ({
  cx: Math.random(),
  cy: Math.random(),
}));

function createStars(width: number, height: number): Star[] {
  return Array.from({ length: 150 }, () => {
    let fx: number, fy: number;

    if (Math.random() < 0.7) {
      const c = clusterCenters[Math.floor(Math.random() * CLUSTER_COUNT)];
      fx = Math.max(0, Math.min(1, gaussianRandom(c.cx, 0.15)));
      fy = Math.max(0, Math.min(1, gaussianRandom(c.cy, 0.15)));
    } else {
      fx = Math.random();
      fy = Math.random();
    }

    const tier = Math.random();
    let baseOpacity: number;
    if (tier < 0.10) baseOpacity = 0.6 + Math.random() * 0.4;
    else if (tier < 0.40) baseOpacity = 0.3 + Math.random() * 0.4;
    else baseOpacity = 0.1 + Math.random() * 0.3;

    return {
      x: fx * width,
      y: fy * height,
      radius: Math.random() * 2.2 + 0.3,
      opacity: baseOpacity,
      opacityDelta: (Math.random() * 0.003 + 0.001) * (Math.random() > 0.5 ? 1 : -1),
    };
  });
}

function spawnShootingStar(width: number, height: number): ShootingStar {
  const edge = Math.random();
  const speed = 4 + Math.random() * 3;
  let x: number, y: number, vx: number, vy: number;

  if (edge < 0.4) {
    x = Math.random() * width;
    y = 0;
    const angle = Math.PI / 6 + Math.random() * (Math.PI / 3);
    vx = Math.cos(angle) * speed * (Math.random() > 0.5 ? 1 : -1);
    vy = Math.abs(Math.sin(angle) * speed);
  } else if (edge < 0.75) {
    x = 0;
    y = Math.random() * height * 0.6;
    vx = speed;
    vy = 1 + Math.random() * 2;
  } else {
    x = Math.random() * width * 0.5;
    y = Math.random() * height * 0.3;
    vx = speed;
    vy = 1.5 + Math.random() * 1.5;
  }

  return { x, y, vx, vy, opacity: 1, active: true };
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

    let stars = createStars(canvas.width, canvas.height);

    let shootingStar: ShootingStar | null = null;
    let lastShootingTime = 0;
    let shootingInterval = 25000 + Math.random() * 10000;

    function draw(timestamp: number) {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const star of stars) {
        star.opacity += star.opacityDelta;
        if (star.opacity <= 0 || star.opacity >= 1) star.opacityDelta *= -1;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${activeTheme.effects.starColorRgb}, ${Math.max(0, Math.min(1, star.opacity))})`;
        ctx.fill();
      }

      if (!shootingStar && timestamp - lastShootingTime > shootingInterval) {
        shootingStar = spawnShootingStar(canvas.width, canvas.height);
        lastShootingTime = timestamp;
        shootingInterval = 25000 + Math.random() * 10000;
      }

      if (shootingStar?.active) {
        const s = shootingStar;
        s.x += s.vx;
        s.y += s.vy;
        s.opacity -= 0.012;
        if (
          s.opacity <= 0 ||
          s.x > canvas.width ||
          s.y > canvas.height ||
          s.x < 0 ||
          s.y < 0
        ) {
          s.active = false;
        } else {
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(s.x - s.vx * 8, s.y - s.vy * 8);
          const grad = ctx.createLinearGradient(
            s.x, s.y,
            s.x - s.vx * 8, s.y - s.vy * 8
          );
          grad.addColorStop(0, `rgba(${activeTheme.effects.starColorRgb},${s.opacity})`);
          grad.addColorStop(1, `rgba(${activeTheme.effects.starColorRgb},0)`);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }

      rafId = requestAnimationFrame(draw);
    }

    const handleResize = () => {
      resize();
      stars = createStars(canvas!.width, canvas!.height);
    };
    window.removeEventListener("resize", resize);
    window.addEventListener("resize", handleResize);

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
    };
  }, [shouldReduce]);

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden
    >
      {/* Blob 1 — top-left, accent */}
      <div
        className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full opacity-[0.07]"
        style={{
          background: "radial-gradient(circle, var(--nebula1) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: shouldReduce ? "none" : "blob-drift-a 45s ease-in-out infinite",
          willChange: "transform",
        }}
      />
      {/* Blob 2 — bottom-right, cool */}
      <div
        className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full opacity-[0.05]"
        style={{
          background: "radial-gradient(circle, var(--nebula2) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: shouldReduce ? "none" : "blob-drift-b 58s ease-in-out infinite",
          willChange: "transform",
        }}
      />
      {/* Blob 3 — center-right, accent */}
      <div
        className="absolute top-[40%] right-[10%] w-[300px] h-[300px] rounded-full opacity-[0.04]"
        style={{
          background: "radial-gradient(circle, var(--nebula1) 0%, transparent 70%)",
          filter: "blur(50px)",
          animation: shouldReduce ? "none" : "blob-drift-c 38s ease-in-out infinite",
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
