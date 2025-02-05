import { CellValue, UpdateBoardState } from "./types";
import Cell from './Cell';


export default function Board({ cellVals, updateBoardState }: {cellVals: CellValue[], updateBoardState: UpdateBoardState}) {
    const cellComponents = cellVals.map((cellVal) => <Cell key={cellVal.id} cellValue={cellVal} updateBoardState={updateBoardState} />);

    return (
        <div id='board'>
            {cellComponents}
        </div>
    );
}