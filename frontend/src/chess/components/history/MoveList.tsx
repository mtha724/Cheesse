import type { CSSProperties } from 'react';
import './MoveList.css';

interface ChessMove {
  white?: string;
  black?: string;
}

interface MoveListProps {
  readonly moves: readonly ChessMove[];
  readonly style?: CSSProperties;
}

export default function MoveList({ moves = [], style }: Readonly<MoveListProps>) {
  return (
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