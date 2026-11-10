"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { MusicIcon, MuteIcon, PauseIcon, PlayIcon, VolumeIcon } from "./icons";

type MusicPlayerProps = {
  songUrl: string;
  songTitle: string;
  /** Set true right when the gift opens, to prompt the visitor to hit play. */
  showHint?: boolean;
};

export default function MusicPlayer({ songUrl, songTitle, showHint = false }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);
  const hasSong = Boolean(songUrl);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch(() => {
        setIsPlaying(false);
        setLoadError(true);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    setLoadError(false);
  }, [songUrl]);

  useEffect(() => {
    if (!showHint || !hasSong) return;
    setHintVisible(true);
    const timer = window.setTimeout(() => setHintVisible(false), 6000);
    return () => window.clearTimeout(timer);
  }, [showHint, hasSong]);

  useEffect(() => {
    if (!hintVisible || !hintRef.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    gsap.fromTo(
      hintRef.current,
      { opacity: 0, y: 10, scale: 0.85 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(2)" }
    );
  }, [hintVisible]);

  const dismissHint = () => setHintVisible(false);

  if (!hasSong) {
    return (
      <div className="music-player" aria-label="Music player">
        <span className="music-player__btn btn btn--icon" aria-hidden="true">
          <MusicIcon size={16} />
        </span>
        <span className="music-player__label">No song added yet</span>
      </div>
    );
  }

  return (
    <div className="music-player" aria-label="Background music player">
      {hintVisible ? (
        <div className="music-player__hint" ref={hintRef} role="status">
          <span className="music-player__hint-text">🎵 There's a song for this, tap play!</span>
        </div>
      ) : null}

      <audio
        ref={audioRef}
        src={songUrl}
        loop
        preload="none"
        onError={() => {
          setIsPlaying(false);
          setLoadError(true);
        }}
      />

      <button
        type="button"
        className="btn btn--icon music-player__btn"
        onClick={() => {
          setIsPlaying((value) => !value);
          dismissHint();
        }}
        aria-pressed={isPlaying}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        data-tooltip={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>

      <button
        type="button"
        className="btn btn--icon music-player__btn"
        onClick={() => {
          setIsMuted((value) => !value);
          dismissHint();
        }}
        aria-pressed={isMuted}
        aria-label={isMuted ? "Unmute sound" : "Mute sound"}
        data-tooltip={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <MuteIcon /> : <VolumeIcon />}
      </button>

      {loadError ? (
        <span className="music-player__label music-player__label--error">
          Can't play this link. It needs to be a direct audio file (.mp3), not a page link.
        </span>
      ) : (
        <span className="music-player__label">{songTitle}</span>
      )}
    </div>
  );
}
