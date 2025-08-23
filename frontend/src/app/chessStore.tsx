import { createContext, useContext, useState, useMemo } from 'react';
import type { ReactNode } from 'react';

interface ChessMove {
    white?: string;
    black?: string;
}

interface ChessState {
    moveHistory: readonly ChessMove[];
    currentMove: number;
    addMove: (move: string) => void;
}

const ChessContext = createContext<ChessState | null>(null);

export function ChessProvider({ children }: { children: ReactNode }): JSX.Element {
    const [moveHistory, setMoveHistory] = useState<ChessMove[]>([]);
    const [currentMove, setCurrentMove] = useState(0);

    const addMove = (move: string) => {
        setMoveHistory(prev => {
            const lastMove = prev[prev.length - 1];
            
            // If we have a last move and it doesn't have a black move yet
            if (lastMove && !lastMove.black) {
                // Add black move to the last pair
                return [
                    ...prev.slice(0, -1),
                    { ...lastMove, black: move }
                ];
            }
            
            // Start a new move pair with white's move
            return [...prev, { white: move }];
        });
        setCurrentMove(prev => prev + 1);
    };

    const value = useMemo(() => ({ 
        moveHistory, 
        addMove 
    }), [moveHistory]);

    return (
        <ChessContext.Provider value={value}>
            {children}
        </ChessContext.Provider>
    );
}

export function useChessStore(): ChessState {
    const context = useContext(ChessContext);
    if (context === null) {
        throw new Error('useChessStore must be used within a ChessProvider');
    }
    return context;
}
