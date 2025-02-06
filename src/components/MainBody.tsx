import Board from './Board.tsx'
import GameStateInfo from './GameStateInfo';
import { useRef, useState } from "react";
import { UpdateBoardState, GameState } from '../util/types';
import { BOARD_SIZE, EMPTY_SYMBOL, PLAYERS } from '../util/constants';
import PlayerInfo from './PlayerInfo';
import { getInitCellVals, getWinConditionCheckIndexes } from '../util/util';


export default function MainBody() {
    const [cellVals, setCellVals] = useState(getInitCellVals());
    const [activePlayerId, setActivePlayerId] = useState(0)
    //const [isGameInProgress, setIsGameInProgress] = useState(false);
    const [boardHistory, setBoardHistory] = useState<number[]>([]);
    // const [gameStatus, setGameStatus] = useState('');
    // const [winningPlayerId, setWinningPlayerId] = useState(-1);
    const [gameState, setGameState] = useState(GameState.IN_PROGRESS);
    const winConditionCheckIndexes = useRef(getWinConditionCheckIndexes());

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

            // setWinningPlayerId(activePlayerId);
            // setGameStatus(getGameStatusMessage(activePlayerId));
            // setIsGameInProgress(false);

            setGameState(activePlayerId == 0 ? GameState.PLAYER_1_WIN : GameState.PLAYER_2_WIN);
        } else if (boardHistory.length == BOARD_SIZE * BOARD_SIZE - 1) {
            // setGameStatus(getGameStatusMessage(null));
            // setIsGameInProgress(false);

            setGameState(GameState.DRAW)
        } else {
            toggleActivePlayer();
            // setIsGameInProgress(true);

            setGameState(GameState.IN_PROGRESS)
        }
    };

    function resetBoard() {
        setCellVals(getInitCellVals());
        setBoardHistory([]);
        // setActivePlayerId(0);
        // setIsGameInProgress(false);
        setGameState(GameState.IN_PROGRESS);
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

            <Board cellVals={cellVals} updateBoardState={updateBoardState} isGameInProgress={gameState === GameState.IN_PROGRESS} />

            <GameStateInfo gameState={gameState} />

            <div id='action-bar'>
                <PlayerInfo key={0} id={0} isActive={activePlayerId === 0} isWinner={gameState === GameState.PLAYER_1_WIN} />

                <button onClick={resetBoard}>{gameState == GameState.IN_PROGRESS ? 'Reset' : 'Start'}</button>

                <button onClick={undoLastMove} disabled={gameState != GameState.IN_PROGRESS}>Undo</button>

                <PlayerInfo key={1} id={1} isActive={activePlayerId === 1} isWinner={gameState === GameState.PLAYER_2_WIN} />
            </div>
        </div>
    );
}