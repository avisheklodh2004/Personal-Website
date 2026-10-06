import { initialBoard } from "./engine";
import { squareName } from "./Board";

/** One half-move. Castling moves two pieces, so a ply is a list of from/to pairs. */
export interface Ply {
  san: string;
  moves: [string, string][];
}

/** The Italian Game, closed with Qe2. White's five moves each open a part of the site. */
export const PLIES: Ply[] = [
  { san: "e4", moves: [["e2", "e4"]] },
  { san: "e5", moves: [["e7", "e5"]] },
  { san: "Nf3", moves: [["g1", "f3"]] },
  { san: "Nc6", moves: [["b8", "c6"]] },
  { san: "Bc4", moves: [["f1", "c4"]] },
  { san: "Bc5", moves: [["f8", "c5"]] },
  { san: "O-O", moves: [["e1", "g1"], ["h1", "f1"]] },
  { san: "Nf6", moves: [["g8", "f6"]] },
  { san: "Qe2", moves: [["d1", "e2"]] },
];

export interface TourStop {
  /** Index into PLIES of white's move for this stop. */
  ply: number;
  piece: string;
  id: string;
  label: string;
  blurb: string;
}

export const TOUR: TourStop[] = [
  {
    ply: 0,
    piece: "P",
    id: "about",
    label: "About",
    blurb: "Every game starts with one pawn. Mine started in Dhaka and moved to Tempe.",
  },
  {
    ply: 2,
    piece: "N",
    id: "projects",
    label: "Projects",
    blurb: "Three builds that jump in unexpected directions: FitStack, OutDrobe and ScanTaps.",
  },
  {
    ply: 4,
    piece: "B",
    id: "skills",
    label: "Skills",
    blurb: "Long diagonals across the stack, from patch management to Python and computer vision.",
  },
  {
    ply: 6,
    piece: "R",
    id: "experience",
    label: "Experience",
    blurb: "Castled and steady: IT work at the Fulton Schools, plus leadership and ambassador roles at ASU.",
  },
  {
    ply: 8,
    piece: "Q",
    id: "contact",
    label: "Contact",
    blurb: "The most flexible piece on the board. Open to internships and collaborations.",
  },
];

/** Number of plies on the board once a tour stop has been played (white's move plus black's reply). */
export function pliesForStop(stop: number) {
  if (stop < 0) return 0;
  return Math.min(TOUR[stop].ply + 2, PLIES.length);
}

export interface TourPiece {
  id: string;
  piece: string;
  square: string;
}

const START: TourPiece[] = initialBoard.flatMap((row, r) =>
  row.flatMap((piece, c) => (piece ? [{ id: `${piece}${squareName(r, c)}`, piece, square: squareName(r, c) }] : []))
);

/** Piece positions after the first `count` plies. Ids are stable so pieces can animate between squares. */
export function positionAfter(count: number): TourPiece[] {
  const pieces = START.map((p) => ({ ...p }));
  for (const ply of PLIES.slice(0, count)) {
    for (const [from, to] of ply.moves) {
      const moving = pieces.find((p) => p.square === from);
      if (moving) moving.square = to;
    }
  }
  return pieces;
}
