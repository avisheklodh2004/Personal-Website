import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { BoardPanel } from "./chess/BoardPanel";

export function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section className="hero" id="top">
      <div className="hero__inner">
        <div className="hero__copy">
          <motion.p className="hero__name" {...rise(0)}>
            Avishek Lodh <span>/ˈɑː-vɪ-ʃɛk/</span>
          </motion.p>
          <motion.h1 {...rise(0.06)}>I write code that (usually) works.</motion.h1>
          <motion.p className="hero__sub" {...rise(0.12)}>
            Computer Science student at Arizona State working in IT and security, and building full-stack apps on the
            side. Every piece on the board opens a part of my work.
          </motion.p>
          <motion.div className="hero__ctas" {...rise(0.18)}>
            <a className="btn btn--primary" href="#projects">
              View projects <ArrowRight size={15} strokeWidth={1.75} />
            </a>
            <a className="btn btn--secondary" href="#contact">
              Get in touch
            </a>
          </motion.div>
        </div>

        <motion.div
          className="hero__board"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <BoardPanel />
        </motion.div>
      </div>
    </section>
  );
}
