import Reveal from "./Reveal";
import KineticText from "./KineticText";

type ReunionListProps = {
  items: string[];
  location: string;
};

export default function ReunionList({ items, location }: ReunionListProps) {
  return (
    <section className="section section--turquoise" id="reunion" aria-label="When we meet again">
      <Reveal as="p" className="section__eyebrow">
        The plan
      </Reveal>
      <h2 className="section__title">
        <KineticText text="When We Meet Again" />
      </h2>
      <Reveal as="p" className="section__lede">
        A little list of everything I want to do with you in {location || "person"}.
      </Reveal>

      <ol className="reunion__list">
        {items.map((item, index) => (
          <Reveal as="li" variant="bounce" key={index} delay={index * 90} className="reunion__item">
            <span className="reunion__index" aria-hidden="true">
              {index + 1}
            </span>
            {item}
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
