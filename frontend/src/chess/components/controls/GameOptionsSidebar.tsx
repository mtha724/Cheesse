/* This is the game options sidebar component */
// ---------------- Imports ---------------- //
import './GameOptionsSidebar.css'

/**
 * GameOptionsSidebar component - Displays the game options sidebar.
 * @returns {JSX.Element} - The rendered component.
 */
export default function GameMoveLogSidebar() {
    return (
     <div className="game-options-wrapper">
      <div className="game-options-sidebar">
        <h1>Game Options</h1>
        <div className="button-col">
         <button>End Turn</button>
         <button>Undo</button>
         <button>Redo</button>
         <button>Forfeit</button>
        </div>
      </div>
    </div>
  );
}