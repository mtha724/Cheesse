/* This utility file provides helper methods for chess-related calculations. */

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