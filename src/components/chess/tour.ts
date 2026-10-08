export interface TourPiece {
  id: string;
  piece: string;
  square: string;
}

/**
 * White to move (FEN 2R3rk/pp1b2pp/1np1pBQN/q1bp4/2PPNn2/1B2P3/PP1r1PPP/5RK1 w). The c8 rook pins
 * Black's rook to the back rank, so four different pieces each have a mate in one.
 */
const PUZZLE: [string, string][] = [
  ["r", "g8"],
  ["k", "h8"],
  ["p", "a7"],
  ["p", "b7"],
  ["b", "d7"],
  ["p", "g7"],
  ["p", "h7"],
  ["n", "b6"],
  ["p", "c6"],
  ["p", "e6"],
  ["q", "a5"],
  ["b", "c5"],
  ["p", "d5"],
  ["n", "f4"],
  ["r", "d2"],
  ["R", "c8"],
  ["B", "f6"],
  ["Q", "g6"],
  ["N", "h6"],
  ["P", "c4"],
  ["P", "d4"],
  ["N", "e4"],
  ["B", "b3"],
  ["P", "e3"],
  ["P", "a2"],
  ["P", "b2"],
  ["P", "f2"],
  ["P", "g2"],
  ["P", "h2"],
  ["R", "f1"],
  ["K", "g1"],
];

export const START: TourPiece[] = PUZZLE.map(([piece, square]) => ({ id: `${piece}${square}`, piece, square }));

/** The square of the black king, which every tour mate lands on. */
export const MATED_KING = "h8";

export interface TourStop {
  san: string;
  /** Empty for the About stop, which shows the puzzle without playing a move. */
  from: string;
  to: string;
  piece: string;
  pattern: string;
  /** Arrow colour for this mate on the puzzle board. */
  color?: string;
  id: string;
  label: string;
  blurb: string;
}

export const TOUR: TourStop[] = [
  {
    san: "Start",
    from: "",
    to: "",
    piece: "P",
    pattern: "White to move",
    id: "about",
    label: "About",
    blurb: "Every game starts with one pawn. Mine started in Dhaka and moved to Tempe.",
  },
  {
    san: "Nf7#",
    from: "h6",
    to: "f7",
    piece: "N",
    pattern: "Smothered mate",
    color: "#7480e8",
    id: "projects",
    label: "Projects",
    blurb: "The king is boxed in by its own rook and pawns. The builds: FitStack, OutDrobe and ScanTaps.",
  },
  {
    san: "Bxg7#",
    from: "f6",
    to: "g7",
    piece: "B",
    pattern: "Bishop mate",
    color: "#3fb565",
    id: "skills",
    label: "Skills",
    blurb: "The bishop strikes, backed up by the queen. Patch management to Python and computer vision.",
  },
  {
    san: "Rxg8#",
    from: "c8",
    to: "g8",
    piece: "R",
    pattern: "Back-rank mate",
    color: "#e0a03a",
    id: "experience",
    label: "Experience",
    blurb: "The pinned rook falls and the knight covers g8. IT work at the Fulton Schools, plus ASU leadership roles.",
  },
  {
    san: "Qxg7#",
    from: "g6",
    to: "g7",
    piece: "Q",
    pattern: "Queen mate",
    color: "#e5677d",
    id: "contact",
    label: "Contact",
    blurb: "The queen lands next to the king, backed up by the bishop. Open to internships and collaborations.",
  },
];

/** Piece positions after `stop` is played, or the puzzle when `stop` is -1. Ids stay stable so pieces animate. */
export function positionAfter(stop: number): TourPiece[] {
  if (stop < 0 || !TOUR[stop].from) return START;
  const { from, to } = TOUR[stop];
  return START.filter((p) => p.square !== to).map((p) => (p.square === from ? { ...p, square: to } : p));
}
