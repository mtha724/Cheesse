// src/pages/GamePage.tsx
import "./GamePage.css"
import Board from '../features/board/components/Board';
import GameMoveLogSidebar from '../features/controls/GameMoveLogSidebar'
import GameOptionsSidebar from '../features/controls/GameOptionsSidebar'

export default function GamePage() {
    return (
     <div className="game-page-div">
      <GameMoveLogSidebar />
      <Board />
      <GameOptionsSidebar />
    </div>
  );
}
