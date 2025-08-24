/**
 * This component represents a square on the chessboard.
 */

import { useDrop } from "react-dnd";
import Piece, { ItemTypes } from "./Piece";
import { type PieceName, type SquareId, pieceMap } from "./BoardConfig";

/**
 * Props for the Square component.
 */
interface SquareProps {
  readonly id: SquareId;
  readonly isDark: boolean;
  readonly piece?: PieceName;
  readonly movePiece: (from: SquareId, to: SquareId) => void;
}

/**
 * This component represents a square on the chessboard.
 * 
 * @param id - The square ID (e.g., "e4").
 * @param isDark - Whether the square is dark colored.
 * @param piece - The piece on the square, if any.
 * @param movePiece - Function to move a piece from one square to another.
 * @returns The rendered square component.
 */
export default function Square({ id, isDark, piece, movePiece }: Readonly<SquareProps>) {
  
  // Set up the drop target for the square
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
