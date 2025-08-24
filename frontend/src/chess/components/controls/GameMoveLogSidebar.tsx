import './GameMoveLogSidebar.css';
import MoveList from '../history/MoveList';
import { useMoveLog } from '../history/moveLogStore';

export default function GameMoveLogSidebar() {
  const { moves } = useMoveLog();

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