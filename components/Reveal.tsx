"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type RevealVariant = "fade" | "pop" | "bounce" | "wiggle";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: keyof JSX.IntrinsicElements;
  variant?: RevealVariant;
  [key: `aria-${string}`]: unknown;
  role?: string;
};

// Each preset only describes the HIDDEN starting state + how it eases back
// to neutral (duration/ease). Reveal always animates every transform prop
// back to its neutral rest value, so nothing gets left stuck mid-motion
// regardless of which properties a given preset uses.
const VARIANTS: Record<RevealVariant, gsap.TweenVars> = {
  fade: { y: 40, opacity: 0, duration: 1, ease: "power4.out" },
  pop: { scale: 0.72, rotation: -6, opacity: 0, duration: 0.9, ease: "elastic.out(1, 0.55)" },
  bounce: { y: -70, opacity: 0, duration: 1.05, ease: "bounce.out" },
  wiggle: { rotation: -12, scale: 0.86, opacity: 0, duration: 0.8, ease: "back.out(2.4)" },
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
  variant = "fade",
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      gsap.set(node, { opacity: 1, y: 0, x: 0, rotation: 0, scale: 1 });
      return;
    }

    // Clone the preset — gsap.set() mutates the vars object it's given (it
    // forces duration to 0 in place), so reusing VARIANTS[variant] directly
    // across every Reveal instance would silently zero out the animation.
    const from = { ...VARIANTS[variant] };
    gsap.set(node, { ...from });

    let hasEnteredOnce = false;

    const show = (withDelay: boolean) => {
      gsap.to(node, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        opacity: 1,
        duration: from.duration,
        ease: from.ease,
        delay: withDelay ? delay / 1000 : 0,
        overwrite: true,
      });
      hasEnteredOnce = true;
    };

    const hide = () => {
      gsap.to(node, {
        ...from,
        duration: (from.duration as number) * 0.55,
        ease: "power1.in",
        overwrite: true,
      });
    };

    // Re-triggers every time the element crosses in or out of view, in
    // either scroll direction — animation never "runs out" after once.
    const trigger = ScrollTrigger.create({
      trigger: node,
      start: "top 85%",
      end: "bottom 12%",
      onEnter: () => show(!hasEnteredOnce),
      onEnterBack: () => show(false),
      onLeave: () => hide(),
      onLeaveBack: () => hide(),
    });

    return () => trigger.kill();
  }, [variant, delay]);

  const Tag = as as any;

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
