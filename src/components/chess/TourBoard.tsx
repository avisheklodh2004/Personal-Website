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
  const played = stop >= 0 ? TOUR[stop] : null;
  const transition = reduce ? { duration: 0 } : { type: "spring" as const, stiffness: 260, damping: 30 };

  return (
    <BoardFrame
      highlight={played ? [played.from, played.to] : []}
      mate={played ? MATED_KING : undefined}
      label="Chess puzzle. White has four different checkmates, and each one opens a section of the site."
    >
      <AnimatePresence initial={false}>
        {pieces.map((p) => {
          const [row, col] = squareToRowCol(p.square);
          const style = { x: `${col * 100}%`, y: `${row * 100}%`, opacity: 1 };
          const i = TOUR.findIndex((t) => t.from === p.id.slice(1));
          const exit = { opacity: 0, transition: { duration: reduce ? 0 : 0.2 } };

          if (i >= 0) {
            const t = TOUR[i];
            return (
              <motion.button
                key={p.id}
                type="button"
                className={`piece ${stop < 0 ? "piece--next" : ""}`}
                initial={false}
                animate={style}
                exit={exit}
                transition={transition}
                onClick={() => onPlay(i === stop ? -1 : i)}
                aria-label={
                  i === stop
                    ? `Take back ${t.san}`
                    : `Play ${t.san} with the ${PIECE_NAMES[p.piece.toLowerCase()]} to open ${t.label}`
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
