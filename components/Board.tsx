'use client'

import { useBoardStore } from '@/store/BoardStore';
import { useEffect } from 'react';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import Column from './Column';

function Board() {

    const [board, getBoard, setBoardState, updateTodoInDB] = useBoardStore((state) => [
        state.board, 
        state.getBoard, 
        state.setBoardState, 
        state.updateTodoInDB]);
    useEffect(() => {
        getBoard()
    }, [getBoard]);

    // droppable id = index of draggable area, index = index within droppable id
    const handleOnDragEnd = (result: DropResult) => {
        const {destination, source, type} = result;

        // if dragged outside board
        if (!destination) return;

        // column dragged
        if(type == 'Column'){
            const originalColumns = Array.from(board.columns.entries());
            const [moved] = originalColumns.splice(source.index, 1);
            originalColumns.splice(destination.index, 0, moved);
            setBoardState({ ...board, columns: new Map(originalColumns)});
        }
        // card dragged
        else{
            const sourceCol = Number(source.droppableId);
            const destCol = Number(destination.droppableId);

            const indexInSourceCol = source.index;
            const indexInDestCol = destination.index;

            // moved to invalid place / not moved at all
            if (source.droppableId == null || destination.droppableId == null 
                || (sourceCol == destCol && indexInSourceCol == indexInDestCol)) 
                return;

            // changing card order
            const cardOrder = Array.from(board.columns.entries());
            const [moved] = cardOrder[sourceCol][1].todos.splice(indexInSourceCol, 1);
            cardOrder[destCol][1].todos.splice(indexInDestCol, 0, moved);
            setBoardState({...board, columns: new Map(cardOrder)});

            // update status in database
            updateTodoInDB(moved, cardOrder[destCol][0]);
        }
    }

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId='board' direction='horizontal' type='Column'>
            {(provided) =>
                <div 
                    {...provided.droppableProps} 
                    ref={provided.innerRef} 
                    className='grid grid=cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto'
                >   {
                    Array.from(board.columns.entries()).map(([id, column], index) => (
                        <Column
                            key={id}
                            id={id}
                            todos={column.todos}
                            index={index}
                        />
                    ))
                    }
                </div>
            }
        </Droppable>
        </DragDropContext>
    );
}

export default Board

