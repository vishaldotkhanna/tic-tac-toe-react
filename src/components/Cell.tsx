import { EMPTY_SYMBOL } from "../util/constants";
import { CellValue, UpdateBoardState } from "../util/types";


export default function Cell({ cellValue, updateBoardState, isGameInProgress }: {cellValue: CellValue, updateBoardState: UpdateBoardState, isGameInProgress: boolean}) {
    const isDisabled = cellValue.symbol != EMPTY_SYMBOL || !isGameInProgress;
    const className = `w-20 h-20 disabled:cursor-not-allowed ${cellValue.isWinCell ? 'text-red-500' : ''}`;

    return (
        <button className={className} onClick={() => updateBoardState(cellValue.id)} disabled={isDisabled}>{cellValue.symbol}</button>
    );
}