import React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'

type Props = {
    id: TypeColumn,
    todos: ToDo[],
    index: number
}

const idToColumnHeader: {
    [key in TypeColumn]: string;
} = {
    "todo": "To Do",
    "in-progress": "In Progress",
    "done": "Done",
}
function Column({id, todos, index}:Props) {
  return (
    <Draggable draggableId={id} index={index}>
        {(provided) => (
            <div 
            {...provided.draggableProps} 
            {...provided.dragHandleProps} 
            ref={provided.innerRef}>
                {/*droppable elems in column here*/}
                <Droppable droppableId={index.toString()} type='card'>
                    {(provided, snapshot) => (
                        <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`p-2 rounded-2xl shadow-sm ${
                            snapshot.isDraggingOver ? "bg-green-200" : "bg-white/50"
                        }`}>
                            <h2 className='flex justify-between font-bold text-xl p-2 text-gray-800'>
                                {idToColumnHeader[id]}
                                <span className='text-gray-500 bg-gray-200 rounded-full px-2.5 py-1 text-sm font-normal'>
                                    {todos.length}
                                </span>
                            </h2>
                        </div>
                    )}
                </Droppable>
            </div>
        )}
    </Draggable>
  )
}

export default Column