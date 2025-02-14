import { CellValue, UpdateBoardState } from "../util/types";
import Cell from './Cell';


export default function Board({ cellVals, updateBoardState, isGameInProgress, boardSize }: 
    { cellVals: CellValue[], updateBoardState: UpdateBoardState, isGameInProgress: boolean, boardSize: number }) {
    const cellComponents = cellVals.map((cellVal) => <Cell key={cellVal.id} cellValue={cellVal} updateBoardState={updateBoardState} isGameInProgress={isGameInProgress} />);

    return (
        <div className="w-[80%] h-[80%] flex items-center justify-center">
            <div className= "max-w-[100%] max-h-[100%] grid" style={{gridTemplateColumns: `repeat(${boardSize}, 1fr)`, gridTemplateRows: `repeat(${boardSize}, 1fr)`}}>
                {cellComponents}
            </div>
        </div>
    );
}

