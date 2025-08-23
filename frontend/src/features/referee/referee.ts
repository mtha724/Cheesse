// TODO implement jump blocking for rooks, bishops, queens

// This class handles the rules of chess and ensures pieces are moved according to the game's rules.
export default class Referee {
  /**
  * Validates a move for a given piece.
  *
  * @param prevX - The starting x-coordinate of the piece.
  * @param prevY - The starting y-coordinate of the piece.
  * @param newX - The target x-coordinate for the piece.
  * @param newY - The target y-coordinate for the piece.
  * @param piece - The type of the piece being moved.
  * @param destPiece - The piece being captured, if any.
  */
  isValidMove(
    prevX: number,
    prevY: number,
    newX: number,
    newY: number,
    piece: string,
    destPiece?: string
  ): boolean {

    const dx = newX - prevX;
    const dy = newY - prevY;

    // Check for blocking pieces
    if (destPiece && this.isOwnPiece(piece, destPiece)) {
      console.warn(`Cannot capture own piece: ${destPiece}`);
      return false;
    }

    switch (piece) {
      case "pawn_white":
        return this.validatePawn(prevX, prevY, newX, newY, piece, destPiece, true);
      case "pawn_black":
        return this.validatePawn(prevX, prevY, newX, newY, piece, destPiece, false);
      case "rook_white":
      case "rook_black":
        return this.validateRook(dx, dy);
      case "bishop_white":
      case "bishop_black":
        return this.validateBishop(dx, dy);
      case "queen_white":
      case "queen_black":
        return this.validateQueen(dx, dy);
      case "king_white":
      case "king_black":
        return this.validateKing(dx, dy);
      case "knight_white":
      case "knight_black":
        return this.validateKnight(dx, dy);
      default:
        return false;
    }
  }

  /**
   * Determines if two pieces belong to the same player.
   *
   * @param piece - The piece being moved.
   * @param destPiece - The piece at the destination.
   * @returns Whether both pieces belong to the same player.
   */
   private isOwnPiece(piece: string, destPiece: string): boolean {
    // Assumes piece strings are in the format 'type_color'
    const pieceColor = piece.split('_')[1];
    const destColor = destPiece.split('_')[1];
    return pieceColor === destColor;
  }

  /**
   * Validates a pawn move.
   *
   * @param fx - The starting x-coordinate of the pawn.
   * @param fy - The starting y-coordinate of the pawn.
   * @param tx - The target x-coordinate for the pawn.
   * @param ty - The target y-coordinate for the pawn.
   * @param piece - The type of the pawn being moved.
   * @param captured - The piece being captured, if any.
   * @param isWhite - Whether the pawn is white or black.
   * @returns Whether the move is valid.
   */
  private validatePawn(
    fx: number, fy: number, tx: number, ty: number,
    piece: string, captured?: string, isWhite = true
  ): boolean {
    const dir = isWhite ? 1 : -1;
    const startRow = isWhite ? 1 : 6;

    // single move
    if (fx === tx && ty - fy === dir && !captured) return true;

    // double move from starting row
    if (fx === tx && fy === startRow && ty - fy === 2 * dir && !captured) return true;

    // capture diagonally
    if (Math.abs(tx - fx) === 1 && ty - fy === dir && captured) return true;

    return false;
  }

  /**
   * Validates a bishop move.
   *
   * @param dx - The change in x-coordinate.
   * @param dy - The change in y-coordinate.
   * @returns Whether the move is valid.
   */
  private validateBishop(dx: number, dy: number) {
    return Math.abs(dx) === Math.abs(dy);
  }

  /**
   * Validates a knight move.
   *
   * @param dx - The change in x-coordinate.
   * @param dy - The change in y-coordinate.
   * @returns Whether the move is valid.
   */
  private validateKnight(dx: number, dy: number) {
    return (
      (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
      (Math.abs(dx) === 1 && Math.abs(dy) === 2)
    );
  }

  /**
   * Validates a rook move.
   * 
   * @param dx - The change in x-coordinate.
   * @param dy - The change in y-coordinate.
   * @returns Whether the move is valid.
   */
  private validateRook(dx: number, dy: number) {
    return dx === 0 || dy === 0;
  }

  /**
   * Validates a queen move.
   *
   * @param dx - The change in x-coordinate.
   * @param dy - The change in y-coordinate.
   * @returns Whether the move is valid.
   */
  private validateQueen(dx: number, dy: number) {
    return this.validateRook(dx, dy) || this.validateBishop(dx, dy);
  }

  /**
   * Validates a king move.
   *
   * @param dx - The change in x-coordinate.
   * @param dy - The change in y-coordinate.
   * @returns Whether the move is valid.
   */
  private validateKing(dx: number, dy: number) {
    return Math.abs(dx) <= 1 && Math.abs(dy) <= 1;
  }
}
