import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, RotateCcw } from "lucide-react";
import { Glyph } from "./Board";
import { TourBoard } from "./TourBoard";
import { ChessGame, type GameStatus } from "./ChessGame";
import { TOUR } from "./tour";

type Mode = "tour" | "play";

/** Hero widget: the board, a Tour/Play switch, and the move list that doubles as site navigation. */
export function BoardPanel() {
  const [mode, setMode] = useState<Mode>("tour");
  const [stop, setStop] = useState(-1);
  const [game, setGame] = useState<GameStatus>({ text: "Your move", thinking: false });
  const [resetKey, setResetKey] = useState(0);

  const choose = (i: number) => setStop(i);

  const onStatus = useCallback((s: GameStatus) => setGame(s), []);
  const current = stop >= 0 ? TOUR[stop] : null;

  return (
    <div className="panel">
      <div className="panel__bar">
        <div className="seg" role="tablist" aria-label="Board mode">
          <button role="tab" aria-selected={mode === "tour"} className="seg__btn" onClick={() => setMode("tour")}>
            Tour
          </button>
          <button
            role="tab"
            aria-selected={mode === "play"}
            className="seg__btn"
            onClick={() => setMode("play")}
          >
            Play the engine
          </button>
        </div>
        {mode === "tour" ? (
          <button
            className="icon-btn"
            onClick={() => choose(-1)}
            aria-label="Reset the board"
            disabled={stop < 0}
          >
            <RotateCcw size={15} strokeWidth={1.75} />
          </button>
        ) : (
          <button className="icon-btn" onClick={() => setResetKey((k) => k + 1)} aria-label="Start a new game">
            <RotateCcw size={15} strokeWidth={1.75} />
          </button>
        )}
      </div>

      <div className="panel__body">
        <div className="panel__board">
          {mode === "tour" ? (
            <TourBoard stop={stop} onPlay={choose} />
          ) : (
            <ChessGame onStatus={onStatus} resetKey={resetKey} />
          )}
        </div>

        <div className="panel__side">
          {mode === "tour" ? (
            <>
              <ol className="moves" aria-label="Checkmates">
                {TOUR.map((t, i) => {
                  const active = i === stop;
                  return (
                    <li key={t.id}>
                      <button
                        className={`move ${active ? "is-active" : ""}`}
                        onClick={() => choose(active ? -1 : i)}
                        aria-current={active ? "step" : undefined}
                      >
                        <span className="move__num">{i + 1}.</span>
                        <span className="move__san">{t.san}</span>
                        <span className="move__glyph-wrap" style={t.color ? { color: t.color } : undefined}>
                          <Glyph piece={t.piece} className="move__glyph" />
                        </span>
                        <span className="move__label">{t.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ol>
              <div className="moves__detail" aria-live="polite">
                <AnimatePresence mode="wait" initial={false}>
                  {current ? (
                    <motion.div
                      key={current.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p>
                        <strong className="moves__pattern">{current.pattern}.</strong> {current.blurb}
                      </p>
                      <a className="link" href={`#${current.id}`}>
                        Go to {current.label} <ArrowRight size={14} strokeWidth={1.75} />
                      </a>
                    </motion.div>
                  ) : (
                    <motion.p key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      White to move. Four pieces, four different checkmates. Tap a glowing piece to see what each one stands for.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <div className="game-side">
              <p className={`game-side__status ${game.thinking ? "is-thinking" : ""}`} aria-live="polite">
                {game.text}
              </p>
              <p className="game-side__hint">
                You play white against a small search engine written for this site. Pick a piece, then a highlighted square.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
