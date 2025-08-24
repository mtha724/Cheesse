/* This component represents a chess piece. */

// ---------------- Imports ---------------- //
import { useDrag } from "react-dnd";

export const ItemTypes = { PIECE: "piece" };

/**
 * Piece component - represents a chess piece.
 *
 * @param {string} id - The unique identifier for the piece.
 * @param {string} src - The source URL for the piece image.
 */
export default function Piece({ id, src }: { id: string; src: string }) {
  // Set up the drag source for the piece
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.PIECE,
    item: { from: id },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  }), [id]);

  // Render the piece
  return (
    <img
      ref={(node) => {
        if (node) drag(node); // attach the drag connector
      }}
      src={src}
      alt={id}
      className="piece"
      draggable={false}     // react-dnd handles it
      style={{ opacity: isDragging ? 0.5 : 1, cursor: "grab" }}
    />
  );
}