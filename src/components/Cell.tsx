import { CellValue, UpdateBoardState } from "./types";


export default function Cell({ cellValue, updateBoardState }: {cellValue: CellValue, updateBoardState: UpdateBoardState}) {
    const isDisabled = cellValue.symbol != 'B';

    return (
        <div onClick={isDisabled ? null : () => updateBoardState(cellValue.id)}>{cellValue.symbol}</div>
    );
}