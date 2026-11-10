"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { BackspaceIcon, LockIcon } from "./icons";
import { getLenis } from "./lenis-singleton";
import Confetti from "./Confetti";
import { playKeyTap, playPinSuccess, playPinWrong } from "./sound-effects";

type PinScreenProps = {
  pin: string;
  partnerName: string;
  hint?: string;
  onUnlock: () => void;
};

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "back"];

export default function PinScreen({ pin, partnerName, hint, onUnlock }: PinScreenProps) {
  const [digits, setDigits] = useState<string[]>([]);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [confettiTrigger, setConfettiTrigger] = useState(0);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const dotsRef = useRef<HTMLDivElement>(null);
  const busyRef = useRef(false);

  const showHint = Boolean(hint) && wrongAttempts >= 2;

  const length = pin.length;

  useEffect(() => {
    if (digits.length !== length || busyRef.current) return;
    busyRef.current = true;

    const entered = digits.join("");
    if (entered === pin) {
      playPinSuccess();
      setSuccess(true);
      setConfettiTrigger((value) => value + 1);
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (dotsRef.current && !prefersReduced) {
        gsap.fromTo(
          dotsRef.current,
          { scale: 0.85 },
          { scale: 1, duration: 0.6, ease: "elastic.out(1, 0.45)" }
        );
      }
      window.setTimeout(onUnlock, 1300);
    } else {
      playPinWrong();
      setError(true);
      setWrongAttempts((count) => count + 1);
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (dotsRef.current && !prefersReduced) {
        gsap.fromTo(
          dotsRef.current,
          { x: -10 },
          { x: 0, duration: 0.5, ease: "elastic.out(1, 0.35)" }
        );
      }
      window.setTimeout(() => {
        setDigits([]);
        setError(false);
        busyRef.current = false;
      }, 650);
    }
  }, [digits, length, onUnlock, pin]);

  const pressKey = (key: string) => {
    if (busyRef.current || success) return;
    playKeyTap();
    if (key === "back") {
      setDigits((current) => current.slice(0, -1));
      return;
    }
    if (key === "") return;
    setDigits((current) => (current.length < length ? [...current, key] : current));
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key >= "0" && event.key <= "9") {
        pressKey(event.key);
      } else if (event.key === "Backspace") {
        pressKey("back");
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    getLenis()?.stop();
    return () => {
      document.body.style.overflow = "";
      getLenis()?.start();
    };
  }, []);

  return (
    <div className="pin-screen" role="dialog" aria-modal="true" aria-label="Enter code to unlock">
      <LockIcon size={30} className="pin-screen__lock" />
      <h1 className="pin-screen__title">A little something for {partnerName}</h1>
      <p className="pin-screen__subtitle">Enter the code to unlock it 💛</p>
      {showHint ? <p className="pin-screen__hint">{hint}</p> : null}

      <div
        className={`pin-screen__dots ${error ? "pin-screen__dots--error" : ""} ${
          success ? "pin-screen__dots--success" : ""
        }`}
        ref={dotsRef}
        aria-live="polite"
      >
        {Array.from({ length }).map((_, index) => (
          <span key={index} className={index < digits.length ? "is-filled" : ""} />
        ))}
      </div>

      <p className="pin-screen__error" role="status">
        {error ? "That's not quite it, try again." : success ? "Unlocked! 🎉" : " "}
      </p>

      <div className="pin-screen__keypad">
        {KEYS.map((key, index) =>
          key === "" ? (
            <span key={index} aria-hidden="true" />
          ) : (
            <button
              key={index}
              type="button"
              className="pin-screen__key"
              onClick={() => pressKey(key)}
              aria-label={key === "back" ? "Delete last digit" : `Digit ${key}`}
            >
              {key === "back" ? <BackspaceIcon /> : key}
            </button>
          )
        )}
      </div>

      <Confetti trigger={confettiTrigger} big />
    </div>
  );
}
