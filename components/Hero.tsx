import PhotoFrame from "./PhotoFrame";
import Reveal from "./Reveal";
import Sparkle from "./Sparkle";
import KineticText from "./KineticText";
import type { Photo } from "@/data/content";

type HeroProps = {
  partnerName: string;
  age: string;
  birthdayDate: string;
  photo: Photo;
};

export default function Hero({ partnerName, age, birthdayDate, photo }: HeroProps) {
  return (
    <section className="hero" id="hero" aria-label="Birthday welcome">
      <Reveal as="div" variant="pop" className="hero__frame">
        <PhotoFrame photo={photo} priority sizes="(min-width: 640px) 300px, 78vw" showCaption={false} />
      </Reveal>

      <div className="hero__name-wrap">
        <Sparkle className="hero__sparkle" />
        <Reveal as="p" delay={80} className="hero__eyebrow">
          A special day for
        </Reveal>
        <h1 className="hero__name">
          <KineticText text={partnerName} delay={200} />
        </h1>
      </div>

      <Reveal delay={220} variant="wiggle" className="hero__meta" as="div">
        <span>🎂 {age} years old</span>
        <span>📅 {birthdayDate}</span>
      </Reveal>

      <Reveal delay={320}>
        <p className="hero__message">Today the world is celebrating someone who means so much to me.</p>
      </Reveal>

      <div className="hero__scroll" aria-hidden="true">
        <span className="hero__scroll-dot" />
        <span>Scroll to continue the story</span>
      </div>
    </section>
  );
}
