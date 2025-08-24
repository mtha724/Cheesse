/* This component displays the list of moves made in the chess game. */

// ---------------- Imports ---------------- //
import type { CSSProperties } from 'react';
import './MoveList.css';

/**
 * Represents a chess move in the move log.
 *
 * @param {string} white - The white player's move.
 * @param {string} black - The black player's move.
 */
interface ChessMove {
  white?: string;
  black?: string;
}

/**
 * Props for the MoveList component.
 *
 * @param {readonly ChessMove[]} moves - The list of chess moves.
 * @param {CSSProperties} [style] - Optional inline styles for the component.
 */
interface MoveListProps {
  readonly moves: readonly ChessMove[];
  readonly style?: CSSProperties;
}

/**
 * MoveList component - Displays a list of chess moves.
 *
 * @param {Readonly<MoveListProps>} - The props for the component.
 * @returns {JSX.Element} - The rendered component.
 */
export default function MoveList({ moves = [], style }: Readonly<MoveListProps>) {
  return (
    // Render the move list container
    <div className="move-list" style={style}>
      {moves.map((movePair, index) => (
        <div key={`move-${index + 1}`} className="move-entry">
          <span className="move-number">{index + 1}.</span>
          <span className="move-text white">{movePair.white || ''}</span>
          {/* Only render black move cell if it exists */}
          {movePair.black && (
            <span className="move-text black">{movePair.black}</span>
          )}
          {/* Add an empty span to maintain grid layout when no black move */}
          {!movePair.black && <span />}
        </div>
      ))}
    </div>
  );
}