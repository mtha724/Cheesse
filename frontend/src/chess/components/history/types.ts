export interface ChessMove {
    white?: string;
    black?: string;
}

export interface MoveLogState {
    moves: ChessMove[];
    addMove: (move: string) => void;
}
