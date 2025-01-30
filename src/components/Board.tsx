import { CellValue, UpdateBoardState } from "./types";
import Cell from './Cell';


export default function Board({ cellVals, updateBoardState }: {cellVals: Array<CellValue>, updateBoardState: UpdateBoardState}) {
    const cellComponents = cellVals.map((cellVal) => <Cell key={cellVal.id} cellValue={cellVal} updateBoardState={updateBoardState} />)
        

    console.log('board ', cellVals)

    return (
        <div id='board'>
            {cellComponents}
        </div>
    );
}