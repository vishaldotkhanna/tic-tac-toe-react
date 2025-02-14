import Board from './Board.tsx'
import GameStateInfo from './GameStateInfo';
import { ChangeEvent, SyntheticEvent, useRef, useState } from "react";
import { UpdateBoardState, GameState } from '../util/types';
import { DEFAULT_BOARD_SIZE, EMPTY_SYMBOL, PLAYERS } from '../util/constants';
import PlayerInfo from './PlayerInfo';
import { getInitCellVals, getWinConditionCheckIndexes } from '../util/util';


export default function MainBody() {
    const [boardSize, setBoardSize] = useState(DEFAULT_BOARD_SIZE);
    const [cellVals, setCellVals] = useState(getInitCellVals(boardSize));
    const [activePlayerId, setActivePlayerId] = useState(0)
    const [boardHistory, setBoardHistory] = useState<number[]>([]);
    const [gameState, setGameState] = useState(GameState.IN_PROGRESS);
    const winConditionCheckIndexes = useRef(getWinConditionCheckIndexes(boardSize));

    function getCurSymbol() {
        return PLAYERS[activePlayerId].symbol;
    }

    function updateCellSymbol(cellId: number, symbol?: string) {
        setCellVals(prevCellVals => prevCellVals.map(prevCellVal => {
            if (prevCellVal.id == cellId) {
                return {...prevCellVal, symbol: symbol || getCurSymbol()}
            } else {
                return prevCellVal;
            }
        }))
    }

    function getWinningIndexes(lastMoveCellId: number, lastMovePlayerId: number) {
        for (const winIndexesArr of winConditionCheckIndexes.current) {
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

        const winningIndexes = getWinningIndexes(cellId, activePlayerId);

        if (winningIndexes != null) {
            setCellVals(prevCellVals => {
                for (const winIdx of winningIndexes) {
                    prevCellVals[winIdx].isWinCell = true;
                }

                return prevCellVals;
            })

            setGameState(activePlayerId == 0 ? GameState.PLAYER_1_WIN : GameState.PLAYER_2_WIN);
        } else if (boardHistory.length == boardSize * boardSize - 1) {
            setGameState(GameState.DRAW)
        } else {
            toggleActivePlayer();
            setGameState(GameState.IN_PROGRESS);
        }
    };

    function resetBoard(resetBoardSize: number) {
        setCellVals(getInitCellVals(resetBoardSize));
        setBoardHistory([]);
        setGameState(GameState.IN_PROGRESS);
        setActivePlayerId(0);
        winConditionCheckIndexes.current = getWinConditionCheckIndexes(resetBoardSize);
    }

    function undoLastMove() {
        if (boardHistory) {
            const lastUpdatedCellId = boardHistory[boardHistory.length - 1];
            updateCellSymbol(lastUpdatedCellId, EMPTY_SYMBOL);
            setBoardHistory((prevBoardHistory) => prevBoardHistory.slice(0, -1));
            toggleActivePlayer();
        }
    }

    function updateBoardSize(event: ChangeEvent<HTMLInputElement>) {
        if (!isNaN(event.target.valueAsNumber)) {
            setBoardSize(event.target.valueAsNumber);
            resetBoard(event.target.valueAsNumber);
        }
    }
    

    return (
        <div className="w-[80vw] h-[80vh] flex flex-col items-center gap-10">

            <Board cellVals={cellVals} updateBoardState={updateBoardState} isGameInProgress={gameState === GameState.IN_PROGRESS} boardSize={boardSize} />

            <GameStateInfo className="h-[20%]" gameState={gameState} />

            <div className="flex flex-row w-[100%] justify-center items-center gap-8 mt-4">
                <PlayerInfo key={0} id={0} isActive={activePlayerId === 0} isWinner={gameState === GameState.PLAYER_1_WIN} />

                <label for="board-size">Board Size:</label>
                <input type="number" id="board-size" name="board-size" min="3" max="8" step="1" value={boardSize} className="text-center" onChange={updateBoardSize} />

                <button onClick={() => resetBoard(boardSize)}>{gameState == GameState.IN_PROGRESS ? 'Reset' : 'Start'}</button>

                <button onClick={undoLastMove} disabled={gameState != GameState.IN_PROGRESS || boardHistory.length === 0} className="disabled:opacity-30 disabled:cursor-not-allowed">Undo</button>

                <PlayerInfo key={1} id={1} isActive={activePlayerId === 1} isWinner={gameState === GameState.PLAYER_2_WIN} />
            </div>
        </div>
    );
}