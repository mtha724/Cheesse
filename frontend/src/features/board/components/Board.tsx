
// ---------------- Imports ---------------- //
import "./board.css";
import Square from "./Square";
import { FILES, RANKS, type SquareId } from "./BoardConfig";
import { useMovePiece } from "../hooks/useMovePiece";

/**
 * Converts a square ID (e.g., "e4") to board coordinates.
 * 
 * @param square - The square ID.
 * @returns {[number, number]} The [file, rank] coordinates.
 */
export function squareToCoords(square: string): [number, number] {
  const file = square.charCodeAt(0) - "a".charCodeAt(0);
  const rank = parseInt(square[1]) - 1;
  return [file, rank];
}

// ---------------- Board Component ---------------- //

/**
 * Board component - renders the chessboard and handles piece movement.
 * @returns {JSX.Element}
 */
export default function Board() {
  const { pieces, movePiece } = useMovePiece();

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
