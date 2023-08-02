import { databases, storage } from '@/appwrite';
import { getTodosGroupedByColumn } from '@/lib/getTodosGroupedByColumn';
import { create } from 'zustand'

interface BoardState {
    board : Board;
    getBoard: () => void;
    setBoardState: (board : Board) => void;
    updateTodoInDB: (todo: ToDo, columnId: TypeColumn) => void;
    searchString: string;
    setSearchString: (searchString: string) => void;
    deleteTask: (todo: ToDo, taskIndex: number, id: TypeColumn) => void;
}

export const useBoardStore = create<BoardState>((set, get) => ({
  board: {
    columns: new Map<TypeColumn, Column>(), 
  },
  searchString: "",
  setSearchString: (searchString) => set({searchString}),
  getBoard: async() => {
    const board = await getTodosGroupedByColumn();
    set({ board });
  },
  setBoardState: (board) => set({board}),
  updateTodoInDB: async(todo, columnId) => {
    await databases.updateDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID!, 
        process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
        todo.$id,
        {
            Title: todo.title,
            Status: columnId,
        })
  },
  deleteTask: async(todo: ToDo, taskIndex: number, id: TypeColumn) => {
    const modifiedCols = new Map(get().board.columns);
    modifiedCols.get(id)?.todos.splice(taskIndex, 1);
    set({board: {columns: modifiedCols}});

    if(todo.image){
      await storage.deleteFile(todo.image.bucketId, todo.image.fileId);
    }

    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id,
    );
  },
}))