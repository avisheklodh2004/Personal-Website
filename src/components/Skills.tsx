import { motion } from "motion/react";
import { Badge } from "./ui/badge";
import { SpaceBackground } from "./SpaceBackground";

export function Skills() {
  const skillCategories = [
    {
      category: "Programming",
      skills: [
        { name: "JavaScript/TypeScript", level: 90 },
        { name: "Python", level: 85 },
        { name: "Java", level: 85 },
        { name: "HTML/CSS", level: 90 },
      ],
    },
    {
      category: "Frameworks & Tools",
      skills: [
        { name: "React", level: 90 },
        { name: "Angular", level: 85 },
        { name: "Firebase", level: 85 },
        { name: "Three.js", level: 75 },
      ],
    },
    {
      category: "Design & Productivity",
      skills: [
        { name: "Figma", level: 85 },
        { name: "Microsoft Office", level: 90 },
        { name: "Canva", level: 80 },
        { name: "Google Workspace", level: 90 },
      ],
    },
  ];

  const technologies = [
    "React", "Angular", "TypeScript", "JavaScript", "Python", "Java",
    "HTML", "CSS", "Firebase", "Three.js", "Figma", "Google Cloud Vision",
    "Fish Audio", "BLIP", "PWA", "NFC", "QR Code", "Git", "Canva"
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 relative overflow-hidden" id="skills">
      <SpaceBackground />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-center mb-12">Skills & Technologies</h2>

          {/* Skill Bars */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {skillCategories.map((category, catIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                className="space-y-4"
              >
                <h3 className="mb-4">{category.category}</h3>
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">{skill.name}</span>
                      <span className="text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden border border-primary/20">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: catIndex * 0.1 + skillIndex * 0.1 }}
                        className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
                        style={{
                          boxShadow: '0 0 10px rgba(168, 85, 247, 0.5)',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </motion.div>
            ))}
          </div>

          {/* Technology Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            {technologies.map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.1 }}
              >
                <Badge variant="secondary" className="px-4 py-2 cursor-default">
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
