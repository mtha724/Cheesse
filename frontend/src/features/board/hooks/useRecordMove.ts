import { useMoveLog } from '../../history/moveLogStore';

export function useRecordMove() {
    const { addMove } = useMoveLog();
    
    return (from: string, to: string, piece: string) => {
        const [pieceName, color] = piece.split('_');
        // Use standard chess notation:
        // P = pawn (implicit), N = knight, B = bishop, R = rook, Q = queen, K = king
        let pieceSymbol = '';
        switch (pieceName) {
            case 'knight': pieceSymbol = 'N'; break;
            case 'bishop': pieceSymbol = 'B'; break;
            case 'rook': pieceSymbol = 'R'; break;
            case 'queen': pieceSymbol = 'Q'; break;
            case 'king': pieceSymbol = 'K'; break;
            // Pawns don't have a symbol in standard notation
            default: pieceSymbol = '';
        }
        const moveNotation = `${pieceSymbol}${to}`;
        addMove(moveNotation);
    };
}
