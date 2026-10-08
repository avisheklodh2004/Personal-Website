export interface TourPiece {
  id: string;
  piece: string;
  square: string;
}

/**
 * White to move, and four different pieces each have a mate in one
 * (FEN 7k/7p/4RpQ1/6N1/8/2B5/8/1K6 w). Every mate opens a part of the site.
 */
const PUZZLE: [string, string][] = [
  ["k", "h8"],
  ["p", "h7"],
  ["p", "f6"],
  ["R", "e6"],
  ["Q", "g6"],
  ["N", "g5"],
  ["B", "c3"],
  ["K", "b1"],
];

export const START: TourPiece[] = PUZZLE.map(([piece, square]) => ({ id: `${piece}${square}`, piece, square }));

/** The square of the black king, which every tour move mates. */
export const MATED_KING = "h8";

export interface TourStop {
  san: string;
  from: string;
  to: string;
  piece: string;
  pattern: string;
  id: string;
  label: string;
  blurb: string;
}

export const TOUR: TourStop[] = [
  {
    san: "Nf7#",
    from: "g5",
    to: "f7",
    piece: "N",
    pattern: "Knight mate",
    id: "projects",
    label: "Projects",
    blurb: "The knight jumps where nothing can touch it. So do these builds: FitStack, OutDrobe and ScanTaps.",
  },
  {
    san: "Bxf6#",
    from: "c3",
    to: "f6",
    piece: "B",
    pattern: "Long-diagonal mate",
    id: "skills",
    label: "Skills",
    blurb: "One diagonal across the whole board, like the stack: patch management to Python and computer vision.",
  },
  {
    san: "Re8#",
    from: "e6",
    to: "e8",
    piece: "R",
    pattern: "Back-rank mate",
    id: "experience",
    label: "Experience",
    blurb: "Holding the back rank: IT work at the Fulton Schools, plus leadership and ambassador roles at ASU.",
  },
  {
    san: "Qxh7#",
    from: "g6",
    to: "h7",
    piece: "Q",
    pattern: "Kiss of death",
    id: "contact",
    label: "Contact",
    blurb: "The queen goes right up to the king, backed by the knight. Open to internships and collaborations.",
  },
];

/** Piece positions after the mate for `stop` is played, or the puzzle when `stop` is -1. Ids stay stable so pieces animate. */
export function positionAfter(stop: number): TourPiece[] {
  if (stop < 0) return START;
  const { from, to } = TOUR[stop];
  return START.filter((p) => p.square !== to).map((p) => (p.square === from ? { ...p, square: to } : p));
}
