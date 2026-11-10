"use client";

import { useEffect, useRef } from "react";

type ConfettiProps = {
  trigger: number;
  /** A bigger, longer, screen-wide confetti shower for extra-special moments. */
  big?: boolean;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  spin: number;
  life: number;
};

const COLORS = ["#ff6f59", "#ffe2a0", "#2fbfb0", "#ff4c81", "#26324a"];

export default function Confetti({ trigger, big = false }: ConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastTrigger = useRef(0);

  useEffect(() => {
    if (trigger === 0 || trigger === lastTrigger.current) return;
    lastTrigger.current = trigger;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const count = big ? 260 : 90;
    const maxFrames = big ? 190 : 120;
    const gravity = big ? 0.22 : 0.28;

    const particles: Particle[] = Array.from({ length: count }, () => {
      if (big) {
        // Rain in from all across the top, like two confetti cannons plus
        // a full-width shower — much bigger and busier than a single burst.
        return {
          x: Math.random() * canvas.width,
          y: canvas.height * (Math.random() * 0.25 - 0.1),
          vx: (Math.random() - 0.5) * 6,
          vy: Math.random() * 4,
          size: 5 + Math.random() * 7,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          rotation: Math.random() * Math.PI * 2,
          spin: (Math.random() - 0.5) * 0.4,
          life: 0,
        };
      }
      return {
        x: canvas.width / 2 + (Math.random() - 0.5) * 120,
        y: canvas.height * 0.35,
        vx: (Math.random() - 0.5) * 9,
        vy: -Math.random() * 9 - 3,
        size: 5 + Math.random() * 5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotation: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.3,
        life: 0,
      };
    });

    let frame = 0;
    let animationId: number;

    const tick = () => {
      frame += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.vy += gravity;
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.rotation += particle.spin;
        particle.life += 1;

        ctx.save();
        ctx.globalAlpha = Math.max(0, 1 - frame / maxFrames);
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);
        ctx.fillStyle = particle.color;
        ctx.fillRect(-particle.size / 2, -particle.size / 3, particle.size, particle.size * 0.6);
        ctx.restore();
      });

      if (frame < maxFrames) {
        animationId = window.requestAnimationFrame(tick);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    animationId = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(animationId);
  }, [trigger, big]);

  return <canvas ref={canvasRef} className="confetti-canvas" aria-hidden="true" />;
}
