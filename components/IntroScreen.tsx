"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { GiftIcon } from "./icons";
import { getLenis } from "./lenis-singleton";
import { playGiftOpen } from "./sound-effects";

type IntroScreenProps = {
  partnerName: string;
  onOpened: () => void;
};

const BURST_SYMBOLS = ["🎉", "✨", "🎈", "🎊", "⭐", "🎉", "💛", "✨"];

export default function IntroScreen({ partnerName, onOpened }: IntroScreenProps) {
  const [closing, setClosing] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const giftRef = useRef<HTMLSpanElement>(null);
  const busyRef = useRef(false);
  const idleTweenRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    getLenis()?.stop();
    return () => {
      document.body.style.overflow = "";
      getLenis()?.start();
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const symbol = root.querySelector(".intro__gift-symbol");
    const title = root.querySelector(".intro__title");
    const subtitle = root.querySelector(".intro__subtitle");
    const button = root.querySelector(".intro__button");

    if (prefersReduced) {
      gsap.set([symbol, title, subtitle, button], { opacity: 1, y: 0, scale: 1 });
      return;
    }

    gsap.set(symbol, { opacity: 0, y: 22, scale: 0.4, rotation: -20 });
    gsap.set([title, subtitle, button], { opacity: 0, y: 22 });

    const tl = gsap.timeline({ delay: 0.15 });
    tl.to(symbol, { opacity: 1, y: 0, scale: 1, rotation: 0, duration: 0.75, ease: "elastic.out(1, 0.5)" })
      .to(title, { opacity: 1, y: 0, duration: 0.65, ease: "back.out(1.9)" }, "-=0.35")
      .to(subtitle, { opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.9)" }, "-=0.4")
      .to(button, { opacity: 1, y: 0, duration: 0.55, ease: "back.out(2.2)" }, "-=0.35");

    idleTweenRef.current = gsap
      .timeline({ delay: 1.1, repeat: -1 })
      .to(giftRef.current, {
        rotation: -10,
        scaleX: 1.06,
        scaleY: 0.94,
        duration: 0.7,
        ease: "sine.inOut",
        transformOrigin: "50% 90%",
      })
      .to(giftRef.current, {
        rotation: 10,
        scaleX: 0.94,
        scaleY: 1.06,
        duration: 0.7,
        ease: "sine.inOut",
        transformOrigin: "50% 90%",
      })
      .to(giftRef.current, {
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        duration: 0.5,
        ease: "sine.inOut",
        transformOrigin: "50% 90%",
      });

    return () => {
      tl.kill();
      idleTweenRef.current?.kill();
    };
  }, []);

  const handleOpen = () => {
    if (busyRef.current) return;
    busyRef.current = true;
    playGiftOpen();

    const root = rootRef.current;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced || !root) {
      setClosing(true);
      window.setTimeout(() => {
        document.body.style.overflow = "";
        onOpened();
      }, 80);
      return;
    }

    idleTweenRef.current?.kill();
    const burstEls = root.querySelectorAll<HTMLElement>(".intro__burst span");
    const panel = root.querySelectorAll(".intro__title, .intro__subtitle, .intro__button");

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        onOpened();
      },
    });

    tl.to(giftRef.current, { scale: 1.25, duration: 0.22, ease: "power1.out" })
      .to(giftRef.current, { scale: 1, rotation: 0, duration: 0.3, ease: "back.out(2)" });

    tl.addLabel("burst");

    burstEls.forEach((el, index) => {
      const angle = (index / burstEls.length) * Math.PI * 2;
      const distance = 90 + Math.random() * 60;
      tl.to(
        el,
        {
          opacity: 1,
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance - 40,
          rotation: (Math.random() - 0.5) * 120,
          scale: 1.1,
          duration: 0.7,
          ease: "power2.out",
        },
        `burst+=${index * 0.04}`
      ).to(el, { opacity: 0, duration: 0.4, ease: "power1.in" }, ">-0.1");
    });

    tl.to(panel, { opacity: 0, y: -14, duration: 0.35, ease: "power2.in", stagger: 0.04 }, "-=0.5")
      .add(() => setClosing(true))
      .to(root, { opacity: 0, scale: 1.04, duration: 0.55, ease: "power2.inOut" }, "-=0.05");
  };

  return (
    <div
      ref={rootRef}
      className="intro"
      data-closing={closing}
      role="dialog"
      aria-modal="true"
      aria-label="Birthday gift opening screen"
    >
      <span className="intro__gift-symbol" aria-hidden="true" ref={giftRef}>
        🎁
      </span>
      <h1 className="intro__title">
        Happy birthday, <br /> {partnerName}
      </h1>
      <p className="intro__subtitle">There's a little gift I want to show you.</p>

      <button type="button" className="btn btn--primary intro__button" onClick={handleOpen}>
        <GiftIcon className="intro__gift" />
        Open your gift
      </button>

      <div className="intro__burst" aria-hidden="true">
        {BURST_SYMBOLS.map((symbol, index) => (
          <span key={index}>{symbol}</span>
        ))}
      </div>
    </div>
  );
}
