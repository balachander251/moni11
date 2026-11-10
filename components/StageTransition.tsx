"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

type StackEntry = {
  key: string;
  node: React.ReactNode;
};

type StageTransitionProps = {
  /** Changing this triggers a slide from the old content to the new. */
  stageKey: string;
  children: React.ReactNode;
  zIndex?: number;
};

/**
 * Wraps a sequence of full-screen stages (loading -> lock screen -> intro)
 * and slides smoothly from one to the next whenever `stageKey` changes,
 * instead of the old content just vanishing and the new content popping in.
 *
 * Each stage keeps managing its own internal animations independently —
 * this only adds one extra slide transform on the outer wrapper, so it
 * layers on top of whatever entrance/exit motion the stage already does.
 */
export default function StageTransition({ stageKey, children, zIndex = 200 }: StageTransitionProps) {
  const [stack, setStack] = useState<StackEntry[]>([{ key: stageKey, node: children }]);
  const nodesRef = useRef<Map<string, HTMLDivElement>>(new Map());
  const prevKeyRef = useRef(stageKey);

  useEffect(() => {
    if (stageKey === prevKeyRef.current) {
      // Same stage, but its own props/content may have changed — keep the
      // stack entry's node fresh without triggering a slide.
      setStack((current) =>
        current.map((entry) => (entry.key === stageKey ? { ...entry, node: children } : entry))
      );
      return;
    }

    const outgoingKey = prevKeyRef.current;
    prevKeyRef.current = stageKey;
    setStack((current) => [...current, { key: stageKey, node: children }]);

    const frame = requestAnimationFrame(() => {
      const outgoingEl = nodesRef.current.get(outgoingKey);
      const incomingEl = nodesRef.current.get(stageKey);

      const cleanup = () => {
        setStack((current) => current.filter((entry) => entry.key !== outgoingKey));
      };

      if (!outgoingEl || !incomingEl) {
        cleanup();
        return;
      }

      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) {
        cleanup();
        return;
      }

      gsap.set(incomingEl, { yPercent: 100 });
      gsap.set(outgoingEl, { yPercent: 0 });

      gsap
        .timeline({ onComplete: cleanup })
        .to(outgoingEl, { yPercent: -100, duration: 0.7, ease: "power3.inOut" }, 0)
        .to(incomingEl, { yPercent: 0, duration: 0.7, ease: "power3.inOut" }, 0);
    });

    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stageKey]);

  return (
    <>
      {stack.map((entry) => (
        <div
          key={entry.key}
          ref={(el) => {
            if (el) nodesRef.current.set(entry.key, el);
            else nodesRef.current.delete(entry.key);
          }}
          style={{ position: "fixed", inset: 0, zIndex }}
        >
          {entry.node}
        </div>
      ))}
    </>
  );
}
