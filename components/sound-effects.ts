"use client";

// Tiny synthesized UI sound effects via the Web Audio API — no external
// audio files needed, so there's nothing to license, host, or have fail to
// load. Each effect lazily creates/reuses a single shared AudioContext.
// Browsers block audio until a real user gesture happens, which is fine
// here since every effect below is only ever called from inside a click
// handler.

let audioContext: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctor = window.AudioContext || (window as any).webkitAudioContext;
  if (!Ctor) return null;
  if (!audioContext) {
    audioContext = new Ctor();
  }
  if (audioContext.state === "suspended") {
    audioContext.resume().catch(() => {});
  }
  return audioContext;
}

function tone(
  ctx: AudioContext,
  freq: number,
  startTime: number,
  duration: number,
  type: OscillatorType = "sine",
  peakGain = 0.12
) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, startTime);
  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.linearRampToValueAtTime(peakGain, startTime + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(startTime);
  osc.stop(startTime + duration + 0.02);
}

/** A soft tap for every PIN keypad press. */
export function playKeyTap() {
  const ctx = getContext();
  if (!ctx) return;
  tone(ctx, 720, ctx.currentTime, 0.06, "sine", 0.07);
}

/** A short buzzy blip for a wrong PIN. */
export function playPinWrong() {
  const ctx = getContext();
  if (!ctx) return;
  const t = ctx.currentTime;
  tone(ctx, 260, t, 0.12, "sawtooth", 0.09);
  tone(ctx, 180, t + 0.1, 0.16, "sawtooth", 0.09);
}

/** A cheerful little ascending chime for a correct PIN. */
export function playPinSuccess() {
  const ctx = getContext();
  if (!ctx) return;
  const t = ctx.currentTime;
  tone(ctx, 523.25, t, 0.14, "sine", 0.12); // C5
  tone(ctx, 659.25, t + 0.1, 0.14, "sine", 0.12); // E5
  tone(ctx, 783.99, t + 0.2, 0.24, "sine", 0.14); // G5
}

/** A quick soft whoosh for flipping a "reason" card over. */
export function playCardFlip() {
  const ctx = getContext();
  if (!ctx) return;
  const t = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(500, t);
  osc.frequency.exponentialRampToValueAtTime(760, t + 0.09);
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.linearRampToValueAtTime(0.08, t + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.11);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.13);
}

/** A magical little "pop + sparkle" for clicking the gift box open. */
export function playGiftOpen() {
  const ctx = getContext();
  if (!ctx) return;
  const t = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(300, t);
  osc.frequency.exponentialRampToValueAtTime(900, t + 0.18);
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.linearRampToValueAtTime(0.16, t + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.25);

  tone(ctx, 1200, t + 0.06, 0.15, "sine", 0.05);
}
