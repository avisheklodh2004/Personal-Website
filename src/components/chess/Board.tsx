import type { ReactNode } from "react";

export const GLYPHS: Record<string, string> = {
  k: "♚", q: "♛", r: "♜", b: "♝", n: "♞", p: "♟",
};

export const PIECE_NAMES: Record<string, string> = {
  k: "king", q: "queen", r: "rook", b: "bishop", n: "knight", p: "pawn",
};

const FILES = "abcdefgh";

/** Renders one chess glyph. Uppercase = white, lowercase = black. */
export function Glyph({ piece, className = "" }: { piece: string; className?: string }) {
  const white = piece === piece.toUpperCase();
  return (
    <span aria-hidden="true" className={`glyph ${white ? "glyph--white" : "glyph--black"} ${className}`}>
      {GLYPHS[piece.toLowerCase()]}
      {"︎"}
    </span>
  );
}

export function squareName(row: number, col: number) {
  return `${FILES[col]}${8 - row}`;
}

export function squareToRowCol(sq: string): [number, number] {
  return [8 - Number(sq[1]), FILES.indexOf(sq[0])];
}

/**
 * The shared board surface: 64 squares, edge coordinates, and an overlay layer
 * for anything positioned on top (sliding pieces, move targets).
 */
export function BoardFrame({
  highlight = [],
  renderSquare,
  children,
  label,
}: {
  highlight?: string[];
  renderSquare?: (row: number, col: number) => ReactNode;
  children?: ReactNode;
  label: string;
}) {
  return (
    <div className="board" role="group" aria-label={label}>
      <div className="board__grid">
        {Array.from({ length: 64 }, (_, i) => {
          const row = Math.floor(i / 8);
          const col = i % 8;
          const name = squareName(row, col);
          const light = (row + col) % 2 === 0;
          return (
            <div
              key={name}
              className={`board__sq ${light ? "board__sq--light" : "board__sq--dark"} ${
                highlight.includes(name) ? "board__sq--last" : ""
              }`}
            >
              {col === 0 && <span className="board__coord board__coord--rank">{8 - row}</span>}
              {row === 7 && <span className="board__coord board__coord--file">{FILES[col]}</span>}
              {renderSquare?.(row, col)}
            </div>
          );
        })}
      </div>
      {children && <div className="board__layer">{children}</div>}
    </div>
  );
}
