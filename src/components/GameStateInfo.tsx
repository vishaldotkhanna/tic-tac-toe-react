import { GameState } from '../util/types';

export default function GameStateInfo({ gameState }: { gameState: GameState }) {
    let gameStatusMessage = '';

    if (gameState == GameState.PLAYER_1_WIN) {
        gameStatusMessage = "Player 1 wins.";
    } else if (gameState == GameState.PLAYER_2_WIN) {
        gameStatusMessage = "Player 2 wins.";
    } else if (gameState == GameState.DRAW) {
        gameStatusMessage = "It's a draw."
    }

    return (
        <div id='game-status'>{gameStatusMessage}</div>
    );
}