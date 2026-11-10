"use client";

import { useEffect } from "react";
import { getLenis } from "./lenis-singleton";

type LoadingScreenProps = {
  onDone: () => void;
  minDuration?: number;
};

export default function LoadingScreen({ onDone, minDuration = 1400 }: LoadingScreenProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    getLenis()?.stop();
    return () => {
      document.body.style.overflow = "";
      getLenis()?.start();
    };
  }, []);

  useEffect(() => {
    // No fade-out of its own anymore — StageTransition (in page.tsx) now
    // owns the visual exit via a slide, and it needs this screen to still
    // be fully opaque when that slide starts, not already faded to nothing.
    const timer = window.setTimeout(onDone, minDuration);
    return () => window.clearTimeout(timer);
  }, [minDuration, onDone]);

  return (
    <div className="loading-screen" role="status" aria-live="polite">
      <span className="loading-screen__icon" aria-hidden="true">
        🎁
      </span>
      <div className="loading-screen__dots" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <p className="loading-screen__label">Wrapping up a little surprise…</p>
    </div>
  );
}
