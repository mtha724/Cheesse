/* This file contains configuration constants for the chessboard. */

// ---------------- Board Config ---------------- //
export const FILES = ["a","b","c","d","e","f","g","h"] as const;
export const RANKS = [8, 7, 6, 5, 4, 3, 2, 1] as const;

// ---------------- Board Types ---------------- //
export type SquareId = `${typeof FILES[number]}${typeof RANKS[number]}`;
export type PieceName =
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

export const pieceMap: Record<PieceName, string> = {
  bishop_black, bishop_white,
  king_black,   king_white,
  knight_black, knight_white,
  pawn_black,   pawn_white,
  queen_black,  queen_white,
  rook_black,   rook_white,
};

// ---------------- Initial Setup ---------------- //
export const initialPieces: Partial<Record<SquareId, PieceName>> = {
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
