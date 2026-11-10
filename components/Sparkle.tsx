"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import sparkleAnimation from "@/public/lottie/sparkle.json";

type SparkleProps = {
  className?: string;
};

export default function Sparkle({ className = "" }: SparkleProps) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  if (!enabled) return null;

  return (
    <div className={`sparkle ${className}`} aria-hidden="true">
      <Lottie animationData={sparkleAnimation} loop autoplay />
    </div>
  );
}
