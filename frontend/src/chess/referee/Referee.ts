/* This class handles the rules of chess and ensures pieces are moved according to the game's rules. */
export default class Referee {

  // Define the board state
  private board: (string | undefined)[][] = [];
  private prevX = 0;
  private prevY = 0;
  private newX = 0;
  private newY = 0;
  private moveCount = 0;
  private destPiece?: string;


  setMoveCount(moveCount: number) {
      this.moveCount = moveCount;
  }

  /**
  * Validates a move for a given piece.
  *
  * @param prevX - The starting x-coordinate of the piece.
  * @param prevY - The starting y-coordinate of the piece.
  * @param newX - The target x-coordinate for the piece.
  * @param newY - The target y-coordinate for the piece.
  * @param piece - The type of the piece being moved.
  * @param destPiece - The piece being captured, if any.
  * 
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

    // Set up the board state
    this.board = board;
    this.prevX = prevX;
    this.prevY = prevY;
    this.newX = newX;
    this.newY = newY;
    this.destPiece = destPiece;

    // Calculate the difference in position
    const dx = newX - prevX;
    const dy = newY - prevY;

    // checks if selected piece's colour is the one whose turn it is
    if (((piece.split('_')[1] == "white") && (this.moveCount % 2 == 1)) || ((piece.split('_')[1] == "black") && (this.moveCount % 2 == 0))) {
      return false;
    }

    // Check for blocking pieces
    if (destPiece && this.isOwnPiece(piece, destPiece)) {
      console.warn(`Invalid move: cannot capture own piece: ${destPiece}`);
      return false;
    }

    // Validate the move based on the piece type
    switch (piece) {
      case "pawn_white":
        return this.validatePawn(true);

      case "pawn_black":
        return this.validatePawn(false);

      case "rook_white":
      case "rook_black":
        return this.validateRook();

      case "bishop_white":
      case "bishop_black":
        return this.validateBishop();

      case "queen_white":
      case "queen_black":
        return this.validateQueen();

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
   * Determines the step direction between two positions.
   *
   * @param prev - The previous position.
   * @param next - The next position.
   * @returns The step direction (-1, 0, 1).
   */
  private getStep(prev: number, next: number): number {
    if (prev === next) return 0;
    return next > prev ? 1 : -1;
  }

  /**
   * Checks if the path is clear for a piece to move.
   * 
   * @returns Whether the path is clear.
   */
  private isPathClear(): boolean {
    const stepX = this.getStep(this.prevX, this.newX);
    const stepY = this.getStep(this.prevY, this.newY);

    let x = this.prevX + stepX;
    let y = this.prevY + stepY;

    // Check for obstacles in the path
    while (x !== this.newX || y !== this.newY) {
      if (this.board[y][x]) {
        console.warn(`Invalid move: path blocked at ${x}, ${y}`);
        return false;
      }
      x += stepX;
      y += stepY;
    }
    return true;
  }

  /**
   * Validates a pawn move.
   *
   * @param isWhite - Whether the pawn is white or black.
   * @returns Whether the move is valid.
   */
  private validatePawn(isWhite = true): boolean {
    // Determine the direction of movement based on the pawn's color
    const dir = isWhite ? 1 : -1;
    const startRow = isWhite ? 1 : 6;

    // Single move logic
    if (this.prevX === this.newX && this.newY - this.prevY === dir && !this.destPiece) return true;

    // Double move logic from starting row
    if (this.prevX === this.newX && this.prevY === startRow && this.newY - this.prevY === 2 * dir) {
      if (!this.destPiece) {
        // Check the intermediate square for a blockage
        const intermediateY = this.prevY + dir;
        if (this.board[intermediateY][this.prevX]) {
          console.warn(`Invalid move: path blocked at ${this.prevX}, ${intermediateY}`);
          return false; // path blocked
        }
        return true;
      }
    }

    // Capture diagonally
    if (Math.abs(this.newX - this.prevX) === 1 && this.newY - this.prevY === dir && this.destPiece) return true;

    return false;
  }

  /**
   * Validates a bishop move.
   *
   * @returns Whether the move is valid.
   */
  private validateBishop() {
    // Check for valid diagonal movement
    if (Math.abs(this.newX - this.prevX) !== Math.abs(this.newY - this.prevY)) return false;
    return this.isPathClear();
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
   * @returns Whether the move is valid.
   */
  private validateRook() {
    // Check for valid horizontal or vertical movement
    if (this.prevX !== this.newX && this.prevY !== this.newY) return false;
    return this.isPathClear();
  }

  /**
   * Validates a queen move.
   * Uses both rook and bishop movement rules.
   *
   * @returns Whether the move is valid.
   */
  private validateQueen() {
    // Queens move like both rooks and bishops
    return this.validateRook() || this.validateBishop();
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
