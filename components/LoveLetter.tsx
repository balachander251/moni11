import Reveal from "./Reveal";

type LoveLetterProps = {
  partnerName: string;
  senderName: string;
  paragraphs: string[];
};

export default function LoveLetter({ partnerName, senderName, paragraphs }: LoveLetterProps) {
  return (
    <section className="section section--pink" id="letter" aria-label="Love letter">
      <Reveal as="p" className="section__eyebrow">
        A little letter
      </Reveal>

      <Reveal as="div" className="letter">
        <p className="letter__to">To {partnerName},</p>

        {paragraphs.map((paragraph, index) => (
          <Reveal as="p" key={index} delay={index * 120} className="letter__paragraph">
            {paragraph}
          </Reveal>
        ))}

        <p className="letter__signature">With love, {senderName}</p>
      </Reveal>
    </section>
  );
}
