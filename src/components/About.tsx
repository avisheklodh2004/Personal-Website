import { Reveal, SectionHead } from "./Reveal";

const facts = [
  { term: "Studying", detail: "B.S. Computer Science, Arizona State University. Expected May 2028." },
  {
    term: "Record",
    detail: "4.00 GPA, Dean's List. Changemaker Scholar, Gregory R. Rein Scholarship and MLH HackCon Scholarship.",
  },
  { term: "Working", detail: "ETS Unified IT Aide at the Ira A. Fulton Schools of Engineering." },
  { term: "Training", detail: "pwn.college: Intro to Cybersecurity, Linux Luminarium and the CTF Archive." },
  { term: "Building with", detail: "Python, TypeScript, React, Angular, Firebase and Google Cloud Vision." },
  { term: "Community", detail: "Industry Representative for the Software Developers Association at ASU." },
];

export function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <SectionHead piece="P" move="1. e4" title="About" />
        <div className="about">
          <Reveal className="about__text">
            <p className="about__lead">
              I'm a Computer Science student at Arizona State University working in IT and security, and building
              full-stack apps on the side.
            </p>
            <p>
              By day I patch vulnerabilities, image and provision machines, and close support tickets for the Fulton
              Schools of Engineering. Outside of that I'm training on pwn.college and building things like ScanTaps, a
              secure lost-and-found system for ASU.
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
