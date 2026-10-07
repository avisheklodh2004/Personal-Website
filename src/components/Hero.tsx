import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { BoardPanel } from "./chess/BoardPanel";

export function Hero() {
  const reduce = useReducedMotion();

  // The copy fades in with CSS (see .hero__copy) so it shows before the script loads.
  return (
    <section className="hero" id="top">
      <div className="hero__inner">
        <div className="hero__copy">
          <p className="hero__name">
            Avishek Lodh <span>/ˈɑː-vɪ-ʃɛk/</span>
          </p>
          <h1>I write code that (usually) works.</h1>
          <p className="hero__sub">
            Computer Science student at Arizona State working in IT and security, and building full-stack apps on the
            side. Every piece on the board opens a part of my work.
          </p>
          <div className="hero__ctas">
            <a className="btn btn--primary" href="#projects">
              View projects <ArrowRight size={15} strokeWidth={1.75} />
            </a>
            <a className="btn btn--secondary" href="#contact">
              Get in touch
            </a>
          </div>
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
