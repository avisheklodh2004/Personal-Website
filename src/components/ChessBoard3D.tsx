import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { RotateCcw } from "lucide-react";
import { Button } from "./ui/button";

type PieceType = "p" | "r" | "n" | "b" | "q" | "k" | "P" | "R" | "N" | "B" | "Q" | "K" | null;
type Board = PieceType[][];

const initialBoard: Board = [
  ["r", "n", "b", "q", "k", "b", "n", "r"],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  ["R", "N", "B", "Q", "K", "B", "N", "R"],
];

const pieceSymbols: Record<string, string> = {
  p: "♟", r: "♜", n: "♞", b: "♝", q: "♛", k: "♚",
  P: "♙", R: "♖", N: "♘", B: "♗", Q: "♕", K: "♔",
};

const pieceValues: Record<string, number> = {
  p: 100, n: 320, b: 330, r: 500, q: 900, k: 20000,
  P: 100, N: 320, B: 330, R: 500, Q: 900, K: 20000,
};

// Enhanced piece-square tables (from SmartAI)
const pieceTables = {
  p: [
    0, 5, 5, -10, -10, 5, 5, 0,
    5, 10, 10, 0, 0, 10, 10, 5,
    0, 0, 0, 20, 20, 0, 0, 0,
    5, 5, 10, 25, 25, 10, 5, 5,
    10, 10, 20, 30, 30, 20, 10, 10,
    50, 50, 50, 50, 50, 50, 50, 50,
    70, 70, 70, 70, 70, 70, 70, 70,
    0, 0, 0, 0, 0, 0, 0, 0
  ],
  n: [
    -50, -40, -30, -30, -30, -30, -40, -50,
    -40, -20, 0, 5, 5, 0, -20, -40,
    -30, 5, 10, 15, 15, 10, 5, -30,
    -30, 0, 15, 20, 20, 15, 0, -30,
    -30, 5, 15, 20, 20, 15, 5, -30,
    -30, 0, 10, 15, 15, 10, 0, -30,
    -40, -20, 0, 0, 0, 0, -20, -40,
    -50, -40, -30, -30, -30, -30, -40, -50
  ],
  b: [
    -20, -10, -10, -10, -10, -10, -10, -20,
    -10, 5, 0, 0, 0, 0, 5, -10,
    -10, 10, 10, 10, 10, 10, 10, -10,
    -10, 0, 10, 10, 10, 10, 0, -10,
    -10, 5, 5, 10, 10, 5, 5, -10,
    -10, 0, 5, 10, 10, 5, 0, -10,
    -10, 0, 0, 0, 0, 0, 0, -10,
    -20, -10, -10, -10, -10, -10, -10, -20
  ],
  r: [
    0, 0, 5, 10, 10, 5, 0, 0,
    -5, 0, 0, 0, 0, 0, 0, -5,
    -5, 0, 0, 0, 0, 0, 0, -5,
    -5, 0, 0, 0, 0, 0, 0, -5,
    -5, 0, 0, 0, 0, 0, 0, -5,
    -5, 0, 0, 0, 0, 0, 0, -5,
    5, 10, 10, 10, 10, 10, 10, 5,
    0, 0, 0, 0, 0, 0, 0, 0
  ],
  q: [
    -20, -10, -10, -5, -5, -10, -10, -20,
    -10, 0, 0, 0, 0, 0, 0, -10,
    -10, 0, 5, 5, 5, 5, 0, -10,
    -5, 0, 5, 5, 5, 5, 0, -5,
    0, 0, 5, 5, 5, 5, 0, -5,
    -10, 5, 5, 5, 5, 5, 0, -10,
    -10, 0, 5, 0, 0, 0, 0, -10,
    -20, -10, -10, -5, -5, -10, -10, -20
  ],
  k: [
    -30, -40, -40, -50, -50, -40, -40, -30,
    -30, -40, -40, -50, -50, -40, -40, -30,
    -30, -40, -40, -50, -50, -40, -40, -30,
    -30, -40, -40, -50, -50, -40, -40, -30,
    -20, -30, -30, -40, -40, -30, -30, -20,
    -10, -20, -20, -20, -20, -20, -20, -10,
    20, 20, 0, 0, 0, 0, 20, 20,
    20, 30, 10, 0, 0, 10, 30, 20
  ]
};

interface GameState {
  board: Board;
  whiteKingMoved: boolean;
  blackKingMoved: boolean;
  whiteRookKingsideMoved: boolean;
  whiteRookQueensideMoved: boolean;
  blackRookKingsideMoved: boolean;
  blackRookQueensideMoved: boolean;
  enPassantSquare: [number, number] | null;
  lastMove: { from: [number, number]; to: [number, number] } | null;
}

// SmartAI Engine integrated into the game
class SmartAI {
  private transpositionTable: Map<string, { value: number; depth: number }> = new Map();
  private nodes: number = 0;

  // Generate a simplified board hash for transposition table
  private getBoardHash(state: GameState): string {
    return state.board.map(row => row.map(p => p || '.').join('')).join('');
  }

  // MVV-LVA (Most Valuable Victim - Least Valuable Attacker) scoring
  private getMVVLVA(move: { from: [number, number]; to: [number, number] }, board: Board): number {
    const victim = board[move.to[0]][move.to[1]];
    const attacker = board[move.from[0]][move.from[1]];

    if (!victim || !attacker) return 0;

    const victimValue = pieceValues[victim.toLowerCase()] || 0;
    const attackerValue = pieceValues[attacker.toLowerCase()] || 0;

    return victimValue * 10 - attackerValue;
  }

  // Order moves for better alpha-beta pruning
  private orderMoves(
    moves: Array<{ from: [number, number]; to: [number, number] }>,
    board: Board,
    isWhite: boolean
  ): Array<{ from: [number, number]; to: [number, number] }> {
    return moves.sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;

      const captureA = board[a.to[0]][a.to[1]];
      const captureB = board[b.to[0]][b.to[1]];

      if (captureA) scoreA += this.getMVVLVA(a, board);
      if (captureB) scoreB += this.getMVVLVA(b, board);

      scoreA -= (Math.abs(a.to[0] - 3.5) + Math.abs(a.to[1] - 3.5)) * 2;
      scoreB -= (Math.abs(b.to[0] - 3.5) + Math.abs(b.to[1] - 3.5)) * 2;

      return scoreB - scoreA;
    });
  }

  // Quiescence search to avoid horizon effect (simplified for performance)
  private quiescence(
    state: GameState,
    alpha: number,
    beta: number,
    isWhite: boolean,
    evaluatePosition: (state: GameState) => number,
    getAllValidMoves: (state: GameState, player: "white" | "black") => Array<{ from: [number, number]; to: [number, number] }>,
    applyMove: (state: GameState, from: [number, number], to: [number, number]) => GameState,
    depth: number = 0
  ): number {
    this.nodes++;

    // Limit quiescence depth to avoid excessive computation
    if (depth > 3) return evaluatePosition(state);

    const standPat = evaluatePosition(state);

    if (standPat >= beta) return beta;
    if (alpha < standPat) alpha = standPat;

    const player = isWhite ? "black" : "white";
    const allMoves = getAllValidMoves(state, player);

    // Only consider captures in quiescence
    const captureMoves = allMoves.filter(move => state.board[move.to[0]][move.to[1]] !== null);

    // Limit number of captures to consider
    if (captureMoves.length === 0) return alpha;

    // Order captures by MVV-LVA and take top 5
    const orderedCaptures = this.orderMoves(captureMoves, state.board, player === "white").slice(0, 5);

    for (const move of orderedCaptures) {
      const newState = applyMove(state, move.from, move.to);
      const score = -this.quiescence(newState, -beta, -alpha, !isWhite, evaluatePosition, getAllValidMoves, applyMove, depth + 1);

      if (score >= beta) return beta;
      if (score > alpha) alpha = score;
    }

    return alpha;
  }

  // Enhanced negamax with transposition table and quiescence
  public negamax(
    state: GameState,
    depth: number,
    alpha: number,
    beta: number,
    isMaximizing: boolean,
    evaluatePosition: (state: GameState) => number,
    getAllValidMoves: (state: GameState, player: "white" | "black") => Array<{ from: [number, number]; to: [number, number] }>,
    applyMove: (state: GameState, from: [number, number], to: [number, number]) => GameState,
    isInCheck: (board: Board, isWhite: boolean) => boolean
  ): number {
    this.nodes++;

    // Check transposition table
    const hash = this.getBoardHash(state);
    const ttEntry = this.transpositionTable.get(hash + depth);
    if (ttEntry && ttEntry.depth >= depth) {
      return ttEntry.value;
    }

    const player = isMaximizing ? "black" : "white";
    const moves = getAllValidMoves(state, player);

    // Terminal state check
    if (moves.length === 0) {
      const inCheck = isInCheck(state.board, player === "white");
      if (inCheck) {
        // Checkmate - prefer faster mates
        return isMaximizing ? -19999 + depth : 19999 - depth;
      }
      return 0; // Stalemate
    }

    // Leaf node - use quiescence search
    if (depth <= 0) {
      const qScore = this.quiescence(
        state, alpha, beta, player === "white",
        evaluatePosition, getAllValidMoves, applyMove, 0
      );
      this.transpositionTable.set(hash + depth, { value: qScore, depth });
      return qScore;
    }

    // Order moves for better pruning
    const orderedMoves = this.orderMoves(moves, state.board, player === "white");

    let bestScore = isMaximizing ? -Infinity : Infinity;

    for (const move of orderedMoves) {
      const newState = applyMove(state, move.from, move.to);
      const score = -this.negamax(
        newState,
        depth - 1,
        -beta,
        -alpha,
        !isMaximizing,
        evaluatePosition,
        getAllValidMoves,
        applyMove,
        isInCheck
      );

      if (isMaximizing) {
        bestScore = Math.max(bestScore, score);
        alpha = Math.max(alpha, score);
      } else {
        bestScore = Math.min(bestScore, score);
        beta = Math.min(beta, score);
      }

      // Alpha-beta pruning
      if (beta <= alpha) break;
    }

    // Store in transposition table
    this.transpositionTable.set(hash + depth, { value: bestScore, depth });

    return bestScore;
  }

  // Iterative deepening search with async breaks for UI responsiveness
  public async findBestMove(
    state: GameState,
    maxDepth: number,
    evaluatePosition: (state: GameState) => number,
    getAllValidMoves: (state: GameState, player: "white" | "black") => Array<{ from: [number, number]; to: [number, number] }>,
    applyMove: (state: GameState, from: [number, number], to: [number, number]) => GameState,
    isInCheck: (board: Board, isWhite: boolean) => boolean
  ): Promise<{ from: [number, number]; to: [number, number] } | null> {
    this.nodes = 0;
    this.transpositionTable.clear();

    const validAIMoves = getAllValidMoves(state, "black");
    if (validAIMoves.length === 0) return null;

    let bestMove = validAIMoves[0];
    let bestOverallScore = -Infinity;

    // Iterative deepening
    for (let currentDepth = 1; currentDepth <= maxDepth; currentDepth++) {
      let bestScore = -Infinity;
      let currentBestMove = bestMove;

      const orderedMoves = this.orderMoves(validAIMoves, state.board, false);

      for (const move of orderedMoves) {
        // Yield to UI thread periodically
        if (this.nodes % 1000 === 0) {
          await new Promise(resolve => setTimeout(resolve, 0));
        }

        const newState = applyMove(state, move.from, move.to);
        const score = this.negamax(
          newState,
          currentDepth - 1,
          -Infinity,
          Infinity,
          false,
          evaluatePosition,
          getAllValidMoves,
          applyMove,
          isInCheck
        );

        if (score > bestScore) {
          bestScore = score;
          currentBestMove = move;
        }
      }

      // Update best move
      if (bestScore > bestOverallScore || currentDepth === 1) {
        bestOverallScore = bestScore;
        bestMove = currentBestMove;
      }

      // Early exit on checkmate found
      if (Math.abs(bestScore) > 19000) break;
    }

    return bestMove;
  }

  public getNodesSearched(): number {
    return this.nodes;
  }
}

export function ChessBoard3D() {
  const [gameState, setGameState] = useState<GameState>({
    board: initialBoard,
    whiteKingMoved: false,
    blackKingMoved: false,
    whiteRookKingsideMoved: false,
    whiteRookQueensideMoved: false,
    blackRookKingsideMoved: false,
    blackRookQueensideMoved: false,
    enPassantSquare: null,
    lastMove: null,
  });
  const [selectedSquare, setSelectedSquare] = useState<[number, number] | null>(null);
  const [validMoves, setValidMoves] = useState<[number, number][]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<"white" | "black">("white");
  const [gameStatus, setGameStatus] = useState<string>("");
  const [rotateX, setRotateX] = useState(25);
  const [rotateZ, setRotateZ] = useState(-30);
  const [aiEngine] = useState(() => new SmartAI());
  const [isAIThinking, setIsAIThinking] = useState(false);

  const isWhitePiece = (piece: PieceType): boolean => {
    return piece !== null && piece === piece.toUpperCase();
  };

  const findKing = (board: Board, isWhite: boolean): [number, number] | null => {
    const king = isWhite ? "K" : "k";
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (board[row][col] === king) {
          return [row, col];
        }
      }
    }
    return null;
  };

  const isSquareAttacked = (board: Board, square: [number, number], byWhite: boolean): boolean => {
    const [targetRow, targetCol] = square;

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (!piece || isWhitePiece(piece) !== byWhite) continue;

        const pieceType = piece.toLowerCase();
        const rowDiff = targetRow - row;
        const colDiff = targetCol - col;
        const absRowDiff = Math.abs(rowDiff);
        const absColDiff = Math.abs(colDiff);

        switch (pieceType) {
          case "p":
            if (rowDiff === (byWhite ? -1 : 1) && absColDiff === 1) return true;
            break;

          case "n":
            if ((absRowDiff === 2 && absColDiff === 1) || (absRowDiff === 1 && absColDiff === 2)) return true;
            break;

          case "b":
            if (absRowDiff === absColDiff && rowDiff !== 0 && isPathClear(board, [row, col], square)) return true;
            break;

          case "r":
            if ((row === targetRow || col === targetCol) && (rowDiff !== 0 || colDiff !== 0)) {
              if (isPathClear(board, [row, col], square)) return true;
            }
            break;

          case "q":
            if ((row === targetRow || col === targetCol || absRowDiff === absColDiff) &&
              (rowDiff !== 0 || colDiff !== 0)) {
              if (isPathClear(board, [row, col], square)) return true;
            }
            break;

          case "k":
            if (absRowDiff <= 1 && absColDiff <= 1 && (rowDiff !== 0 || colDiff !== 0)) return true;
            break;
        }
      }
    }
    return false;
  };

  const isInCheck = (board: Board, isWhite: boolean): boolean => {
    const kingPos = findKing(board, isWhite);
    if (!kingPos) return false;
    return isSquareAttacked(board, kingPos, !isWhite);
  };

  const isPathClear = (board: Board, from: [number, number], to: [number, number]): boolean => {
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;

    const rowStep = fromRow === toRow ? 0 : (toRow - fromRow) / Math.abs(toRow - fromRow);
    const colStep = fromCol === toCol ? 0 : (toCol - fromCol) / Math.abs(toCol - fromCol);

    let checkRow = fromRow + rowStep;
    let checkCol = fromCol + colStep;

    while (checkRow !== toRow || checkCol !== toCol) {
      if (board[checkRow][checkCol]) return false;
      checkRow += rowStep;
      checkCol += colStep;
    }
    return true;
  };

  const isValidMove = (state: GameState, from: [number, number], to: [number, number], checkForCheck: boolean = true): boolean => {
    const { board } = state;
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;
    const piece = board[fromRow][fromCol];
    const targetPiece = board[toRow][toCol];

    if (!piece) return false;
    if (fromRow === toRow && fromCol === toCol) return false;
    if (targetPiece && isWhitePiece(piece) === isWhitePiece(targetPiece)) return false;

    const pieceType = piece.toLowerCase();
    const rowDiff = toRow - fromRow;
    const colDiff = toCol - fromCol;
    const absRowDiff = Math.abs(rowDiff);
    const absColDiff = Math.abs(colDiff);
    const isWhite = isWhitePiece(piece);

    let basicValidation = false;

    switch (pieceType) {
      case "p":
        const direction = isWhite ? -1 : 1;
        const startRow = isWhite ? 6 : 1;

        if (colDiff === 0 && !targetPiece) {
          if (rowDiff === direction) basicValidation = true;
          else if (fromRow === startRow && rowDiff === 2 * direction && !board[fromRow + direction][fromCol]) {
            basicValidation = true;
          }
        }
        else if (absColDiff === 1 && rowDiff === direction) {
          if (targetPiece) basicValidation = true;
          else if (state.enPassantSquare && toRow === state.enPassantSquare[0] && toCol === state.enPassantSquare[1]) {
            basicValidation = true;
          }
        }
        break;

      case "r":
        if (fromRow === toRow || fromCol === toCol) {
          basicValidation = isPathClear(board, from, to);
        }
        break;

      case "n":
        basicValidation = (absRowDiff === 2 && absColDiff === 1) || (absRowDiff === 1 && absColDiff === 2);
        break;

      case "b":
        if (absRowDiff === absColDiff) {
          basicValidation = isPathClear(board, from, to);
        }
        break;

      case "q":
        if (fromRow === toRow || fromCol === toCol || absRowDiff === absColDiff) {
          basicValidation = isPathClear(board, from, to);
        }
        break;

      case "k":
        if (absRowDiff <= 1 && absColDiff <= 1) {
          basicValidation = true;
        }
        else if (rowDiff === 0 && absColDiff === 2) {
          if (isWhite && !state.whiteKingMoved && fromRow === 7 && fromCol === 4) {
            if (toCol === 6 && !state.whiteRookKingsideMoved &&
              board[7][7] === "R" && isPathClear(board, [7, 4], [7, 7])) {
              if (!isInCheck(board, true) &&
                !isSquareAttacked(board, [7, 5], false) &&
                !isSquareAttacked(board, [7, 6], false)) {
                basicValidation = true;
              }
            }
            else if (toCol === 2 && !state.whiteRookQueensideMoved &&
              board[7][0] === "R" && isPathClear(board, [7, 4], [7, 0])) {
              if (!isInCheck(board, true) &&
                !isSquareAttacked(board, [7, 3], false) &&
                !isSquareAttacked(board, [7, 2], false)) {
                basicValidation = true;
              }
            }
          }
          else if (!isWhite && !state.blackKingMoved && fromRow === 0 && fromCol === 4) {
            if (toCol === 6 && !state.blackRookKingsideMoved &&
              board[0][7] === "r" && isPathClear(board, [0, 4], [0, 7])) {
              if (!isInCheck(board, false) &&
                !isSquareAttacked(board, [0, 5], true) &&
                !isSquareAttacked(board, [0, 6], true)) {
                basicValidation = true;
              }
            }
            else if (toCol === 2 && !state.blackRookQueensideMoved &&
              board[0][0] === "r" && isPathClear(board, [0, 4], [0, 0])) {
              if (!isInCheck(board, false) &&
                !isSquareAttacked(board, [0, 3], true) &&
                !isSquareAttacked(board, [0, 2], true)) {
                basicValidation = true;
              }
            }
          }
        }
        break;
    }

    if (!basicValidation) return false;

    if (checkForCheck) {
      const newBoard = board.map(row => [...row]);
      newBoard[toRow][toCol] = newBoard[fromRow][fromCol];
      newBoard[fromRow][fromCol] = null;

      if (pieceType === "p" && state.enPassantSquare &&
        toRow === state.enPassantSquare[0] && toCol === state.enPassantSquare[1]) {
        const captureRow = isWhite ? toRow + 1 : toRow - 1;
        newBoard[captureRow][toCol] = null;
      }

      if (isInCheck(newBoard, isWhite)) return false;
    }

    return true;
  };

  const getValidMovesForSquare = (state: GameState, row: number, col: number): [number, number][] => {
    const moves: [number, number][] = [];
    for (let toRow = 0; toRow < 8; toRow++) {
      for (let toCol = 0; toCol < 8; toCol++) {
        if (isValidMove(state, [row, col], [toRow, toCol])) {
          moves.push([toRow, toCol]);
        }
      }
    }
    return moves;
  };

  const getAllValidMoves = (state: GameState, player: "white" | "black"): Array<{ from: [number, number]; to: [number, number] }> => {
    const moves: Array<{ from: [number, number]; to: [number, number] }> = [];

    for (let fromRow = 0; fromRow < 8; fromRow++) {
      for (let fromCol = 0; fromCol < 8; fromCol++) {
        const piece = state.board[fromRow][fromCol];
        if (!piece) continue;
        if ((player === "white" && !isWhitePiece(piece)) || (player === "black" && isWhitePiece(piece))) continue;

        const validMoves = getValidMovesForSquare(state, fromRow, fromCol);
        validMoves.forEach(to => {
          moves.push({ from: [fromRow, fromCol], to });
        });
      }
    }

    return moves;
  };

  const evaluatePosition = (state: GameState): number => {
    const { board } = state;
    let score = 0;

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (!piece) continue;

        const isWhite = isWhitePiece(piece);
        const pieceType = piece.toLowerCase();
        let pieceScore = pieceValues[pieceType];

        // Add positional bonus using piece-square tables
        const sqIndex = (7 - row) * 8 + col;
        if (pieceTables[pieceType as keyof typeof pieceTables]) {
          const table = pieceTables[pieceType as keyof typeof pieceTables];
          const tableIndex = isWhite ? sqIndex : (7 - row) * 8 + (7 - col);
          pieceScore += table[tableIndex];
        }

        score += isWhite ? pieceScore : -pieceScore;
      }
    }

    // Mobility bonus
    const whiteMoves = getAllValidMoves(state, "white").length;
    const blackMoves = getAllValidMoves(state, "black").length;
    score += 5 * (whiteMoves - blackMoves);

    // Check bonus
    if (isInCheck(board, true)) score -= 50;
    if (isInCheck(board, false)) score += 50;

    return score;
  };

  const applyMove = (state: GameState, from: [number, number], to: [number, number]): GameState => {
    const newBoard = state.board.map(row => [...row]);
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;
    const piece = newBoard[fromRow][fromCol];
    const pieceType = piece?.toLowerCase();
    const isWhite = piece ? isWhitePiece(piece) : false;

    let newState: GameState = {
      ...state,
      board: newBoard,
      lastMove: { from, to },
      enPassantSquare: null,
    };

    if (pieceType === "p" && state.enPassantSquare &&
      toRow === state.enPassantSquare[0] && toCol === state.enPassantSquare[1]) {
      const captureRow = isWhite ? toRow + 1 : toRow - 1;
      newBoard[captureRow][toCol] = null;
    }

    if (pieceType === "k" && Math.abs(toCol - fromCol) === 2) {
      if (toCol === 6) {
        newBoard[fromRow][5] = newBoard[fromRow][7];
        newBoard[fromRow][7] = null;
      } else if (toCol === 2) {
        newBoard[fromRow][3] = newBoard[fromRow][0];
        newBoard[fromRow][0] = null;
      }
    }

    newBoard[toRow][toCol] = newBoard[fromRow][fromCol];
    newBoard[fromRow][fromCol] = null;

    if (pieceType === "p" && (toRow === 0 || toRow === 7)) {
      newBoard[toRow][toCol] = isWhite ? "Q" : "q";
    }

    if (pieceType === "p" && Math.abs(toRow - fromRow) === 2) {
      newState.enPassantSquare = [isWhite ? fromRow - 1 : fromRow + 1, fromCol];
    }

    if (pieceType === "k") {
      if (isWhite) {
        newState.whiteKingMoved = true;
      } else {
        newState.blackKingMoved = true;
      }
    }
    if (pieceType === "r") {
      if (isWhite) {
        if (fromRow === 7 && fromCol === 7) newState.whiteRookKingsideMoved = true;
        if (fromRow === 7 && fromCol === 0) newState.whiteRookQueensideMoved = true;
      } else {
        if (fromRow === 0 && fromCol === 7) newState.blackRookKingsideMoved = true;
        if (fromRow === 0 && fromCol === 0) newState.blackRookQueensideMoved = true;
      }
    }

    return newState;
  };

  const makeMove = (from: [number, number], to: [number, number]) => {
    const newState = applyMove(gameState, from, to);
    setGameState(newState);
    setSelectedSquare(null);
    setValidMoves([]);

    const nextPlayer = currentPlayer === "white" ? "black" : "white";
    const nextMoves = getAllValidMoves(newState, nextPlayer);
    const nextIsWhite = nextPlayer === "white";

    if (nextMoves.length === 0) {
      if (isInCheck(newState.board, nextIsWhite)) {
        setGameStatus(`Checkmate! ${currentPlayer === "white" ? "You" : "AI"} win!`);
        return;
      }
    } else if (isInCheck(newState.board, nextIsWhite)) {
      setGameStatus("Check!");
    } else {
      setGameStatus("");
    }

    setCurrentPlayer(nextPlayer);
  };

  const makeAIMove = async () => {
    if (isAIThinking) return; // Prevent multiple AI moves at once

    const validAIMoves = getAllValidMoves(gameState, "black");
    if (validAIMoves.length === 0) {
      setIsAIThinking(false);
      return;
    }

    setIsAIThinking(true);

    try {
      let totalPieces = 0;
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          if (gameState.board[row][col]) totalPieces++;
        }
      }

      const searchDepth = totalPieces === 32 ? 2 : totalPieces <= 12 ? 4 : 3;

      const bestMove = await aiEngine.findBestMove(
        gameState,
        searchDepth,
        evaluatePosition,
        getAllValidMoves,
        applyMove,
        isInCheck
      );

      if (bestMove) {
        setTimeout(() => {
          makeMove(bestMove.from, bestMove.to);
          setIsAIThinking(false);
        }, 250);
      } else {
        setIsAIThinking(false);
      }
    } catch {
      setIsAIThinking(false);
    }
  };

  useEffect(() => {
    if (currentPlayer === "black" && !gameStatus.includes("Checkmate") && !isAIThinking) {
      // Use setTimeout to ensure state has updated
      const timer = setTimeout(() => {
        makeAIMove();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, gameStatus]);

  const handleSquareClick = (row: number, col: number) => {
    if (currentPlayer !== "white" || gameStatus.includes("Checkmate") || isAIThinking) return;

    if (selectedSquare) {
      const [selectedRow, selectedCol] = selectedSquare;

      // Check if this is a valid move (including captures)
      if (isValidMove(gameState, selectedSquare, [row, col])) {
        makeMove(selectedSquare, [row, col]);
      } else {
        // If not a valid move, check if clicking another friendly piece
        const piece = gameState.board[row][col];
        if (piece && isWhitePiece(piece)) {
          setSelectedSquare([row, col]);
          setValidMoves(getValidMovesForSquare(gameState, row, col));
        } else {
          setSelectedSquare(null);
          setValidMoves([]);
        }
      }
    } else {
      const piece = gameState.board[row][col];
      if (piece && isWhitePiece(piece)) {
        setSelectedSquare([row, col]);
        setValidMoves(getValidMovesForSquare(gameState, row, col));
      }
    }
  };

  const resetGame = () => {
    setIsAIThinking(false);
    setGameState({
      board: initialBoard,
      whiteKingMoved: false,
      blackKingMoved: false,
      whiteRookKingsideMoved: false,
      whiteRookQueensideMoved: false,
      blackRookKingsideMoved: false,
      blackRookQueensideMoved: false,
      enPassantSquare: null,
      lastMove: null,
    });
    setSelectedSquare(null);
    setValidMoves([]);
    setCurrentPlayer("white");
    setGameStatus("");
  };

  const isValidMoveSquare = (row: number, col: number): boolean => {
    return validMoves.some(([r, c]) => r === row && c === col);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-4">
        <div className="text-sm text-muted-foreground">
          {gameStatus || (isAIThinking ? "AI Thinking..." : currentPlayer === "white" ? "Your Turn" : "AI's Turn")}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={resetGame}
          className="border-primary/50 hover:border-primary hover:bg-primary/10"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      <div
        className="relative"
        style={{
          perspective: "1200px",
          width: "400px",
          height: "400px",
        }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = (e.clientY - rect.top - rect.height / 2) / 20;
          const z = -(e.clientX - rect.left - rect.width / 2) / 20;
          setRotateX(Math.max(20, Math.min(35, 25 + x)));
          setRotateZ(Math.max(-40, Math.min(-20, -30 + z)));
        }}
        onMouseLeave={() => {
          setRotateX(25);
          setRotateZ(-30);
        }}
      >
        <div
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${rotateX}deg) rotateZ(${rotateZ}deg)`,
            transition: "transform 0.2s ease-out",
            width: "100%",
            height: "100%",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              transform: "translateZ(-20px)",
              background: "linear-gradient(135deg, #2d1b4e 0%, #1a1a2e 100%)",
              borderRadius: "8px",
              boxShadow: "0 0 40px rgba(168, 85, 247, 0.3)",
            }}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(8, 1fr)",
              gridTemplateRows: "repeat(8, 1fr)",
              width: "100%",
              height: "100%",
              gap: "1px",
              padding: "4px",
              transformStyle: "preserve-3d",
            }}
          >
            {gameState.board.map((row, rowIndex) =>
              row.map((piece, colIndex) => {
                const isLight = (rowIndex + colIndex) % 2 === 0;
                const isSelected = selectedSquare?.[0] === rowIndex && selectedSquare?.[1] === colIndex;
                const isValidMoveTarget = isValidMoveSquare(rowIndex, colIndex);

                return (
                  <motion.div
                    key={`${rowIndex}-${colIndex}`}
                    onClick={() => handleSquareClick(rowIndex, colIndex)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    style={{
                      background: isLight
                        ? "linear-gradient(135deg, #e9d5ff 0%, #c4b5fd 100%)"
                        : "linear-gradient(135deg, #4c1d95 0%, #3730a3 100%)",
                      border: isSelected ? "2px solid #a855f7" : "none",
                      boxShadow: isSelected
                        ? "0 0 20px rgba(168, 85, 247, 0.8)"
                        : piece
                          ? "0 4px 8px rgba(0, 0, 0, 0.3)"
                          : "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      transformStyle: "preserve-3d",
                      transform: piece ? "translateZ(10px)" : "translateZ(0)",
                      borderRadius: "4px",
                    }}
                  >
                    {isValidMoveTarget && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                          duration: 0.3
                        }}
                        style={{
                          position: "absolute",
                          width: piece ? "90%" : "35%",
                          height: piece ? "90%" : "35%",
                          borderRadius: "50%",
                          background: piece
                            ? "rgba(239, 68, 68, 0.5)"
                            : "rgba(168, 85, 247, 0.6)",
                          border: piece ? "3px solid #ef4444" : "none",
                          boxShadow: piece
                            ? "0 0 20px rgba(239, 68, 68, 0.8)"
                            : "0 0 15px rgba(168, 85, 247, 0.6)",
                          pointerEvents: "none",
                          zIndex: 1,
                        }}
                      />
                    )}

                    {piece && (
                      <motion.div
                        key={`piece-${rowIndex}-${colIndex}-${piece}`}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                          duration: 0.4
                        }}
                        style={{
                          fontSize: "2rem",
                          color: isWhitePiece(piece) ? "#ffffff" : "#0d0d1f",
                          textShadow: isWhitePiece(piece)
                            ? "0 2px 4px rgba(0, 0, 0, 0.5)"
                            : "0 2px 4px rgba(168, 85, 247, 0.5)",
                          transform: "translateZ(5px)",
                          pointerEvents: "none",
                          position: "relative",
                          zIndex: 2,
                        }}
                      >
                        {pieceSymbols[piece]}
                      </motion.div>
                    )}
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
