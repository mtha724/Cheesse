/** This is the game move log sidebar component */

// ---------------- Imports ---------------- //
import './GameMoveLogSidebar.css';
import MoveList from '../history/MoveList';
import { useMoveLog } from '../history/moveLogStore';

/**
 * GameMoveLogSidebar component - Displays the game move log sidebar.
 * @returns {JSX.Element} - The rendered component.
 */
export default function GameMoveLogSidebar() {
  const { moves } = useMoveLog();

  // Render the move log sidebar
  return (
    <div className="game-log-wrapper">
      <div className="game-move-log-sidebar">
        <h1 className="move-log-lbl">Move Log</h1>
        <div className="move-log-wrapper">
          <MoveList moves={moves} />
        </div>
      </div>
    </div>
  );
}