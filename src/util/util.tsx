import { CellValue } from './types';
import { BOARD_SIZE, EMPTY_SYMBOL } from './constants';

export function getInitCellVals(): CellValue[] {
    return Array.from({ length: BOARD_SIZE * BOARD_SIZE }, (_, idx) => ({ id: idx, symbol: EMPTY_SYMBOL, isWinCell: false }));
}


export function getWinConditionCheckIndexes() {
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
