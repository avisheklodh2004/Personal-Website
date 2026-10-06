import { ArrowUpRight } from "lucide-react";
import { Reveal, SectionHead } from "./Reveal";
import fitstackImage from "asset:fitstack.png";
import outdrobeImage from "asset:outdrobe.png";
import scantapsImage from "asset:scantaps.png";

const projects = [
  {
    name: "ScanTaps",
    tagline: "Secure lost and found system · Engineering EPICS, ASU",
    description:
      "Led design and development of a hybrid NFC and QR lost-and-found Progressive Web App with ASU SSO and encrypted chat between finders and owners. The prototype supports 1,000+ tags with offline caching and real-time Firebase updates, built with ASU Lost & Found staff to meet accessibility and data-privacy requirements.",
    image: scantapsImage,
    tags: ["Firebase", "PWA", "ASU SSO", "NFC", "QR Code", "React"],
  },
  {
    name: "OutDrobe",
    tagline: "AI-powered personal stylist · Cal Hacks 2025",
    description:
      "A voice-integrated AI stylist that generates personalized outfits, combining speech recognition from Fish Audio with image tagging from Google Cloud Vision and BLIP, in a Three.js dashboard.",
    image: outdrobeImage,
    tags: ["TypeScript", "Three.js", "Google Cloud Vision", "Fish Audio", "BLIP"],
  },
  {
    name: "FitStack",
    tagline: "Real-time gym occupancy tracker · SunHacks 2025",
    description:
      "A privacy-conscious occupancy tracker using camera-based motion detection with no personal data stored, plus an Angular dashboard that recommends the best times to work out.",
    image: fitstackImage,
    tags: ["Angular", "Computer Vision", "Motion Detection", "Privacy-Focused"],
  },
];

export function Projects() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <SectionHead
          piece="N"
          move="2. Nf3"
          title="Projects"
          lede="Things I've designed and built, from campus infrastructure to hackathon projects."
        />
        <div className="projects">
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.06} className={`project ${i === 0 ? "project--feature" : ""}`}>
              <a
                className="project__link"
                href="https://github.com/avisheklodh2004"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${p.name} on GitHub`}
              >
                <div className="project__media">
                  <img src={p.image} alt={`${p.name} screenshot`} loading="lazy" decoding="async" />
                </div>
                <div className="project__body">
                  <div className="project__title">
                    <h3>{p.name}</h3>
                    <ArrowUpRight size={18} strokeWidth={1.75} className="project__arrow" />
                  </div>
                  <p className="project__tagline">{p.tagline}</p>
                  <p className="project__desc">{p.description}</p>
                  <ul className="tags" aria-label="Built with">
                    {p.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
