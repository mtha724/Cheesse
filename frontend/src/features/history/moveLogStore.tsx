import { createContext, useContext, useState, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { ChessMove, MoveLogState } from './types';

const MoveLogContext = createContext<MoveLogState | null>(null);

export function MoveLogProvider({ children }: { children: ReactNode }) {
    const [moves, setMoves] = useState<ChessMove[]>([]);

    const addMove = (move: string) => {
        setMoves(prev => {
            // If last move exists and doesn't have a black move
            if (prev.length > 0 && !prev[prev.length - 1].black) {
                return [
                    ...prev.slice(0, -1),
                    { ...prev[prev.length - 1], black: move }
                ];
            }
            
            // Start a new move pair with white's move
            return [...prev, { white: move }];
        });
    };

    const value = useMemo(() => ({
        moves,
        addMove
    }), [moves]);

    return (
        <MoveLogContext.Provider value={value}>
            {children}
        </MoveLogContext.Provider>
    );
}

export function useMoveLog(): MoveLogState {
    const context = useContext(MoveLogContext);
    if (!context) {
        throw new Error('useMoveLog must be used within a MoveLogProvider');
    }
    return context;
}
