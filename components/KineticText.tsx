"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type KineticTextProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  stagger?: number;
};

/**
 * Splits text into words (kept intact via inline-block so they don't break
 * mid-word) and each word into per-letter spans, then pops every letter in
 * with a staggered, slightly-randomized tumble when it scrolls into view —
 * the big "kinetic type" signature of a motion-heavy landing page.
 */
export default function KineticText({
  text,
  as = "span",
  className = "",
  delay = 0,
  stagger = 0.025,
}: KineticTextProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const letters = Array.from(node.querySelectorAll<HTMLElement>(".kinetic-letter"));
    if (letters.length === 0) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      gsap.set(letters, { opacity: 1, y: 0, rotation: 0, scale: 1 });
      return;
    }

    const hiddenState = () => ({
      opacity: 0,
      y: 34,
      rotation: () => gsap.utils.random(-16, 16),
      scale: 0.6,
    });

    gsap.set(letters, hiddenState());

    let hasEnteredOnce = false;

    const show = (withDelay: boolean) => {
      gsap.to(letters, {
        opacity: 1,
        y: 0,
        rotation: 0,
        scale: 1,
        duration: 0.7,
        ease: "back.out(2.2)",
        stagger: { each: stagger, from: "start" },
        delay: withDelay ? delay / 1000 : 0,
        overwrite: true,
      });
      hasEnteredOnce = true;
    };

    const hide = () => {
      gsap.to(letters, {
        ...hiddenState(),
        duration: 0.4,
        ease: "power1.in",
        stagger: { each: stagger, from: "end" },
        overwrite: true,
      });
    };

    // Re-triggers every time the headline crosses in or out of view, in
    // either scroll direction — the tumble-in never "runs out" after once.
    const trigger = ScrollTrigger.create({
      trigger: node,
      start: "top 88%",
      end: "bottom 10%",
      onEnter: () => show(!hasEnteredOnce),
      onEnterBack: () => show(false),
      onLeave: () => hide(),
      onLeaveBack: () => hide(),
    });

    return () => trigger.kill();
  }, [text, delay, stagger]);

  const Tag = as as any;
  const words = text.split(" ");

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, wordIndex) => {
        const letters = word.split("").map((letter, letterIndex) => (
          <span className="kinetic-letter" key={letterIndex}>
            {letter}
          </span>
        ));
        const isLast = wordIndex === words.length - 1;
        return (
          <span key={wordIndex}>
            <span className="kinetic-word">{letters}</span>
            {isLast ? null : " "}
          </span>
        );
      })}
    </Tag>
  );
}
