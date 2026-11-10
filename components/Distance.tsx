import Reveal from "./Reveal";
import KineticText from "./KineticText";

type DistanceProps = {
  paragraphs: string[];
  nextMeetupLocation: string;
  nextMeetupWhenLabel: string;
};

export default function Distance({ paragraphs, nextMeetupLocation, nextMeetupWhenLabel }: DistanceProps) {
  return (
    <section className="section section--pink" id="distance" aria-label="About the distance between us">
      <Reveal as="p" className="section__eyebrow">
        The hard part
      </Reveal>
      <h2 className="section__title">
        <KineticText text="About This Distance" />
      </h2>

      <div className="distance">
        {paragraphs.map((paragraph, index) => (
          <Reveal as="p" key={index} delay={index * 120} className="distance__paragraph">
            {paragraph}
          </Reveal>
        ))}

        {nextMeetupLocation ? (
          <Reveal as="p" variant="pop" delay={paragraphs.length * 120} className="distance__note">
            📍 {nextMeetupWhenLabel}, {nextMeetupLocation}. Counting down.
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
