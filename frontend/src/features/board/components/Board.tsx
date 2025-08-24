import { useEffect, useState } from "react";
import { useRef } from "react";
import { useDrop } from "react-dnd";
import Piece, { ItemTypes } from "./Piece";
import "./board.css";
import Referee from "../../referee/referee";

// ---------------- Constants ---------------- //
const FILES = ["a","b","c","d","e","f","g","h"];
const RANKS = [8, 7, 6, 5, 4, 3, 2, 1];

type SquareId = `${typeof FILES[number]}${typeof RANKS[number]}`;
type PieceName =
  | "bishop_black" | "bishop_white"
  | "king_black"   | "king_white"
  | "knight_black" | "knight_white"
  | "pawn_black"   | "pawn_white"
  | "queen_black"  | "queen_white"
  | "rook_black"   | "rook_white";

// ---------------- Piece Imports ---------------- //
import bishop_black  from "../../../assets/pieces/bishop_black.png";
import bishop_white  from "../../../assets/pieces/bishop_white.png";
import king_black    from "../../../assets/pieces/king_black.png";
import king_white    from "../../../assets/pieces/king_white.png";
import knight_black  from "../../../assets/pieces/knight_black.png";
import knight_white  from "../../../assets/pieces/knight_white.png";
import pawn_black    from "../../../assets/pieces/pawn_black.png";
import pawn_white    from "../../../assets/pieces/pawn_white.png";
import queen_black   from "../../../assets/pieces/queen_black.png";
import queen_white   from "../../../assets/pieces/queen_white.png";
import rook_black    from "../../../assets/pieces/rook_black.png";
import rook_white    from "../../../assets/pieces/rook_white.png";

const pieceMap: Record<PieceName, string> = {
  bishop_black, bishop_white,
  king_black,   king_white,
  knight_black, knight_white,
  pawn_black,   pawn_white,
  queen_black,  queen_white,
  rook_black,   rook_white,
};

// ---------------- Initial Setup ---------------- //
const initialPieces: Record<SquareId, PieceName> = {
  // White
  a2:"pawn_white", b2:"pawn_white", c2:"pawn_white", d2:"pawn_white",
  e2:"pawn_white", f2:"pawn_white", g2:"pawn_white", h2:"pawn_white",
  a1:"rook_white", b1:"knight_white", c1:"bishop_white", d1:"queen_white",
  e1:"king_white", f1:"bishop_white", g1:"knight_white", h1:"rook_white",
  // Black
  a7:"pawn_black", b7:"pawn_black", c7:"pawn_black", d7:"pawn_black",
  e7:"pawn_black", f7:"pawn_black", g7:"pawn_black", h7:"pawn_black",
  a8:"rook_black", b8:"knight_black", c8:"bishop_black", d8:"queen_black",
  e8:"king_black", f8:"bishop_black", g8:"knight_black", h8:"rook_black",
};

// ---------------- Square Component ---------------- //
interface SquareProps {
  readonly id: SquareId;
  readonly isDark: boolean;
  readonly piece?: PieceName;
  readonly movePiece: (from: SquareId, to: SquareId) => void;
}

function Square({ id, isDark, piece, movePiece }: Readonly<SquareProps>) {
  const [{ isOver }, drop] = useDrop<{ from: SquareId }, void, { isOver: boolean }>(() => ({
    accept: ItemTypes.PIECE,
    drop: (item) => movePiece(item.from, id),
    collect: (monitor) => ({ isOver: monitor.isOver() }),
  }), [id]);

  return (
  <div
    ref={(node) => {
      if (node) drop(node);
    }}
    className={`square ${isDark ? "dark" : "light"}`}
    aria-label={`square ${id}`}
  >
    {piece && <Piece id={id} src={pieceMap[piece]} />}
    {isOver && <div className="highlight" />}
  </div>
);
}

// --------------- Utility Functions ---------------//
export function squareToCoords(square: string): [number, number] {
  const file = square.charCodeAt(0) - "a".charCodeAt(0); // 'a' -> 0
  const rank = parseInt(square[1]) - 1; // '1' -> 0
  return [file, rank];
}

// ---------------- Board Component ---------------- //
import { useRecordMove } from '../hooks/useRecordMove';

export default function Board() {
  const recordMove = useRecordMove();
  const [pieces, setPieces] = useState(initialPieces);
  const moveInProgress = useRef(false);

  let moveCount = 0;

  // Make a persistent Referee instance
  const referee = useRef(new Referee()).current;

  // Make a persistent board reference
  const boardArray = useRef<(string | undefined)[][]>(
    Array(8).fill(null).map(() => Array(8).fill(undefined))
  );

  // Initialize board once
  useEffect(() => {
    for (const [square, piece] of Object.entries(initialPieces)) {
      const [x, y] = squareToCoords(square);
      boardArray.current[y][x] = piece;
    }
  }, []);

  /**
   * Moves a piece from one square to another.
   * 
   * @param from - The starting square ID.
   * @param to - The target square ID.
   */
  function movePiece(from: SquareId, to: SquareId) {
    setPieces(prev => {
      const piece = prev[from];
      const destPiece = prev[to];

      if (!piece) return prev; // no piece to move
      if (from === to) return prev; // no movement

      // Get the coordinates of the squares
      const [prevX, prevY] = squareToCoords(from);
      const [newX, newY] = squareToCoords(to);

      // Check if the move is valid
      referee.setMoveCount(moveCount);
      if (!referee.isValidMove(boardArray.current, prevX, prevY, newX, newY, piece, destPiece)) {
        console.warn(`Invalid move from ${prevX}, ${prevY} to ${newX}, ${newY}`);
        return prev; // invalid move, do not update state
      }

      // Update the board array
      boardArray.current[prevY][prevX] = undefined; // remove piece from old square
      boardArray.current[newY][newX] = piece; // place piece on new square

      console.log(`Moving ${piece} from ${from} to ${to}`); // for debugging

      // Update the pieces state
      const next = { ...prev };
      next[to] = piece;
      delete next[from];

      // Only record the move if it hasn't been recorded yet
      if (!moveInProgress.current) {
        moveInProgress.current = true;
        recordMove(from, to, piece);
        // Reset the flag after a short delay
        setTimeout(() => {
          moveInProgress.current = false;
        }, 0);
        }

        moveCount += 1;   
      return next;
    });
  }

  return (
    <div className="wrapper">
      <div className="board-wrapper">
        <div className="board">
          {/* Render the squares */}
          {RANKS.map((rank, rIdx) =>
            FILES.map((file, fIdx) => {
              const squareId = `${file}${rank}` as SquareId;
              const piece = pieces[squareId];
              const isDark = (rIdx + fIdx) % 2 === 1;
              return (
                <Square
                  key={squareId}
                  id={squareId}
                  isDark={isDark}
                  piece={piece}
                  movePiece={movePiece}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
