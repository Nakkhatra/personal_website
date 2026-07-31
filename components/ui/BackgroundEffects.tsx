"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useTheme } from "@/components/providers/ThemeProvider";
import { hexToRgb } from "@/lib/theme";

// ─── Star types ───────────────────────────────────────────────────────────────

interface Star {
  x: number;
  y: number;
  radius: number;
  baseOpacity: number;
  opacity: number;
  opacityDelta: number;
  twinkleSpeed: number;
  // hover brightening
  boost: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  opacity: number;
  active: boolean;
}

// ─── Procedural generation ───────────────────────────────────────────────────

function gaussianRandom(mean: number, sigma: number): number {
  const u1 = Math.random() + Number.EPSILON;
  const u2 = Math.random();
  return mean + Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2) * sigma;
}

const CLUSTER_COUNT = 9;
// Generate once per module — stable across renders
const clusterCenters = Array.from({ length: CLUSTER_COUNT }, () => ({
  cx: Math.random(),
  cy: Math.random(),
}));

function createStars(width: number, height: number, total: number): Star[] {
  const stars: Star[] = [];

  for (let i = 0; i < total; i++) {
    // Position: 65% clustered, 35% scattered
    let fx: number, fy: number;
    if (Math.random() < 0.65) {
      const c = clusterCenters[Math.floor(Math.random() * CLUSTER_COUNT)];
      fx = Math.max(0, Math.min(1, gaussianRandom(c.cx, 0.12)));
      fy = Math.max(0, Math.min(1, gaussianRandom(c.cy, 0.12)));
    } else {
      fx = Math.random();
      fy = Math.random();
    }

    // Size tiers: 60% tiny, 25% medium, 10% bright, 5% large
    const sizeTier = Math.random();
    let radius: number;
    if (sizeTier < 0.60) radius = 0.25 + Math.random() * 0.35;       // tiny: 0.25–0.60
    else if (sizeTier < 0.85) radius = 0.6 + Math.random() * 0.5;    // medium: 0.60–1.10
    else if (sizeTier < 0.95) radius = 1.1 + Math.random() * 0.6;    // bright: 1.10–1.70
    else radius = 1.7 + Math.random() * 0.8;                         // large: 1.70–2.50

    // Opacity tiers: dim → medium → bright (matches size loosely)
    let baseOpacity: number;
    if (sizeTier < 0.60) baseOpacity = 0.08 + Math.random() * 0.18;  // 0.08–0.26
    else if (sizeTier < 0.85) baseOpacity = 0.22 + Math.random() * 0.28; // 0.22–0.50
    else if (sizeTier < 0.95) baseOpacity = 0.45 + Math.random() * 0.30; // 0.45–0.75
    else baseOpacity = 0.65 + Math.random() * 0.35;                   // 0.65–1.00

    // Twinkle: each star has independent speed and direction
    const twinkleSpeed = 0.0005 + Math.random() * 0.002;
    const sign = Math.random() > 0.5 ? 1 : -1;

    stars.push({
      x: fx * width,
      y: fy * height,
      radius,
      baseOpacity,
      opacity: baseOpacity * (0.7 + Math.random() * 0.3),
      opacityDelta: twinkleSpeed * sign,
      twinkleSpeed,
      boost: 0,
    });
  }

  return stars;
}

function spawnShootingStar(width: number, height: number): ShootingStar {
  const edge = Math.random();
  const speed = 5 + Math.random() * 4;
  let x: number, y: number, vx: number, vy: number;

  if (edge < 0.35) {
    // top edge, angled downward
    x = Math.random() * width;
    y = 0;
    const angle = (Math.PI / 8) + Math.random() * (Math.PI / 3);
    vx = Math.cos(angle) * speed * (Math.random() > 0.5 ? 1 : -1);
    vy = Math.abs(Math.sin(angle) * speed);
  } else if (edge < 0.70) {
    // left edge
    x = 0;
    y = Math.random() * height * 0.5;
    vx = speed;
    vy = 0.5 + Math.random() * 2;
  } else {
    // top-left quadrant (original feel)
    x = Math.random() * width * 0.4;
    y = Math.random() * height * 0.25;
    vx = speed;
    vy = 1 + Math.random() * 2;
  }

  return {
    x, y, vx, vy,
    length: 6 + Math.random() * 4,
    opacity: 0.9 + Math.random() * 0.1,
    active: true,
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function BackgroundEffects() {
  const shouldReduce = useReducedMotion();
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (shouldReduce) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    let running = true;
    const starRgb = hexToRgb(theme.colors.text.primary);
    const isMobile = typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches;
    const starBudget = isMobile ? 40 : 90;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();

    let stars = createStars(canvas.width, canvas.height, starBudget);
    const mousePos = { x: -9999, y: -9999 };
    const HOVER_RADIUS = isMobile ? 0 : 120;

    function onMouseMove(e: MouseEvent) {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    }

    let shootingStar: ShootingStar | null = null;
    let lastShootingTime = 0;
    let shootingInterval = 20000 + Math.random() * 15000;

    function draw(timestamp: number) {
      if (!canvas || !ctx || !running) {
        rafId = 0;
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const star of stars) {
        // Independent twinkle
        star.opacity += star.opacityDelta;
        const minO = star.baseOpacity * 0.4;
        const maxO = Math.min(1, star.baseOpacity * 1.6);
        if (star.opacity <= minO) { star.opacity = minO; star.opacityDelta = star.twinkleSpeed; }
        if (star.opacity >= maxO) { star.opacity = maxO; star.opacityDelta = -star.twinkleSpeed; }

        // Hover brightening — smooth interpolation
        if (!isMobile) {
          const dist = Math.hypot(star.x - mousePos.x, star.y - mousePos.y);
          const targetBoost = dist < HOVER_RADIUS
            ? (1 - dist / HOVER_RADIUS) * 0.55
            : 0;
          star.boost += (targetBoost - star.boost) * 0.06;
        }

        const finalOpacity = Math.min(1, star.opacity + star.boost);

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${starRgb}, ${finalOpacity.toFixed(3)})`;
        ctx.fill();
      }

      // Shooting star
      if (!shootingStar && timestamp - lastShootingTime > shootingInterval) {
        shootingStar = spawnShootingStar(canvas.width, canvas.height);
        lastShootingTime = timestamp;
        shootingInterval = 20000 + Math.random() * 15000;
      }

      if (shootingStar?.active) {
        const s = shootingStar;
        s.x += s.vx;
        s.y += s.vy;
        s.opacity -= 0.018;
        if (s.opacity <= 0 || s.x > canvas.width + 50 || s.y > canvas.height + 50 || s.x < -50) {
          s.active = false;
        } else {
          const tailX = s.x - s.vx * s.length;
          const tailY = s.y - s.vy * s.length;
          const grad = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
          grad.addColorStop(0, `rgba(${starRgb}, ${s.opacity.toFixed(3)})`);
          grad.addColorStop(1, `rgba(${starRgb}, 0)`);
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(tailX, tailY);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      rafId = requestAnimationFrame(draw);
    }

    function startLoop() {
      if (!rafId) rafId = requestAnimationFrame(draw);
    }

    function stopLoop() {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
    }

    function onVisibility() {
      running = !document.hidden;
      if (running) startLoop();
      else stopLoop();
    }

    const handleResize = () => {
      resize();
      stars = createStars(canvas!.width, canvas!.height, starBudget);
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", onVisibility);
    if (!isMobile) window.addEventListener("mousemove", onMouseMove);
    startLoop();

    return () => {
      running = false;
      stopLoop();
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [shouldReduce, theme]);

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden
    >
      {/* Blob 1 — top-left, accent */}
      <div
        className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full opacity-[0.07]"
        style={{
          background: "radial-gradient(circle, var(--nebula1) 0%, transparent 70%)",
          filter: "blur(70px)",
          animation: shouldReduce ? "none" : "blob-drift-a 45s ease-in-out infinite",
        }}
      />
      {/* Blob 2 — bottom-right, cool */}
      <div
        className="absolute bottom-[-15%] right-[-5%] w-[700px] h-[700px] rounded-full opacity-[0.05]"
        style={{
          background: "radial-gradient(circle, var(--nebula2) 0%, transparent 70%)",
          filter: "blur(90px)",
          animation: shouldReduce ? "none" : "blob-drift-b 58s ease-in-out infinite",
        }}
      />
      {/* Blob 3 — center, accent — very faint */}
      <div
        className="absolute top-[35%] right-[15%] w-[350px] h-[350px] rounded-full opacity-[0.03]"
        style={{
          background: "radial-gradient(circle, var(--nebula1) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: shouldReduce ? "none" : "blob-drift-c 38s ease-in-out infinite",
        }}
      />
      {!shouldReduce && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          aria-hidden
        />
      )}
    </div>
  );
}
