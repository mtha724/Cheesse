import { useDrag } from "react-dnd";

export const ItemTypes = { PIECE: "piece" };

export default function Piece({ id, src }: { id: string; src: string }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.PIECE,
    item: { from: id },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  }), [id]);

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