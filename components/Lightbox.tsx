"use client";

import { useEffect, useRef } from "react";
import PhotoFrame from "./PhotoFrame";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "./icons";
import { getLenis } from "./lenis-singleton";
import type { Photo } from "@/data/content";

type LightboxProps = {
  photos: Photo[];
  activeIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export default function Lightbox({ photos, activeIndex, onClose, onNavigate }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const photo = photos[activeIndex];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    getLenis()?.stop();
    return () => {
      document.body.style.overflow = "";
      getLenis()?.start();
    };
  }, []);

  useEffect(() => {
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowLeft") {
        onNavigate((activeIndex - 1 + photos.length) % photos.length);
      } else if (event.key === "ArrowRight") {
        onNavigate((activeIndex + 1) % photos.length);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, photos.length, onClose, onNavigate]);

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`Photo: ${photo.caption || photo.alt}`}
      onClick={onClose}
    >
      <div className="lightbox__stage" onClick={(event) => event.stopPropagation()}>
        <button
          ref={closeRef}
          type="button"
          className="btn btn--icon btn--ghost lightbox__close"
          onClick={onClose}
          data-tooltip="Close (Esc)"
          aria-label="Close photo gallery"
        >
          <CloseIcon />
        </button>

        <button
          type="button"
          className="btn btn--icon btn--ghost lightbox__nav lightbox__nav--prev"
          onClick={() => onNavigate((activeIndex - 1 + photos.length) % photos.length)}
          data-tooltip="Previous photo"
          aria-label="View previous photo"
        >
          <ChevronLeftIcon />
        </button>

        <PhotoFrame photo={photo} className="lightbox__frame" priority sizes="92vw" />

        <button
          type="button"
          className="btn btn--icon btn--ghost lightbox__nav lightbox__nav--next"
          onClick={() => onNavigate((activeIndex + 1) % photos.length)}
          data-tooltip="Next photo"
          aria-label="View next photo"
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
}
