"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "./Reveal";
import DaysTogetherCounter from "./DaysTogetherCounter";
import NextMeetupCountdown from "./NextMeetupCountdown";
import KineticText from "./KineticText";
import type { TimelineEvent } from "@/data/content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type TimelineProps = {
  events: TimelineEvent[];
  relationshipStartDateISO: string;
  nextMeetupDateISO: string;
  nextMeetupLocation: string;
  nextMeetupWhenLabel: string;
};

export default function Timeline({
  events,
  relationshipStartDateISO,
  nextMeetupDateISO,
  nextMeetupLocation,
  nextMeetupWhenLabel,
}: TimelineProps) {
  const listRef = useRef<HTMLOListElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const progress = progressRef.current;
    if (!list || !progress) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dots = Array.from(list.querySelectorAll<HTMLElement>(".timeline__dot"));

    if (prefersReduced) {
      gsap.set(progress, { scaleX: 1, scaleY: 1 });
      gsap.set(dots, { scale: 1 });
      return;
    }

    gsap.set(progress, { scaleX: 0, scaleY: 0 });
    gsap.set(dots, { scale: 0 });

    const drawTrigger = ScrollTrigger.create({
      trigger: list,
      start: "top 75%",
      end: "bottom 65%",
      scrub: true,
      onUpdate: (self) => {
        gsap.set(progress, { scaleX: self.progress, scaleY: self.progress });
      },
    });

    const dotTriggers = dots.map((dot) =>
      ScrollTrigger.create({
        trigger: dot,
        start: "top 85%",
        end: "bottom 10%",
        onEnter: () => gsap.to(dot, { scale: 1, duration: 0.5, ease: "back.out(2.4)", overwrite: true }),
        onEnterBack: () => gsap.to(dot, { scale: 1, duration: 0.5, ease: "back.out(2.4)", overwrite: true }),
        onLeave: () => gsap.to(dot, { scale: 0, duration: 0.3, ease: "power1.in", overwrite: true }),
        onLeaveBack: () => gsap.to(dot, { scale: 0, duration: 0.3, ease: "power1.in", overwrite: true }),
      })
    );

    return () => {
      drawTrigger.kill();
      dotTriggers.forEach((t) => t.kill());
    };
  }, [events]);

  return (
    <section className="section section--sun" id="timeline" aria-label="Our relationship journey">
      <Reveal as="p" className="section__eyebrow">
        Our journey
      </Reveal>
      <h2 className="section__title">
        <KineticText text="Relationship Timeline" />
      </h2>

      <Reveal as="div" variant="pop" className="days-counter-wrap">
        <DaysTogetherCounter startDateISO={relationshipStartDateISO} />
      </Reveal>

      <Reveal as="div" variant="pop" delay={100} className="days-counter-wrap">
        <NextMeetupCountdown
          targetDateISO={nextMeetupDateISO}
          location={nextMeetupLocation}
          whenLabel={nextMeetupWhenLabel}
        />
      </Reveal>

      <div className="timeline-track">
        <div className="timeline__progress" ref={progressRef} aria-hidden="true" />
        <ol className="timeline" ref={listRef}>
          {events.map((event, index) => (
            <li key={index} className="timeline__item">
              <span className="timeline__dot" aria-hidden="true" />
              <span className="timeline__date">{event.date}</span>
              <p className="timeline__desc">{event.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
