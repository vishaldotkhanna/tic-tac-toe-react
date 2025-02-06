import { EMPTY_SYMBOL } from "../util/constants";
import { CellValue, UpdateBoardState } from "../util/types";


export default function Cell({ cellValue, updateBoardState, isGameInProgress }: {cellValue: CellValue, updateBoardState: UpdateBoardState, isGameInProgress: boolean}) {
    const isDisabled = cellValue.symbol != EMPTY_SYMBOL || !isGameInProgress;
    const className = `cell ${cellValue.isWinCell ? 'win-cell' : ''}`

    return (
        <button className={className} onClick={() => updateBoardState(cellValue.id)} disabled={isDisabled}>{cellValue.symbol}</button>
    );
}