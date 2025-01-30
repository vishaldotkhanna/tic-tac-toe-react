import Board from './Board.tsx'
import { useState } from "react";
import { CellValue, UpdateBoardState } from './types';


const BOARD_SIZE = 3;
const SYMBOL_O = 'O';
const SYMBOL_X = 'X';
const EMPTY_SYMBOL = 'B'

function getInitCellVals(): CellValue[] {
    return Array.from({length: BOARD_SIZE * BOARD_SIZE}, (_, idx) => ({id: idx, symbol: EMPTY_SYMBOL}));
}

export default function MainBody() {
    const [cellVals, setCellVals] = useState(getInitCellVals());
    const [curSymbol, setCurSymbol] = useState(SYMBOL_O);
    const [playerOneActive, setPlayerOneActive] = useState(true);
    const [isGameInProgress, setIsGameInProgress] = useState(false);
    
    const updateBoardState: UpdateBoardState = (cellId: number) => {
        let areAllCellsFilled = true;
        
        setCellVals((prevCellVals) => {
            const updatedCellVals = prevCellVals.map((prevCellVal) => {
                if (prevCellVal.id == cellId) {
                    return {...prevCellVal, symbol: curSymbol}
                } else {
                    if (prevCellVal.symbol == EMPTY_SYMBOL) {
                        areAllCellsFilled = false;
                    }

                    return prevCellVal;
                }
            });

            // check winning condition
            if (false) {
                console.log('win');
                setIsGameInProgress(false);
            } else if (areAllCellsFilled) {
                console.log('draw');
                setIsGameInProgress(false);
            } else {
                setIsGameInProgress(true);
            }

            return updatedCellVals;
        });

        setCurSymbol((prevCurSymbol) => prevCurSymbol == SYMBOL_O ? SYMBOL_X : SYMBOL_O);
        setPlayerOneActive((prevPlayerOneActive) => !prevPlayerOneActive);
    };

    function resetBoard() {
        setCellVals(getInitCellVals());
        setCurSymbol(SYMBOL_O);
        setPlayerOneActive(true);
        setIsGameInProgress(false);
    }
    

    return (
        <>
            <Board cellVals={cellVals} updateBoardState={updateBoardState} />

            <div id='action-bar'>
                <h3 id='player1-info' className={playerOneActive ? null : 'is-blurred'}>Player 1</h3>

                <button onClick={resetBoard}>{isGameInProgress ? 'Reset' : 'Start'}</button>

                <h3 id='player1-info' className={playerOneActive ? 'is-blurred' : null}>Player 2</h3>
            </div>
        </>
    );
}