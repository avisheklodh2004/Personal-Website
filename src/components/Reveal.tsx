import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Glyph } from "./chess/Board";

/** Fades content up once as it scrolls into view. Static under reduced motion. */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li";
}) {
  const reduce = useReducedMotion();
  const Tag = as === "li" ? motion.li : motion.div;
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  );
}

/** Section heading led by the piece that opens it on the hero board. */
export function SectionHead({ piece, move, title, lede }: { piece: string; move: string; title: string; lede?: string }) {
  return (
    <Reveal className="section-head">
      <div className="section-head__row">
        <span className="section-head__tile" title={move}>
          <Glyph piece={piece} />
        </span>
        <h2>{title}</h2>
        <span className="section-head__move">{move}</span>
      </div>
      {lede && <p className="lede">{lede}</p>}
    </Reveal>
  );
}
