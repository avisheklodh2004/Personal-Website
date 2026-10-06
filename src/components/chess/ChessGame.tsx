import { useEffect, useRef, useState } from "react";
import { BoardFrame, Glyph, PIECE_NAMES, squareName } from "./Board";
import {
  SmartAI,
  applyMove,
  evaluatePosition,
  getAllValidMoves,
  getValidMovesForSquare,
  initialGameState,
  isInCheck,
  isValidMove,
  isWhitePiece,
  type GameState,
} from "./engine";

export type GameStatus = { text: string; thinking: boolean };

/** A full game against the built-in engine. You play white. */
export function ChessGame({ onStatus, resetKey }: { onStatus: (s: GameStatus) => void; resetKey: number }) {
  const [game, setGame] = useState<GameState>(initialGameState);
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [targets, setTargets] = useState<[number, number][]>([]);
  const [turn, setTurn] = useState<"white" | "black">("white");
  const [status, setStatus] = useState("");
  const [thinking, setThinking] = useState(false);
  const engine = useRef(new SmartAI());

  const over = status.startsWith("Checkmate") || status.startsWith("Stalemate");

  useEffect(() => {
    setGame(initialGameState);
    setSelected(null);
    setTargets([]);
    setTurn("white");
    setStatus("");
    setThinking(false);
  }, [resetKey]);

  useEffect(() => {
    onStatus({
      text: status || (thinking ? "Engine is thinking" : turn === "white" ? "Your move" : "Engine to move"),
      thinking,
    });
  }, [status, thinking, turn, onStatus]);

  const makeMove = (state: GameState, from: [number, number], to: [number, number], mover: "white" | "black") => {
    const next = applyMove(state, from, to);
    setGame(next);
    setSelected(null);
    setTargets([]);

    const opponent = mover === "white" ? "black" : "white";
    const replies = getAllValidMoves(next, opponent);
    const opponentInCheck = isInCheck(next.board, opponent === "white");
    if (replies.length === 0) {
      setStatus(opponentInCheck ? `Checkmate. ${mover === "white" ? "You win" : "Engine wins"}` : "Stalemate");
      return;
    }
    setStatus(opponentInCheck ? "Check" : "");
    setTurn(opponent);
  };

  useEffect(() => {
    if (turn !== "black" || over) return;
    let cancelled = false;
    setThinking(true);
    const timer = setTimeout(async () => {
      let count = 0;
      for (const row of game.board) for (const p of row) if (p) count++;
      const depth = count === 32 ? 2 : count <= 12 ? 4 : 3;
      const best = await engine.current.findBestMove(game, depth, evaluatePosition, getAllValidMoves, applyMove, isInCheck);
      if (cancelled) return;
      setThinking(false);
      if (best) makeMove(game, best.from, best.to, "black");
    }, 250);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turn, over]);

  const select = (row: number, col: number) => {
    setSelected([row, col]);
    setTargets(getValidMovesForSquare(game, row, col));
  };

  const handleSquare = (row: number, col: number) => {
    if (turn !== "white" || over || thinking) return;
    const piece = game.board[row][col];
    if (selected && isValidMove(game, selected, [row, col])) {
      makeMove(game, selected, [row, col], "white");
    } else if (piece && isWhitePiece(piece)) {
      select(row, col);
    } else {
      setSelected(null);
      setTargets([]);
    }
  };

  const last = game.lastMove ? [squareName(...game.lastMove.from), squareName(...game.lastMove.to)] : [];

  return (
    <BoardFrame
      highlight={last}
      label="Playable chess board. You are white."
      renderSquare={(row, col) => {
        const piece = game.board[row][col];
        const isSelected = selected?.[0] === row && selected?.[1] === col;
        const isTarget = targets.some(([r, c]) => r === row && c === col);
        return (
          <button
            type="button"
            className={`board__btn ${isSelected ? "is-selected" : ""}`}
            onClick={() => handleSquare(row, col)}
            aria-label={`${squareName(row, col)}${piece ? ` ${isWhitePiece(piece) ? "white" : "black"} ${PIECE_NAMES[piece.toLowerCase()]}` : ""}`}
          >
            {isTarget && <span className={piece ? "board__capture" : "board__dot"} />}
            {piece && <Glyph piece={piece} />}
          </button>
        );
      }}
    />
  );
}
