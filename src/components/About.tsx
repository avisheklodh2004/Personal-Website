import { motion } from "motion/react";
import { Code2, Rocket, Users } from "lucide-react";
import { SpaceBackground } from "./SpaceBackground";

export function About() {
  const highlights = [
    {
      icon: Code2,
      title: "Full-Stack Developer",
      description: "Experienced in React, Angular, TypeScript, and Firebase for building scalable web applications.",
    },
    {
      icon: Rocket,
      title: "Innovation Driven",
      description: "Creator of AI-powered solutions combining vision, speech, and reasoning technologies.",
    },
    {
      icon: Users,
      title: "Community Leader",
      description: "Campus Ambassador at ASU and 4+ years volunteering with Jiban-Tori Foundation.",
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 relative overflow-hidden" id="about">
      <SpaceBackground />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-center mb-12">About Me</h2>
          
          <div className="space-y-6 mb-12">
            <p className="text-muted-foreground text-lg text-center">
              Hey, I'm Avishek Lodh — a Computer Science student at Arizona State University who's endlessly curious about how people and technology connect. I'm drawn to the creative side of tech — the part where design, storytelling, and problem-solving come together to make something that actually feels human.
            </p>
            <p className="text-muted-foreground text-lg text-center">
              Beyond the screen you'll probably find me at a concert, out on a trail, or chasing sunsets with a camera in hand.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card border-2 border-primary/30 rounded-lg p-6 text-center glow-hover"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 border border-primary/50 mb-4">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
