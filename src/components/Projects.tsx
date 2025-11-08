import { motion } from "motion/react";
import { Github } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { SpaceBackground } from "./SpaceBackground";
import fitstackImage from "asset:fitstack.png";
import outdrobeImage from "asset:outdrobe.png";
import scantapsImage from "asset:scantaps.png";

export function Projects() {
  const projects = [
    {
      title: "FitStack | Real-Time Gym Insights Platform",
      description: "Built a real-time gym occupancy tracker that displays live crowd levels using camera-based motion detection while not storing personal data. Designed a dynamic frontend with Angular and implemented live data analytics to suggest optimal workout times.",
      image: fitstackImage,
      tags: ["Angular", "Motion Detection", "Real-Time Analytics", "Privacy-Focused"],
      github: "https://github.com/avisheklodh2004",
    },
    {
      title: "OutDrobe | AI-Powered Personal Stylist",
      description: "Developed an intelligent, voice-integrated AI stylist that scans users' wardrobes, generates personalized outfits, and suggests affordable matching items. Integrated speech recognition (Fish Audio) and vision tagging (Google Cloud Vision + BLIP) with a sleek Three.js dashboard.",
      image: outdrobeImage,
      tags: ["TypeScript", "Three.js", "Google Cloud Vision", "Fish Audio", "BLIP"],
      github: "https://github.com/avisheklodh2004",
    },
    {
      title: "ScanTaps | ASU Lost & Found System",
      description: "Led design as design lead and developed a hybrid NFC + QR-based lost-and-found system to modernize ASU's item recovery process. Built a Progressive Web App (PWA) with secure ASU SSO authentication, encrypted chat, and Firebase backend supporting 1,000+ tags.",
      image: scantapsImage,
      tags: ["React", "Firebase", "NFC", "QR Code", "PWA", "ASU SSO"],
      github: "https://github.com/avisheklodh2004",
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 relative overflow-hidden" id="projects">
      <SpaceBackground />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-center mb-8 sm:mb-10 md:mb-12">Featured Projects</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileHover={{ y: -8 }}
                className={index === 2 ? "md:col-span-2 md:max-w-lg md:mx-auto" : ""}
              >
                <Card className="overflow-hidden h-full flex flex-col group border-2 border-primary/30 bg-card shadow-lg hover:shadow-2xl hover:shadow-primary/30 transition-all duration-500">
                  <div className="relative overflow-hidden aspect-video">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="mb-2">{project.title}</h3>
                    <p className="text-muted-foreground mb-4 flex-1">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Button
                      size="sm"
                      className="w-full group relative overflow-hidden bg-gradient-to-br from-primary via-primary to-purple-600 hover:from-purple-600 hover:via-primary hover:to-primary transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-primary/50 active:scale-95 border-0"
                      style={{
                        transform: 'perspective(1000px) translateZ(0)',
                      }}
                      asChild
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '100%' }}
                          transition={{ duration: 0.6 }}
                        />
                        <Github className="h-4 w-4 mr-2 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                        <span className="relative z-10">View Code</span>
                      </a>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
