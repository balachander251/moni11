"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const SYMBOLS = ["💛", "✨", "💕", "⭐"];
const SPAWN_INTERVAL_MS = 90;

export default function CursorTrail() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const layer = layerRef.current;
    if (prefersReduced || !hasFinePointer || !layer) return;

    let lastSpawn = 0;

    const handlePointerMove = (event: PointerEvent) => {
      const now = performance.now();
      if (now - lastSpawn < SPAWN_INTERVAL_MS) return;
      lastSpawn = now;

      const el = document.createElement("span");
      el.textContent = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
      el.style.position = "fixed";
      el.style.left = `${event.clientX}px`;
      el.style.top = `${event.clientY}px`;
      el.style.fontSize = `${0.9 + Math.random() * 0.5}rem`;
      el.style.pointerEvents = "none";
      el.style.transform = "translate(-50%, -50%)";
      layer.appendChild(el);

      gsap.fromTo(
        el,
        { opacity: 0.9, scale: 0.6, y: 0 },
        {
          opacity: 0,
          scale: 1.2,
          y: -26 - Math.random() * 16,
          duration: 0.8,
          ease: "power1.out",
          onComplete: () => el.remove(),
        }
      );
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return <div ref={layerRef} className="cursor-trail" aria-hidden="true" />;
}
