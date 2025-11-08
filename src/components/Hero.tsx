import { motion } from "motion/react";
import { Github, Linkedin, Mail, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { ChessBoard3D } from "./ChessBoard3D";
import { SpaceBackground } from "./SpaceBackground";

export function Hero() {
  const [firstLine, setFirstLine] = useState("");
  const [secondLine, setSecondLine] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  const firstText = "Hi, I'm Avishek!";
  const secondText = "I Write Code That (Usually) Works.";

  useEffect(() => {
    let firstIndex = 0;
    let secondIndex = 0;

    // Type first line
    const firstInterval = setInterval(() => {
      if (firstIndex <= firstText.length) {
        setFirstLine(firstText.slice(0, firstIndex));
        firstIndex++;
      } else {
        clearInterval(firstInterval);
        // Start typing second line after a short pause
        setTimeout(() => {
          const secondInterval = setInterval(() => {
            if (secondIndex <= secondText.length) {
              setSecondLine(secondText.slice(0, secondIndex));
              secondIndex++;
            } else {
              clearInterval(secondInterval);
              setShowCursor(false);
            }
          }, 80);
        }, 300);
      }
    }, 80);

    return () => clearInterval(firstInterval);
  }, []);

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden pt-16 md:pt-20">
      <SpaceBackground />
      
      <div className="w-full flex items-center z-10 px-4 md:px-8 lg:px-12 xl:px-16 py-8 md:py-12">
        <div className="w-full flex items-center max-w-[1920px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-12 xl:gap-20 w-full items-center">
            {/* Left side - Text content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 relative flex flex-col justify-center"
            >
              {/* Animated glowing orbs behind text */}
              <motion.div
                className="absolute -left-20 -top-10 w-96 h-96 rounded-full blur-3xl opacity-40"
                style={{
                  background: 'radial-gradient(circle, rgba(168,85,247,0.6) 0%, rgba(168,85,247,0) 70%)',
                }}
                animate={{
                  x: [0, 30, 0],
                  y: [0, -20, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -right-10 top-20 w-80 h-80 rounded-full blur-3xl opacity-30"
                style={{
                  background: 'radial-gradient(circle, rgba(139,92,246,0.5) 0%, rgba(139,92,246,0) 70%)',
                }}
                animate={{
                  x: [0, -40, 0],
                  y: [0, 30, 0],
                  scale: [1, 1.15, 1],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />
              <motion.div
                className="absolute left-40 top-40 w-64 h-64 rounded-full blur-3xl opacity-25"
                style={{
                  background: 'radial-gradient(circle, rgba(192,132,252,0.4) 0%, rgba(192,132,252,0) 70%)',
                }}
                animate={{
                  x: [0, 20, 0],
                  y: [0, -30, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                }}
              />
              
              {/* First line with typing animation */}
              <div className="min-h-[80px] sm:min-h-[100px] md:min-h-[140px] lg:min-h-[160px] relative z-10">
                <h1 
                  className="text-4xl sm:text-5xl md:text-8xl lg:text-9xl glow-text tracking-tight leading-tight break-words"
                  style={{ color: '#a855f7' }}
                >
                  {firstLine}
                  {showCursor && firstLine.length < firstText.length && (
                    <span className="inline-block w-0.5 h-10 sm:h-12 md:h-20 lg:h-24 bg-primary ml-1 animate-pulse" />
                  )}
                </h1>
              </div>

              {/* Pronunciation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.6 }}
                className="text-muted-foreground font-mono text-sm sm:text-base md:text-lg lg:text-xl -mt-2 sm:-mt-4 relative z-10"
              >
                A·vi·shek /ˈɑː-vɪ-ʃɛk/
              </motion.div>

              {/* Second line with typing animation */}
              <div className="min-h-[40px] sm:min-h-[50px] md:min-h-[70px] relative z-10">
                <p className="text-lg sm:text-xl md:text-3xl lg:text-4xl text-muted-foreground break-words">
                  {secondLine}
                  {showCursor && firstLine.length >= firstText.length && secondLine.length < secondText.length && (
                    <span className="inline-block w-0.5 h-5 sm:h-6 md:h-9 lg:h-10 bg-primary ml-1 animate-pulse" />
                  )}
                </p>
              </div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.5, duration: 0.8 }}
                className="flex items-center gap-3 sm:gap-4 pt-6 sm:pt-8 relative z-10"
              >
                <motion.div whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <Button 
                    size="icon" 
                    className="rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border-2 border-primary/40 hover:border-primary shadow-lg hover:shadow-2xl hover:shadow-primary/50 backdrop-blur-sm transition-all duration-300 active:shadow-primary/70 w-11 h-11 sm:w-12 sm:h-12"
                    style={{
                      transform: 'perspective(1000px) translateZ(0)',
                      background: 'linear-gradient(145deg, rgba(168,85,247,0.2), rgba(168,85,247,0.05))',
                    }}
                    asChild
                  >
                    <a href="https://github.com/avisheklodh2004" target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </a>
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.1, rotate: -5 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <Button 
                    size="icon" 
                    className="rounded-full bg-gradient-to-br from-blue-500/20 via-blue-500/10 to-transparent border-2 border-blue-400/40 hover:border-blue-400 shadow-lg hover:shadow-2xl hover:shadow-blue-500/50 backdrop-blur-sm transition-all duration-300 active:shadow-blue-500/70 w-11 h-11 sm:w-12 sm:h-12"
                    style={{
                      transform: 'perspective(1000px) translateZ(0)',
                      background: 'linear-gradient(145deg, rgba(59,130,246,0.2), rgba(59,130,246,0.05))',
                    }}
                    asChild
                  >
                    <a href="https://www.linkedin.com/in/avisheklodh/" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
                    </a>
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <Button 
                    size="icon" 
                    className="rounded-full bg-gradient-to-br from-purple-500/20 via-purple-500/10 to-transparent border-2 border-purple-400/40 hover:border-purple-400 shadow-lg hover:shadow-2xl hover:shadow-purple-500/50 backdrop-blur-sm transition-all duration-300 active:shadow-purple-500/70 w-11 h-11 sm:w-12 sm:h-12"
                    style={{
                      transform: 'perspective(1000px) translateZ(0)',
                      background: 'linear-gradient(145deg, rgba(168,85,247,0.2), rgba(168,85,247,0.05))',
                    }}
                    asChild
                  >
                    <a href="mailto:alodh2@asu.edu">
                      <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400" />
                    </a>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right side - Chess board */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="flex justify-center items-center lg:justify-end mt-8 lg:mt-0"
            >
              <div className="w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] xl:max-w-[700px]">
                <ChessBoard3D />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="h-6 w-6 animate-bounce text-primary" />
      </motion.div>
    </section>
  );
}
