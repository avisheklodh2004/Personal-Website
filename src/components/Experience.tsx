import { Reveal, SectionHead } from "./Reveal";

const roles = [
  {
    title: "Campus Experience Ambassador",
    org: "Access ASU",
    period: "Aug 2025 - Present",
    points: [
      "Communicate university resources and admissions processes to prospective students.",
      "Help coordinate events and check-in for prospective student visits.",
    ],
  },
  {
    title: "Barrett Summer Scholars Ambassador",
    org: "ASU EOSS Campus Experience, Access ASU",
    period: "May 2025 - Jun 2025",
    summary: "Facilitated academic and enrichment activities for high-achieving K-12 students.",
    points: [
      "Supervised students in residential, academic and recreational settings.",
      "Worked with a diverse team to run a seamless camp experience.",
    ],
  },
  {
    title: "Research Intern",
    org: "BRAC James P Grant School of Public Health, BRAC University",
    period: "Jun 2023 - Jun 2024",
    summary: "Gathered and synthesized research to support public health arguments and claims.",
    points: ["Applied research methods using credible sources.", "Ran literature reviews and presented complex ideas clearly."],
  },
  {
    title: "IT Officer",
    org: "Studybooth, Dhaka",
    period: "Jul 2021 - Oct 2023",
    summary: "Managed and implemented major IT improvement programs.",
    points: [
      "Analyzed customer network requirements and delivered targeted solutions.",
      "Developed educational content for students across subjects.",
    ],
  },
  {
    title: "Volunteer",
    org: "Jiban-Tori Foundation",
    period: "May 2020 - Jun 2024",
    summary: "Organized a Chess for Charity tournament and a Winter Warmth donation drive, 20 hours a week.",
    points: ["Managed community events and facility setup.", "Trained in volunteer roles and organizational goals."],
  },
];

export function Experience() {
  return (
    <section className="section" id="experience">
      <div className="container">
        <SectionHead piece="R" move="4. O-O" title="Experience" lede="Work, research and community roles, most recent first." />
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
