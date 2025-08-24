/**
 * Main game page layout. Renders the board and sidebars.
 * @module GamePage
 */

// ---------------- Imports ---------------- //
import "./GamePage.css";
import Board from '../features/board/components/Board';
import GameMoveLogSidebar from '../features/controls/GameMoveLogSidebar';
import GameOptionsSidebar from '../features/controls/GameOptionsSidebar';

/**
 * GamePage component - main container for the chess game UI.
 * @returns {JSX.Element}
 */
export default function GamePage() {
  return (
    <div className="game-page-div">
      <GameMoveLogSidebar />
      <Board />
      <GameOptionsSidebar />
    </div>
  );
}
