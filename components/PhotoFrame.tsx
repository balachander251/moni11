"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CameraIcon } from "./icons";
import type { Photo } from "@/data/content";

type PhotoFrameProps = {
  photo: Photo;
  className?: string;
  priority?: boolean;
  showCaption?: boolean;
  sizes?: string;
};

const VIDEO_EXTENSIONS = [".mp4", ".webm", ".ogg", ".mov", ".m4v"];

function isVideoSrc(src: string) {
  const clean = src.split("?")[0].toLowerCase();
  return VIDEO_EXTENSIONS.some((ext) => clean.endsWith(ext));
}

export default function PhotoFrame({
  photo,
  className = "",
  priority = false,
  showCaption = true,
  sizes = "(min-width: 640px) 33vw, 45vw",
}: PhotoFrameProps) {
  const [errored, setErrored] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasPhoto = Boolean(photo.src) && !errored;
  const isVideo = hasPhoto && isVideoSrc(photo.src);

  useEffect(() => {
    if (!isVideo || !videoRef.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      videoRef.current.pause();
    }
  }, [isVideo]);

  return (
    <div className={`frame ${hasPhoto ? "" : "frame--empty"} ${className}`}>
      <span className="frame__tape" aria-hidden="true" />
      <div className="frame__window">
        {hasPhoto ? (
          isVideo ? (
            <video
              ref={videoRef}
              className="frame__video"
              src={photo.src}
              aria-label={photo.alt}
              autoPlay
              loop
              muted
              playsInline
              onError={() => setErrored(true)}
            />
          ) : (
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes={sizes}
              priority={priority}
              loading={priority ? undefined : "lazy"}
              className="frame__img"
              onError={() => setErrored(true)}
            />
          )
        ) : (
          <>
            <CameraIcon className="frame__empty-icon" />
            <p>No photo yet, add one to public/photos</p>
          </>
        )}
      </div>
      {showCaption && photo.caption ? <p className="frame__caption">{photo.caption}</p> : null}
    </div>
  );
}
