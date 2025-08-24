/* This is the game page component */

// ---------------- Imports ---------------- //
import "./GamePage.css";
import Board from "../chess/components/board/Board";
import GameMoveLogSidebar from '../chess/components/controls/GameMoveLogSidebar';
import GameOptionsSidebar from '../chess/components/controls/GameOptionsSidebar';

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
