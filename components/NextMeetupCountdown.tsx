"use client";

import { useEffect, useState } from "react";

type NextMeetupCountdownProps = {
  targetDateISO: string;
  location: string;
  whenLabel: string;
};

type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  arrived: boolean;
};

function getRemaining(targetDateISO: string): Remaining | null {
  const target = new Date(`${targetDateISO}T00:00:00`);
  if (Number.isNaN(target.getTime())) return null;

  const diffMs = target.getTime() - Date.now();
  if (diffMs <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, arrived: true };
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, arrived: false };
}

export default function NextMeetupCountdown({
  targetDateISO,
  location,
  whenLabel,
}: NextMeetupCountdownProps) {
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    if (!targetDateISO) return;

    setRemaining(getRemaining(targetDateISO));
    const interval = window.setInterval(() => {
      setRemaining(getRemaining(targetDateISO));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [targetDateISO]);

  if (!targetDateISO || !remaining) {
    return (
      <p className="days-counter days-counter--empty">
        Fill in <code>nextMeetupDateISO</code> in data/content.ts to show a countdown to when
        you'll see each other again.
      </p>
    );
  }

  if (remaining.arrived) {
    return (
      <div className="days-counter days-counter--meetup">
        <span className="days-counter__value">🎉</span>
        <span className="days-counter__label">
          It's {whenLabel.toLowerCase()}, {location} is happening
        </span>
      </div>
    );
  }

  return (
    <div className="days-counter days-counter--meetup" role="status" aria-live="off">
      <span className="days-counter__value">{remaining.days.toLocaleString("en-US")}</span>
      <span className="days-counter__label">days until {whenLabel.toLowerCase()}</span>
      <span className="days-counter__ticker">
        {String(remaining.hours).padStart(2, "0")}:{String(remaining.minutes).padStart(2, "0")}:
        {String(remaining.seconds).padStart(2, "0")}
      </span>
      <span className="days-counter__note">📍 Seeing you in {location}</span>
    </div>
  );
}
