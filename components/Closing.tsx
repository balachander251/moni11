import Reveal from "./Reveal";
import PhotoFrame from "./PhotoFrame";
import Sparkle from "./Sparkle";
import KineticText from "./KineticText";
import { ReplayIcon } from "./icons";
import type { Photo } from "@/data/content";

type ClosingProps = {
  partnerName: string;
  senderName: string;
  photo: Photo;
  onReplay: () => void;
};

export default function Closing({ partnerName, senderName, photo, onReplay }: ClosingProps) {
  return (
    <section className="section closing" id="closing" aria-label="Closing">
      <div className="closing__title-wrap">
        <Sparkle className="closing__sparkle" />
        <h2 className="closing__title">
          <KineticText text={`Happy birthday, ${partnerName}.`} />
        </h2>
      </div>
      <Reveal as="p" delay={100} className="closing__thanks">
        Thank you for being in my life.
      </Reveal>

      <Reveal as="div" variant="pop" delay={200} className="closing__frame">
        <PhotoFrame photo={photo} showCaption={false} sizes="320px" />
      </Reveal>

      <Reveal as="div" delay={300}>
        <button type="button" className="btn btn--ghost closing__replay" onClick={onReplay}>
          <ReplayIcon />
          Watch it again from the start
        </button>
      </Reveal>

      <footer className="footer">Made with love by {senderName}</footer>
    </section>
  );
}
