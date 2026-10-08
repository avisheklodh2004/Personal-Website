import { Reveal, SectionHead } from "./Reveal";

const roles = [
  {
    title: "ETS Unified IT Aide",
    org: "Ira A. Fulton Schools of Engineering, Arizona State University",
    period: "Jun 2026 - Present",
    points: [
      "Remediated 50+ endpoint vulnerability reports for the School for Engineering of Matter, Transport and Energy, resolving critical and high-severity findings through patching, upgrades and removing unsupported software.",
      "Provision and configure endpoints end to end: OS imaging, system configuration, Active Directory domain joins and workstation setup.",
      "Diagnose and resolve hardware, software, network and account-access tickets for faculty and staff in ServiceNow, through to closure.",
      "Work with the IT team on process improvements that make campus IT services faster and more reliable.",
    ],
  },
  {
    title: "Lead Ambassador, Barrett Summer Scholars & RISE",
    org: "Access ASU, EOSS Campus Experience",
    period: "May 2026 - Jun 2026",
    points: [
      "Supervised a team of 25+ ambassadors and coordinated daily operations with ASU staff for 400+ high-achieving K-12 students.",
      "Primary point of contact for ambassadors and participants, resolving issues and keeping academic and residential settings safe and inclusive.",
    ],
  },
  {
    title: "Industry Representative",
    org: "Software Developers Association, Arizona State University",
    period: "Jan 2025 - Present",
    summary: "Also Event Coordinator from Dec 2025 to May 2026.",
    points: [
      "Secured corporate sponsorships from State Farm and ReliaQuest, expanding club funding and event reach.",
      "Planned hackathons, workshops and speaker sessions with industry leaders including State Farm and Amazon.",
    ],
  },
  {
    title: "Campus Experience Ambassador",
    org: "Access ASU",
    period: "Aug 2025 - Jun 2026",
    points: [
      "Delivered 200+ tours and presentations to prospective students and families, explaining university resources and admissions to non-technical audiences.",
    ],
  },
];

export function Experience() {
  return (
    <section className="section" id="experience">
      <div className="container">
        <SectionHead piece="R" move="Rxg8#" title="Experience" lede="IT, leadership and campus roles, most recent first." />
        <ol className="roles">
          {roles.map((r, i) => (
            <Reveal as="li" key={r.title} delay={i * 0.04} className="role">
                <p className="role__period">{r.period}</p>
                <div className="role__body">
                  <h3>{r.title}</h3>
                  <p className="role__org">{r.org}</p>
                  {r.summary && <p className="role__summary">{r.summary}</p>}
                  <ul>
                    {r.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
