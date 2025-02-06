import { CellValue, UpdateBoardState } from "../util/types";
import Cell from './Cell';


export default function Board({ cellVals, updateBoardState, isGameInProgress, boardSize }: 
    { cellVals: CellValue[], updateBoardState: UpdateBoardState, isGameInProgress: boolean, boardSize: number }) {
    const cellComponents = cellVals.map((cellVal) => <Cell key={cellVal.id} cellValue={cellVal} updateBoardState={updateBoardState} isGameInProgress={isGameInProgress} />);

    return (
        <div id='board' style={{"--board-size": boardSize}}>
            {cellComponents}
        </div>
    );
}