import { CellValue } from './types';
import { boardSize, EMPTY_SYMBOL } from './constants';

export function getInitCellVals(boardSize: number): CellValue[] {
    return Array.from({ length: boardSize * boardSize }, (_, idx) => ({ id: idx, symbol: EMPTY_SYMBOL, isWinCell: false }));
}


export function getWinConditionCheckIndexes(boardSize: number) {
    const mainDiagonalIndexes = [];
    for (let diagonalIdx = 0; diagonalIdx < boardSize * boardSize; diagonalIdx += (boardSize + 1)) {
        mainDiagonalIndexes.push(diagonalIdx);
    }

    const antiDiagonalIndexes = [];
    for (let diagonalIdx = boardSize - 1; diagonalIdx < boardSize * boardSize - 1; diagonalIdx += (boardSize - 1)) {
        antiDiagonalIndexes.push(diagonalIdx);
    }

    const winIndexes = [mainDiagonalIndexes, antiDiagonalIndexes];

    for (let rowStartIdx = 0; rowStartIdx < boardSize * boardSize; rowStartIdx += boardSize) {
        const rowWinIndexes = [];

        for (let colIdx = rowStartIdx; colIdx < rowStartIdx + boardSize; colIdx++) {
            rowWinIndexes.push(colIdx);
        }

        winIndexes.push(rowWinIndexes);
    }

    for (let colStartIdx = 0; colStartIdx < boardSize; colStartIdx++) {
        const colWinIndexes = [];

        for (let rowIdx = colStartIdx; rowIdx < boardSize * boardSize; rowIdx += boardSize) {
            colWinIndexes.push(rowIdx);
        }

        winIndexes.push(colWinIndexes);
    }

    return winIndexes;
}
