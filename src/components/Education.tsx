import { motion } from "motion/react";
import { GraduationCap } from "lucide-react";
import { Badge } from "./ui/badge";
import { SpaceBackground } from "./SpaceBackground";

export function Education() {
  const education = [
    {
      degree: "B.S. Computer Science (Software Engineering)",
      institution: "Arizona State University",
      location: "Tempe, AZ",
      period: "Expected May 2028",
      description: "Focused on software engineering principles, full-stack development, and AI integration",
      achievements: [
        "GPA: 4.00/4.00",
        "Dean's List Recipient",
        "Languages: English, Bangla",
      ],
    },
    {
      degree: "Edexcel IAL Award",
      institution: "Sir John Wilson School",
      location: "Dhaka, Bangladesh",
      period: "Graduated May 2024",
      description: "Completed International Advanced Level qualifications with distinction",
      achievements: [
        "Strong foundation in mathematics and sciences",
        "International curriculum perspective",
      ],
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 relative overflow-hidden" id="education">
      <SpaceBackground />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="h-8 w-8 text-primary" />
            <h2 className="text-primary">Education</h2>
          </div>
          <p className="text-muted-foreground mb-12">
            My academic journey and qualifications
          </p>

          <div className="max-w-4xl mx-auto space-y-6">
            {education.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card border-2 border-primary/50 rounded-lg p-6 glow-hover"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
                  <div className="flex-1">
                    <h3 className="text-primary mb-1">{item.degree}</h3>
                    <p className="text-foreground/80 mb-1">
                      {item.institution}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {item.location}
                    </p>
                  </div>
                  <Badge className="bg-primary/20 text-primary border-primary/50 self-start">
                    {item.period}
                  </Badge>
                </div>
                
                <p className="text-foreground/70 mb-4">
                  {item.description}
                </p>
                
                <ul className="space-y-2">
                  {item.achievements.map((achievement, i) => (
                    <li key={i} className="text-primary/80 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
