import { Reveal, SectionHead } from "./Reveal";

const facts = [
  {
    term: "Studying",
    detail: "B.S. Computer Science (Software Engineering), Arizona State University. Expected May 2028.",
  },
  { term: "Record", detail: "4.00 GPA, Dean's List." },
  { term: "Before ASU", detail: "Edexcel IAL Award, Sir John Wilson School, Dhaka. Graduated May 2024." },
  { term: "Building with", detail: "React, Angular, TypeScript and Firebase, plus vision and speech APIs." },
  { term: "Community", detail: "Campus Ambassador at ASU, and four years volunteering with Jiban-Tori Foundation." },
  { term: "Speaks", detail: "English and Bangla." },
];

export function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <SectionHead piece="P" move="1. e4" title="About" />
        <div className="about">
          <Reveal className="about__text">
            <p className="about__lead">
              I'm a Computer Science student at Arizona State University who's endlessly curious about how people and
              technology connect.
            </p>
            <p>
              I'm drawn to the creative side of tech: the part where design, storytelling and problem-solving come
              together to make something that actually feels human.
            </p>
            <p>Beyond the screen you'll probably find me at a concert, out on a trail, or chasing sunsets with a camera in hand.</p>
          </Reveal>
          <Reveal delay={0.08}>
            <dl className="facts">
              {facts.map((f) => (
                <div key={f.term} className="facts__row">
                  <dt>{f.term}</dt>
                  <dd>{f.detail}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
