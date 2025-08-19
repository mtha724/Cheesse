import { useState } from "react";
import { useDrop } from "react-dnd";
import Piece, { ItemTypes } from "./Piece";
import "./board.css";

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

const files = ["a","b","c","d","e","f","g","h"];
const ranks = [8,7,6,5,4,3,2,1];

const pieceMap: Record<string, string> = {
  "bishop_black.png": bishop_black,
  "bishop_white.png": bishop_white,
  "king_black.png":   king_black,
  "king_white.png":   king_white,
  "knight_black.png": knight_black,
  "knight_white.png": knight_white,
  "pawn_black.png":   pawn_black,
  "pawn_white.png":   pawn_white,
  "queen_black.png":  queen_black,
  "queen_white.png":  queen_white,
  "rook_black.png":   rook_black,
  "rook_white.png":   rook_white,
};

const initialPieces: Record<string, string> = {
  // white
  a2:"pawn_white.png", b2:"pawn_white.png", c2:"pawn_white.png", d2:"pawn_white.png",
  e2:"pawn_white.png", f2:"pawn_white.png", g2:"pawn_white.png", h2:"pawn_white.png",
  a1:"rook_white.png", b1:"knight_white.png", c1:"bishop_white.png", d1:"queen_white.png",
  e1:"king_white.png", f1:"bishop_white.png", g1:"knight_white.png", h1:"rook_white.png",
  // black
  a7:"pawn_black.png", b7:"pawn_black.png", c7:"pawn_black.png", d7:"pawn_black.png",
  e7:"pawn_black.png", f7:"pawn_black.png", g7:"pawn_black.png", h7:"pawn_black.png",
  a8:"rook_black.png", b8:"knight_black.png", c8:"bishop_black.png", d8:"queen_black.png",
  e8:"king_black.png", f8:"bishop_black.png", g8:"knight_black.png", h8:"rook_black.png",
};

export default function Board() {
  const [pieces, setPieces] = useState<Record<string, string>>(initialPieces);

  function movePiece(from: string, to: string) {
    if (from === to) return;
    setPieces(prev => {
      if (!prev[from]) return prev;
      const next = { ...prev };
      next[to] = next[from];  
      delete next[from];
      return next;
    });
  }

  return (
    <div className="wrapper">
      <div className="board-wrapper">
        <div className="board">
          {ranks.map((rank, rIdx) =>
            files.map((file, fIdx) => {
              const isDark = (rIdx + fIdx) % 2 === 1;
              const squareId = `${file}${rank}`;
              const pieceFile = pieces[squareId];
              const pieceSrc = pieceFile ? pieceMap[pieceFile] : undefined;
              const [{ isOver }, drop] = useDrop<
                { from: string },
                void,
                { isOver: boolean }
              >(() => ({
                accept: ItemTypes.PIECE,
                drop: (item) => movePiece(item.from, squareId),
                collect: (monitor) => ({ isOver: monitor.isOver() }),
              }), [squareId]);

              return (
                <div
                  ref={drop}
                  key={squareId}
                  className={`square ${isDark ? "dark" : "light"} ${
                    fIdx === 0 ? "first-col" : ""
                  } ${rIdx === ranks.length - 1 ? "last-row" : ""}`}
                  data-rank={rank}
                  data-file={file}
                  aria-label={`square ${squareId}`}
                >
                  {pieceSrc && <Piece id={squareId} src={pieceSrc} />}
                  {isOver && <div className="highlight" />}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
