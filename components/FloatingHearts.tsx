"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

type FloatingHeartsProps = {
  trigger: number;
};

const SYMBOLS = ["💗", "💛", "💚", "💙", "🧡"];

export default function FloatingHearts({ trigger }: FloatingHeartsProps) {
  const layerRef = useRef<HTMLDivElement>(null);
  const lastTrigger = useRef(0);

  useEffect(() => {
    if (trigger === 0 || trigger === lastTrigger.current) return;
    lastTrigger.current = trigger;

    const layer = layerRef.current;
    if (!layer) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const count = 12;
    const elements: HTMLSpanElement[] = [];

    for (let i = 0; i < count; i += 1) {
      const el = document.createElement("span");
      el.textContent = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
      el.style.position = "absolute";
      el.style.left = `${8 + Math.random() * 84}%`;
      el.style.bottom = "-8%";
      el.style.fontSize = `${1.2 + Math.random() * 0.9}rem`;
      layer.appendChild(el);
      elements.push(el);
    }

    const timelines: gsap.core.Tween[] = [];

    elements.forEach((el, index) => {
      const travel = window.innerHeight * (0.75 + Math.random() * 0.35);
      const sway = 40 + Math.random() * 70;
      const duration = 3.4 + Math.random() * 1.8;

      gsap.set(el, { opacity: 0, y: 0, x: 0, scale: 0.6, rotation: 0 });

      const tl = gsap.timeline({ delay: index * 0.09 });
      tl.to(el, { opacity: 0.95, scale: 1, duration: 0.35, ease: "back.out(2)" })
        .to(
          el,
          {
            y: -travel,
            x: Math.random() > 0.5 ? sway : -sway,
            rotation: (Math.random() - 0.5) * 50,
            duration,
            ease: "sine.inOut",
          },
          0
        )
        .to(el, { opacity: 0, duration: 0.6, ease: "power1.in" }, `>-0.8`)
        .call(() => el.remove());

      timelines.push(tl as unknown as gsap.core.Tween);
    });

    return () => {
      timelines.forEach((tl) => tl.kill());
      elements.forEach((el) => el.remove());
    };
  }, [trigger]);

  return <div ref={layerRef} className="hearts-layer" aria-hidden="true" />;
}
