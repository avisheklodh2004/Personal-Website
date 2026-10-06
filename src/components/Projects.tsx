import { ArrowUpRight } from "lucide-react";
import { Reveal, SectionHead } from "./Reveal";
import fitstackImage from "asset:fitstack.png";
import outdrobeImage from "asset:outdrobe.png";
import scantapsImage from "asset:scantaps.png";

const projects = [
  {
    name: "ScanTaps",
    tagline: "ASU lost and found system",
    description:
      "As design lead, built a hybrid NFC and QR lost-and-found system to modernize ASU's item recovery. A Progressive Web App with ASU SSO, encrypted chat and a Firebase backend supporting 1,000+ tags.",
    image: scantapsImage,
    tags: ["React", "Firebase", "NFC", "QR Code", "PWA", "ASU SSO"],
  },
  {
    name: "OutDrobe",
    tagline: "AI-powered personal stylist",
    description:
      "A voice-driven stylist that scans your wardrobe, generates outfits and suggests affordable matching items. Speech by Fish Audio, vision tagging with Google Cloud Vision and BLIP, and a Three.js dashboard.",
    image: outdrobeImage,
    tags: ["TypeScript", "Three.js", "Google Cloud Vision", "Fish Audio", "BLIP"],
  },
  {
    name: "FitStack",
    tagline: "Real-time gym insights",
    description:
      "Live gym occupancy from camera-based motion detection, without storing personal data. An Angular frontend with live analytics that suggests the best time to work out.",
    image: fitstackImage,
    tags: ["Angular", "Motion Detection", "Real-Time Analytics", "Privacy-Focused"],
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
          lede="Things I've designed and shipped, from campus infrastructure to AI side projects."
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
