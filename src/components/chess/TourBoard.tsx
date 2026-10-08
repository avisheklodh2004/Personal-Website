import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BoardFrame, Glyph, PIECE_NAMES, squareToRowCol } from "./Board";
import { MATED_KING, TOUR, positionAfter } from "./tour";

/**
 * The tour puzzle. White has four mates in one; the pieces that give them are
 * buttons, and pieces slide between squares as `stop` changes.
 */
export function TourBoard({ stop, onPlay }: { stop: number; onPlay: (stop: number) => void }) {
  const reduce = useReducedMotion();
  const pieces = positionAfter(stop);
  const played = stop >= 0 && TOUR[stop].from ? TOUR[stop] : null;
  const [hover, setHover] = useState(-1);
  const preview = !played && hover >= 0 ? TOUR[hover] : null;
  const transition = reduce ? { duration: 0 } : { type: "spring" as const, stiffness: 260, damping: 30 };

  return (
    <BoardFrame
      highlight={played ? [played.from, played.to] : preview ? [preview.to] : []}
      mate={played ? MATED_KING : undefined}
      label="Chess puzzle. White has four different checkmates, and each one opens a section of the site."
    >
      {!played && <MateArrows active={hover} />}
      <AnimatePresence initial={false}>
        {pieces.map((p) => {
          const [row, col] = squareToRowCol(p.square);
          const style = { x: `${col * 100}%`, y: `${row * 100}%`, opacity: 1 };
          const i = TOUR.findIndex((t) => t.from && t.from === p.id.slice(1));
          const exit = { opacity: 0, transition: { duration: reduce ? 0 : 0.2 } };

          if (i >= 0) {
            const t = TOUR[i];
            return (
              <motion.button
                key={p.id}
                type="button"
                className={`piece ${played ? "" : "piece--next"}`}
                initial={false}
                animate={style}
                exit={exit}
                transition={transition}
                onClick={() => {
                  setHover(-1);
                  onPlay(i === stop ? -1 : i);
                }}
                onPointerEnter={() => setHover(i)}
                onPointerLeave={() => setHover(-1)}
                onFocus={() => setHover(i)}
                onBlur={() => setHover(-1)}
                aria-label={
                  i === stop
                    ? `Take back ${t.san}`
                    : `${PIECE_NAMES[p.piece.toLowerCase()].replace(/^./, (c) => c.toUpperCase())} to ${t.to}, checkmate, opens ${t.label}`
                }
              >
                <Glyph piece={p.piece} />
              </motion.button>
            );
          }
          return (
            <motion.div key={p.id} className="piece" initial={false} animate={style} exit={exit} transition={transition}>
              <Glyph piece={p.piece} />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </BoardFrame>
  );
}

/** Center of a square in board units (0-8), for the arrow layer. */
function center(sq: string): [number, number] {
  const [row, col] = squareToRowCol(sq);
  return [col + 0.5, row + 0.5];
}

/** All four mating moves drawn at once; the hovered one stays bright and the rest fade. */
function MateArrows({ active }: { active: number }) {
  return (
    <svg className="mate-arrows" viewBox="0 0 8 8" aria-hidden="true">
      <defs>
        {TOUR.map((t) =>
          t.color ? (
            <marker key={t.id} id={`head-${t.id}`} viewBox="0 0 4 4" refX="2" refY="2" markerWidth="3" markerHeight="3" orient="auto">
              <path d="M0,0 L4,2 L0,4 z" fill={t.color} />
            </marker>
          ) : null
        )}
      </defs>
      {TOUR.map((t, i) => {
        if (!t.from) return null;
        const [x1, y1] = center(t.from);
        const [x2, y2] = center(t.to);
        const knight = Math.abs(x2 - x1) + Math.abs(y2 - y1) === 3 && x1 !== x2 && y1 !== y2;
        // Knight arrows bend: short leg first, like an L.
        const [cx, cy] = knight ? (Math.abs(y2 - y1) < Math.abs(x2 - x1) ? [x1, y2] : [x2, y1]) : [x1, y1];
        // Stop short of the target's center so arrowheads that share a square don't overlap.
        const len = Math.hypot(x2 - cx, y2 - cy);
        const k = (len - 0.42) / len;
        const ex = cx + (x2 - cx) * k;
        const ey = cy + (y2 - cy) * k;
        return (
          <path
            key={t.id}
            d={knight ? `M${x1},${y1} L${cx},${cy} L${ex},${ey}` : `M${x1},${y1} L${ex},${ey}`}
            fill="none"
            stroke={t.color}
            strokeWidth={0.13}
            strokeLinecap="round"
            strokeLinejoin="round"
            markerEnd={`url(#head-${t.id})`}
            className={`mate-arrow ${active >= 0 && active !== i ? "is-dim" : ""}`}
          />
        );
      })}
    </svg>
  );
}
