'use client'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

function Board() {
    return (<div></div>) // delete when working on this file
    /*
    code commented out to allow compilation currently:
    
    return <DragDropContext>
    <Droppable droppableId='board' direction='horizontal' type='Column'>
        {(provided) =>
            <div>
                // Columns go here
            </div>
        }
    </Droppable>
    </DragDropContext>
    */
}

export default Board

