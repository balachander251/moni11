"use client";

import { useEffect, useState } from "react";

type DaysTogetherCounterProps = {
  startDateISO: string;
};

type Elapsed = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getElapsed(startDateISO: string): Elapsed | null {
  const start = new Date(`${startDateISO}T00:00:00`);
  if (Number.isNaN(start.getTime())) return null;

  const diffMs = Date.now() - start.getTime();
  if (diffMs < 0) return null;

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}

export default function DaysTogetherCounter({ startDateISO }: DaysTogetherCounterProps) {
  const [elapsed, setElapsed] = useState<Elapsed | null>(null);

  useEffect(() => {
    if (!startDateISO) return;

    setElapsed(getElapsed(startDateISO));
    const interval = window.setInterval(() => {
      setElapsed(getElapsed(startDateISO));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [startDateISO]);

  if (!startDateISO || !elapsed) {
    return (
      <p className="days-counter days-counter--empty">
        Fill in <code>relationshipStartDateISO</code> in data/content.ts to show the days-together
        counter here.
      </p>
    );
  }

  return (
    <div className="days-counter" role="status" aria-live="off">
      <span className="days-counter__value">{elapsed.days.toLocaleString("en-US")}</span>
      <span className="days-counter__label">days together, and counting</span>
      <span className="days-counter__ticker">
        {String(elapsed.hours).padStart(2, "0")}:{String(elapsed.minutes).padStart(2, "0")}:
        {String(elapsed.seconds).padStart(2, "0")}
      </span>
    </div>
  );
}
