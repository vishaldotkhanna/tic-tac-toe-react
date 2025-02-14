

export type UpdateBoardState = (cellId: number) => void;
export type CellValue = {id: number, symbol: string, isWinCell: boolean};

export enum GameState {
    IN_PROGRESS,
    PLAYER_1_WIN,
    PLAYER_2_WIN,
    DRAW
}