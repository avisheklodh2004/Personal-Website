import { Reveal, SectionHead } from "./Reveal";

const groups = [
  {
    name: "Security and IT",
    items: ["Vulnerability remediation", "Patch management", "Endpoint provisioning", "OS imaging", "Active Directory", "ServiceNow"],
  },
  { name: "Languages", items: ["Python", "Bash", "SQL", "Java", "TypeScript", "JavaScript", "HTML and CSS"] },
  {
    name: "Cloud and tools",
    items: ["Google Cloud Vision", "Firebase", "React", "Angular", "Git", "Windows, macOS, Linux"],
  },
  {
    name: "Training (pwn.college)",
    items: ["Web exploitation", "Network interception", "Cryptography", "Reverse engineering", "Binary exploitation", "Linux Luminarium", "CTF Archive"],
  },
];

export function Skills() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <SectionHead piece="B" move="Bxf6#" title="Skills" lede="What I use day to day in IT and security work, and what I build with." />
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
