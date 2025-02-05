import { EMPTY_SYMBOL } from "./constants";
import { CellValue, UpdateBoardState } from "./types";


export default function Cell({ cellValue, updateBoardState }: {cellValue: CellValue, updateBoardState: UpdateBoardState}) {
    const isDisabled = cellValue.symbol != EMPTY_SYMBOL;
    const className = `cell ${cellValue.isWinCell ? 'win-cell' : null}`

    return (
        <button className={className} onClick={() => updateBoardState(cellValue.id)} disabled={isDisabled}>{cellValue.symbol}</button>
    );
}