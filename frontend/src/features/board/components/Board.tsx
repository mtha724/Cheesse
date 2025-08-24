import { useEffect, useState } from "react";
import { useRef } from "react";
import "./board.css";
import Referee from "../../referee/referee";
import Square from "./Square";
import { FILES, RANKS, type SquareId, initialPieces } from "./BoardConfig";

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
