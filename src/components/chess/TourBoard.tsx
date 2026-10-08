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
