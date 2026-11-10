"use client";

import { useState } from "react";
import PhotoFrame from "./PhotoFrame";
import Reveal from "./Reveal";
import Lightbox from "./Lightbox";
import KineticText from "./KineticText";
import type { Photo } from "@/data/content";

type GalleryProps = {
  photos: Photo[];
};

export default function Gallery({ photos }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="section section--turquoise" id="gallery" aria-label="Memory gallery">
      <Reveal as="p" className="section__eyebrow">
        Our little album
      </Reveal>
      <h2 className="section__title">
        <KineticText text="Memory Gallery" />
      </h2>

      <div className="gallery__grid">
        {photos.map((photo, index) => (
          <Reveal as="div" variant="pop" key={index} delay={index * 90}>
            <button
              type="button"
              className="gallery__item"
              onClick={() => setActiveIndex(index)}
              aria-label={`Open photo: ${photo.caption || photo.alt}`}
            >
              <PhotoFrame photo={photo} />
            </button>
          </Reveal>
        ))}
      </div>

      {activeIndex !== null ? (
        <Lightbox
          photos={photos}
          activeIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNavigate={setActiveIndex}
        />
      ) : null}
    </section>
  );
}
