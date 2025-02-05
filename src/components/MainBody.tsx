import Board from './Board.tsx'
import { useEffect, useRef, useState } from "react";
import { CellValue, UpdateBoardState } from './types';
import { BOARD_SIZE, EMPTY_SYMBOL, PLAYERS, SYMBOL_O } from './constants';
import PlayerInfo from './PlayerInfo';


function getInitCellVals(): CellValue[] {
    return Array.from({length: BOARD_SIZE * BOARD_SIZE}, (_, idx) => ({id: idx, symbol: EMPTY_SYMBOL, isWinCell: false}));
}


function getWinIndexes() {
    const mainDiagonalIndexes = [];
    for (let diagonalIdx = 0; diagonalIdx < BOARD_SIZE * BOARD_SIZE; diagonalIdx += (BOARD_SIZE + 1)) {
        mainDiagonalIndexes.push(diagonalIdx);
    }

    const antiDiagonalIndexes = [];
    for (let diagonalIdx = BOARD_SIZE - 1; diagonalIdx < BOARD_SIZE * BOARD_SIZE - 1; diagonalIdx += (BOARD_SIZE - 1)) {
        antiDiagonalIndexes.push(diagonalIdx);
    }

    const winIndexes = [mainDiagonalIndexes, antiDiagonalIndexes];

    for (let rowStartIdx = 0; rowStartIdx < BOARD_SIZE * BOARD_SIZE; rowStartIdx += BOARD_SIZE) {
        const rowWinIndexes = [];

        for (let colIdx = rowStartIdx; colIdx < rowStartIdx + BOARD_SIZE; colIdx++) {
            rowWinIndexes.push(colIdx);
        }

        winIndexes.push(rowWinIndexes);
    }

    for (let colStartIdx = 0; colStartIdx < BOARD_SIZE; colStartIdx++) {
        const colWinIndexes = [];

        for (let rowIdx = colStartIdx; rowIdx < BOARD_SIZE * BOARD_SIZE; rowIdx += BOARD_SIZE) {
            colWinIndexes.push(rowIdx);
        }

        winIndexes.push(colWinIndexes);
    }

    return winIndexes;
}


export default function MainBody() {
    const [cellVals, setCellVals] = useState(getInitCellVals());
    const [activePlayerId, setActivePlayerId] = useState(0)
    const [isGameInProgress, setIsGameInProgress] = useState(false);
    const [boardHistory, setBoardHistory] = useState<number[]>([]);
    const winIndexes = useRef(getWinIndexes());

    function getCurSymbol() {
        return PLAYERS[activePlayerId].symbol;
    }

    function updateCellSymbol(cellId: number, symbol?: string) {
        setCellVals(prevCellVals => prevCellVals.map(prevCellVal => {
            if (prevCellVal.id == cellId) {
                return {...prevCellVal, symbol: symbol != null ? symbol : getCurSymbol()}
            } else {
                return prevCellVal;
            }
        }))
    }

    function getWinner(lastMoveCellId: number, lastMovePlayerId: number) {
        for (const winIndexesArr of winIndexes.current) {
            if (cellVals[winIndexesArr[0]].symbol == EMPTY_SYMBOL || !winIndexesArr.includes(lastMoveCellId)) {
                continue;
            }
    
            let isWin = true;
            for (const winIndex of winIndexesArr) {
                if (winIndex != lastMoveCellId && cellVals[winIndex].symbol != PLAYERS[lastMovePlayerId].symbol) {
                    isWin = false;
                    break;
                }
            }
    
            if (isWin) {
                return winIndexesArr;
            }
    
        }
    
        return null;
    }

    function toggleActivePlayer() {
        setActivePlayerId(prevActivePlayerId => (prevActivePlayerId + 1) % 2);
    }

    const updateBoardState: UpdateBoardState = (cellId: number) => {
        updateCellSymbol(cellId);
        setBoardHistory(prevBoardHistory => [...prevBoardHistory, cellId]);

        const winner = getWinner(cellId, activePlayerId);

        if (winner != null) {
            console.log('win ', winner);

            setCellVals(prevCellVals => {
                for (const winIdx of winner) {
                    prevCellVals[winIdx].isWinCell = true;
                }

                return prevCellVals;
            })

            setIsGameInProgress(false);
        } else if (boardHistory.length == BOARD_SIZE * BOARD_SIZE - 1) {
            console.log('draw');
            setIsGameInProgress(false);
        } else {
            toggleActivePlayer();
            setIsGameInProgress(true);
        }
    };
    
    //useEffect(checkGameEndConditions, cellVals);

    function resetBoard() {
        setCellVals(getInitCellVals());
        setBoardHistory([]);
        setActivePlayerId(0);
        setIsGameInProgress(false);
    }

    function undoLastMove() {
        if (boardHistory) {
            const lastUpdatedCellId = boardHistory[boardHistory.length - 1];
            updateCellSymbol(lastUpdatedCellId, EMPTY_SYMBOL);
            setBoardHistory((prevBoardHistory) => prevBoardHistory.slice(0, -1));
            toggleActivePlayer();
        }
    }
    

    return (
        <div id='main-body'>

            <Board cellVals={cellVals} updateBoardState={updateBoardState} />

            <div id='action-bar'>
                <PlayerInfo key={0} id={0} isActive={activePlayerId === 0} />

                <button onClick={resetBoard}>{isGameInProgress ? 'Reset' : 'Start'}</button>

                <button onClick={undoLastMove} disabled={!isGameInProgress}>Undo</button>

                <PlayerInfo key={1} id={1} isActive={activePlayerId === 1} />
            </div>
        </div>
    );
}