import { ArrowUpRight } from "lucide-react";
import { Reveal, SectionHead } from "./Reveal";
import fitstackImage from "asset:fitstack.webp";
import outdrobeImage from "asset:outdrobe.webp";
import scantapsImage from "asset:scantaps.webp";

const projects = [
  {
    name: "ScanTaps",
    repo: "https://github.com/ScanTaps/ScanTaps",
    tagline: "Secure lost and found system · Engineering EPICS, ASU",
    description:
      "Led design and development of a hybrid NFC and QR lost-and-found Progressive Web App with ASU SSO and encrypted chat between finders and owners. The prototype supports 1,000+ tags with offline caching and real-time Firebase updates, built with ASU Lost & Found staff to meet accessibility and data-privacy requirements.",
    image: scantapsImage,
    alt: "ScanTaps logo, a phone-shaped tag sending a wireless signal",
    size: [1200, 785],
    tags: ["Firebase", "PWA", "ASU SSO", "NFC", "QR Code", "React"],
  },
  {
    name: "OutDrobe",
    repo: "https://github.com/avisheklodh2004/Outdrobe",
    tagline: "AI-powered personal stylist · Cal Hacks 2025",
    description:
      "A voice-integrated AI stylist that generates personalized outfits, combining speech recognition from Fish Audio with image tagging from Google Cloud Vision and BLIP, in a Three.js dashboard.",
    image: outdrobeImage,
    alt: "OutDrobe home page with the tagline Never wonder what to wear and floating clothing items",
    size: [1200, 553],
    tags: ["TypeScript", "Three.js", "Google Cloud Vision", "Fish Audio", "BLIP"],
  },
  {
    name: "FitStack",
    repo: "https://github.com/IshaanArekar/FitStack",
    tagline: "Real-time gym occupancy tracker · SunHacks 2025",
    description:
      "A privacy-conscious occupancy tracker using camera-based motion detection with no personal data stored, plus an Angular dashboard that recommends the best times to work out.",
    image: fitstackImage,
    alt: "FitStack logo, a map pin with a dumbbell",
    size: [1200, 946],
    tags: ["Angular", "Computer Vision", "Motion Detection", "Privacy-Focused"],
  },
];

export function Projects() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <SectionHead
          piece="N"
          move="Nf7#"
          title="Projects"
          lede="Things I've designed and built, from campus infrastructure to hackathon projects."
        />
        <div className="projects">
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.06} className={`project ${i === 0 ? "project--feature" : ""}`}>
              <a
                className="project__link"
                href={p.repo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${p.name} on GitHub`}
              >
                <div className="project__media">
                  <img
                    src={p.image}
                    alt={p.alt}
                    width={p.size[0]}
                    height={p.size[1]}
                    loading="lazy"
                    decoding="async"
                  />
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
