import { Reveal, SectionHead } from "./Reveal";

const groups = [
  { name: "Languages", items: ["TypeScript", "JavaScript", "Python", "Java", "HTML", "CSS"] },
  { name: "Frameworks", items: ["React", "Angular", "Three.js", "Progressive Web Apps"] },
  { name: "Platforms and AI", items: ["Firebase", "Google Cloud Vision", "BLIP", "Fish Audio", "NFC and QR", "Git"] },
  { name: "Design and tools", items: ["Figma", "Canva", "Google Workspace", "Microsoft Office"] },
];

export function Skills() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <SectionHead piece="B" move="3. Bc4" title="Skills" lede="The tools I reach for, grouped by where they sit in the stack." />
        <Reveal className="skills">
          {groups.map((g) => (
            <div key={g.name} className="skills__group">
              <h3>{g.name}</h3>
              <ul>
                {g.items.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
