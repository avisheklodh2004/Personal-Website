import { motion, useReducedMotion } from "motion/react";
import { BoardFrame, Glyph, PIECE_NAMES, squareToRowCol } from "./Board";
import { PLIES, TOUR, positionAfter } from "./tour";

/**
 * The tour position. Pieces slide between squares as `ply` changes; the piece
 * that plays the next tour move is a button.
 */
export function TourBoard({ ply, nextStop, onPlay }: { ply: number; nextStop: number; onPlay: () => void }) {
  const reduce = useReducedMotion();
  const pieces = positionAfter(ply);
  const last = ply > 0 ? PLIES[ply - 1].moves.flat() : [];
  const next = nextStop < TOUR.length ? PLIES[TOUR[nextStop].ply].moves[0][0] : null;

  return (
    <BoardFrame highlight={last} label="Chess board. Each white move opens a section of the site.">
      {pieces.map((p) => {
        const [row, col] = squareToRowCol(p.square);
        const isNext = p.square === next;
        const style = { x: `${col * 100}%`, y: `${row * 100}%` };
        const transition = reduce ? { duration: 0 } : { type: "spring" as const, stiffness: 260, damping: 30 };

        if (isNext) {
          const stop = TOUR[nextStop];
          return (
            <motion.button
              key={p.id}
              type="button"
              className="piece piece--next"
              initial={false}
              animate={style}
              transition={transition}
              onClick={onPlay}
              aria-label={`Play ${PLIES[stop.ply].san} with the ${PIECE_NAMES[p.piece.toLowerCase()]} to open ${stop.label}`}
            >
              <Glyph piece={p.piece} />
            </motion.button>
          );
        }
        return (
          <motion.div key={p.id} className="piece" initial={false} animate={style} transition={transition}>
            <Glyph piece={p.piece} />
          </motion.div>
        );
      })}
    </BoardFrame>
  );
}
