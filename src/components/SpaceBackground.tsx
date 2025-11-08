import { motion } from "motion/react";

const isBrowser = typeof window !== 'undefined';
const screenWidth = isBrowser ? window.innerWidth : 1000;
const screenHeight = isBrowser ? window.innerHeight : 1000;

export function SpaceBackground() {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(100)].map((_, i) => {
          const isLarge = Math.random() > 0.7;
          const isPurple = Math.random() > 0.8;
          const initialX = Math.random() * screenWidth;
          const initialY = Math.random() * screenHeight;
          const targetY = Math.random() * screenHeight;

          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: isLarge ? '2px' : '1px',
                height: isLarge ? '2px' : '1px',
                backgroundColor: isPurple ? '#a855f7' : '#ffffff',
              }}
              initial={{ x: initialX, y: initialY }}
              animate={{
                y: [null, targetY],
                opacity: [0.1, 0.6, 0.1],
              }}
              transition={{
                duration: Math.random() * 15 + 20,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          );
        })}
      </div>
    </>
  );
}
