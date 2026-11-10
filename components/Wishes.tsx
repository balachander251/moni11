import Reveal from "./Reveal";
import KineticText from "./KineticText";

type WishesProps = {
  intro: string;
  partnerName: string;
  wishes: string[];
};

export default function Wishes({ intro, partnerName, wishes }: WishesProps) {
  return (
    <section className="section section--coral" id="wishes" aria-label={`Wishes for ${partnerName}`}>
      <Reveal as="p" className="section__eyebrow">
        For {partnerName}
      </Reveal>
      <h2 className="section__title">
        <KineticText text="A List of Wishes" />
      </h2>
      <Reveal as="p" className="wishes__intro">
        {intro}
      </Reveal>

      <ul className="wishes__grid">
        {wishes.map((wish, index) => (
          <Reveal as="li" variant="wiggle" key={index} delay={index * 90} className="wishes__card">
            {wish}
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
