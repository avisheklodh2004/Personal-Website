import { motion } from "motion/react";
import { Briefcase, GraduationCap } from "lucide-react";
import { Badge } from "./ui/badge";
import { SpaceBackground } from "./SpaceBackground";

export function Experience() {
  const timeline = [
    {
      type: "work",
      title: "Campus Experience Ambassador",
      organization: "Access ASU",
      period: "August 2025 - Current",
      achievements: [
        "Communicated university resources and admissions processes professionally",
        "Assisted in event coordination and check-in for prospective student visits",
      ],
    },
    {
      type: "work",
      title: "Student Worker V – Barrett Summer Scholars Ambassador",
      organization: "ASU EOSS Campus Experience Students – Access ASU",
      period: "May 2025 - June 2025",
      description: "Facilitated academic and enrichment activities for high-achieving K-12 students in the Barrett Summer Scholars program",
      achievements: [
        "Supervised students in residential, academic, and recreational settings",
        "Collaborated with diverse team to deliver seamless camp experience",
      ],
    },
    {
      type: "work",
      title: "Research Intern",
      organization: "BRAC James P Grant School of Public Health, BRAC University",
      period: "June 2023 - June 2024",
      description: "Conducted research, gathered data, and synthesized information to support arguments and claims",
      achievements: [
        "Applied research methodologies using credible sources",
        "Conducted literature reviews and presented complex ideas clearly",
      ],
    },
    {
      type: "work",
      title: "IT Officer",
      organization: "Studybooth - Learn Together, Dhaka, Bangladesh",
      period: "July 2021 - October 2023",
      description: "Managed and implemented major IT improvement programs for enhanced technical capabilities",
      achievements: [
        "Analyzed customer network requirements and provided targeted solutions",
        "Developed educational content targeting students in various subjects",
      ],
    },
    {
      type: "work",
      title: "Volunteer - Jiban-Tori Foundation",
      organization: "Community Service (20 hours/week)",
      period: "May 2020 - June 2024",
      description: "Organized Chess for Charity tournament and Winter Warmth donation drive to help underprivileged communities",
      achievements: [
        "Managed community events and facility setup",
        "Completed training in volunteer roles and organizational goals",
      ],
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 relative overflow-hidden" id="experience">
      <SpaceBackground />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Briefcase className="h-8 w-8 text-primary" />
            <h2 className="text-primary">Experience</h2>
          </div>
          <p className="text-muted-foreground mb-12">
            My journey through education, work, and achievements
          </p>

          <div className="max-w-6xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/30 hidden md:block" />

              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`relative grid md:grid-cols-2 gap-8 items-center ${
                      index % 2 === 0 ? "" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Left side for even items, empty for odd */}
                    <div className={index % 2 === 0 ? "md:text-right" : "md:order-2"}>
                      <div className={`inline-block ${index % 2 === 0 ? "md:float-right" : ""}`}>
                        <div className="bg-card border-2 border-primary/50 rounded-lg p-6 glow-hover max-w-lg">
                          <Badge className="mb-3 bg-primary/20 text-primary border-primary/50">
                            {item.period}
                          </Badge>
                          <h3 className="text-primary mb-2">{item.title}</h3>
                          <p className="mb-3 text-muted-foreground">
                            {item.organization}
                          </p>
                          {item.description && (
                            <p className="text-foreground/70 mb-4">
                              {item.description}
                            </p>
                          )}
                          <ul className="space-y-2">
                            {item.achievements.map((achievement, i) => (
                              <li key={i} className="text-primary/80">
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Center icon */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-background border-4 border-primary z-10"
                      style={{
                        boxShadow: '0 0 20px rgba(168, 85, 247, 0.6), 0 0 40px rgba(168, 85, 247, 0.4)',
                      }}
                    >
                      {item.type === "work" ? (
                        <Briefcase className="h-7 w-7 text-primary" />
                      ) : (
                        <GraduationCap className="h-7 w-7 text-primary" />
                      )}
                    </div>

                    {/* Right side for odd items, empty for even */}
                    <div className={index % 2 === 0 ? "md:order-2" : ""}>
                      {/* Empty space for alignment */}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
