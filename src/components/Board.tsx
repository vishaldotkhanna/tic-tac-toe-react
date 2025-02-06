import { CellValue, UpdateBoardState } from "../util/types";
import Cell from './Cell';


export default function Board({ cellVals, updateBoardState, isGameInProgress }: {cellVals: CellValue[], updateBoardState: UpdateBoardState, isGameInProgress: boolean}) {
    const cellComponents = cellVals.map((cellVal) => <Cell key={cellVal.id} cellValue={cellVal} updateBoardState={updateBoardState} isGameInProgress={isGameInProgress} />);

    return (
        <div id='board'>
            {cellComponents}
        </div>
    );
}