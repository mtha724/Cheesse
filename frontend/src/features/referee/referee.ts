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
    board: (string | undefined)[][],
    prevX: number,
    prevY: number,
    newX: number,
    newY: number,
    piece: string,
    destPiece?: string
  ): boolean {

    // Calculate the difference in position
    const dx = newX - prevX;
    const dy = newY - prevY;

    // Check for blocking pieces
    if (destPiece && this.isOwnPiece(piece, destPiece)) {
      console.warn(`Cannot capture own piece: ${destPiece}`);
      return false;
    }

    // Validate the move based on the piece type
    switch (piece) {
      case "pawn_white":
        return this.validatePawn(board, prevX, prevY, newX, newY, destPiece, true);

      case "pawn_black":
        return this.validatePawn(board, prevX, prevY, newX, newY, destPiece, false);

      case "rook_white":
      case "rook_black":
        return this.validateRook(board, prevX, prevY, newX, newY);

      case "bishop_white":
      case "bishop_black":
        return this.validateBishop(board, prevX, prevY, newX, newY);

      case "queen_white":
      case "queen_black":
        return this.validateQueen(board, prevX, prevY, newX, newY);

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
   * @param captured - The piece being captured, if any.
   * @param isWhite - Whether the pawn is white or black.
   * @returns Whether the move is valid.
   */
  private validatePawn(
    board: (string | undefined)[][],
    prevX: number, prevY: number, newX: number, newY: number, captured?: string, isWhite = true
  ): boolean {
    const dir = isWhite ? 1 : -1;
    const startRow = isWhite ? 1 : 6;

    // Single move
    if (prevX === newX && newY - prevY === dir && !captured) return true;

    // Double move from starting row
    if (prevX === newX && prevY === startRow && newY - prevY === 2 * dir) {
      if (!captured) {
        // Check the intermediate square for a blockage
        const intermediateY = prevY + dir;
        if (board[intermediateY][prevX]) {
          console.warn(`Invalid double move: path blocked at ${prevX}, ${intermediateY}`);
          return false; // path blocked
        }
        return true;
      }
    }

    // Capture diagonally
    if (Math.abs(newX - prevX) === 1 && newY - prevY === dir && captured) return true;

    return false;
  }

  /**
   * Validates a bishop move.
   *
   * @param board - The current state of the board.
   * @param prevX - The starting x-coordinate of the bishop.
   * @param prevY - The starting y-coordinate of the bishop.
   * @param newX - The target x-coordinate for the bishop.
   * @param newY - The target y-coordinate for the bishop.
   * @returns Whether the move is valid.
   */
  private validateBishop(
    board: (string | undefined)[][],
    prevX: number, prevY: number,
    newX: number, newY: number
  ) {
    // Check for valid diagonal movement
    if (Math.abs(newX - prevX) !== Math.abs(newY - prevY)) {
      console.warn(`Invalid bishop move from ${prevX}, ${prevY} to ${newX}, ${newY}`);
      return false;
    }

    // Create step variables for iteration
    const stepX = newX > prevX ? 1 : -1;
    const stepY = newY > prevY ? 1 : -1;

    let x = prevX + stepX;
    let y = prevY + stepY;

    // Check along the diagonal
    while (x !== newX && y !== newY) {
      if (board[y][x]) {
        console.warn(`Path blocked by piece at ${x}, ${y}`);
        return false; // there is a piece blocking the path
      }
      // Increment the coordinates
      x += stepX;
      y += stepY;
    }

    // If no pieces are blocking the path, the move is valid
    return true;
  }

  /**
   * Validates a knight move.
   * Note no jump prevention needed, as the knight can jump over pieces.
   *
   * @param dx - The change in x-coordinate.
   * @param dy - The change in y-coordinate.
   * @returns Whether the move is valid.
   */
  private validateKnight(dx: number, dy: number) {
    // Knights move in an L shape: two squares in one direction and then one square perpendicular
    return (
      (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
      (Math.abs(dx) === 1 && Math.abs(dy) === 2)
    );
  }

  /**
   * Validates a rook move.
   *
   * @param board - The current state of the board.
   * @param prevX - The starting x-coordinate of the rook.
   * @param prevY - The starting y-coordinate of the rook.
   * @param newX - The target x-coordinate for the rook.
   * @param newY - The target y-coordinate for the rook.
   * @returns Whether the move is valid.
   */
  private validateRook(board: (string | undefined)[][], prevX: number, prevY: number, newX: number, newY: number) {
    // Check for valid horizontal or vertical movement
    if (newX - prevX != 0 && newY - prevY != 0) {
      console.warn(`Invalid rook move from ${prevX}, ${prevY} to ${newX}, ${newY}`);
      return false; // rook can only move in straight lines
    }

    // Create step variables for iteration
    const stepX = prevX === newX ? 0 : newX > prevX ? 1 : -1;
    const stepY = prevY === newY ? 0 : newY > prevY ? 1 : -1;

    let x = prevX + stepX;
    let y = prevY + stepY;

    // Check for obstacles in the path
    while (x !== newX || y !== newY) {
      if (board[y][x]) {
        console.warn(`Path blocked by piece at ${x}, ${y}`);
        return false; // there is a piece blocking the path
      }
      x += stepX;
      y += stepY;
    }

    return true;
  }

  /**
   * Validates a queen move.
   * Uses both rook and bishop movement rules.
   *
   * @param board - The current state of the board.
   * @param prevX - The starting x-coordinate of the queen.
   * @param prevY - The starting y-coordinate of the queen.
   * @param newX - The target x-coordinate for the queen.
   * @param newY - The target y-coordinate for the queen.
   * @returns Whether the move is valid.
   */
  private validateQueen(board: (string | undefined)[][], prevX: number, prevY: number, newX: number, newY: number) {
    // Queens move like both rooks and bishops
    return this.validateRook(board, prevX, prevY, newX, newY) || this.validateBishop(board, prevX, prevY, newX, newY);
  }

  /**
   * Validates a king move.
   * Note no jump prevention needed, as the king can only move one square.
   *
   * @param dx - The change in x-coordinate.
   * @param dy - The change in y-coordinate.
   * @returns Whether the move is valid.
   */
  private validateKing(dx: number, dy: number) {
    // King moves one square in any direction
    return Math.abs(dx) <= 1 && Math.abs(dy) <= 1;
  }
}
