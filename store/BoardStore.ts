import { ID, databases, storage } from '@/appwrite';
import { getTodosGroupedByColumn } from '@/lib/getTodosGroupedByColumn';
import uploadImage from '@/lib/uploadImage';
import { create } from 'zustand'

interface BoardState {
    board : Board;
    getBoard: () => void;
    setBoardState: (board : Board) => void;
    updateTodoInDB: (todo: ToDo, columnId: TypeColumn) => void;
    searchString: string;
    setSearchString: (searchString: string) => void;
    deleteTask: (todo: ToDo, taskIndex: number, id: TypeColumn) => void;
    newTaskInput: string;
    setNewTaskInput: (input: string) => void;
    newTaskType: TypeColumn;
    setNewTaskType: (taskType: TypeColumn) => void;
    image: File | null;
    setImage: (image: File | null) => void;
    addTask: (todo: string, columnId: TypeColumn, image?: File | null) => void;
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

  newTaskInput: "",
  setNewTaskInput: (input: string) => set({newTaskInput: input}),

  newTaskType: "todo",
  setNewTaskType: (taskType: TypeColumn) => set({newTaskType: taskType}),

  image: null,
  setImage: (image: File | null) => set({image}),

  addTask: async (todo: string, columnId: TypeColumn, image?: File | null) => {
    let file: Image | undefined;

    if (image) {
      const fileUploaded = await uploadImage(image);
      if (fileUploaded) {
        file = {
          bucketId: fileUploaded.bucketId,
          fileId: fileUploaded.$id,
        }
      }
    }

    const {$id} = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      ID.unique(),
      {
        Title: todo,
        Status: columnId,
        ...(file && {Image: JSON.stringify(file)}),
      }
    );

    set({newTaskInput: ''});
    set((state) => {
      const newColumns = new Map(state.board.columns);
      const newTodo: ToDo = {
        $id, 
        $createdAt: new Date().toISOString(), 
        title: todo, 
        status: columnId, 
        ...(file && {image: file}),
      };
      const column =newColumns.get(columnId);
      if (!column) {
        newColumns.set(columnId, {
          id: columnId,
          todos: [newTodo],
        });
      }
      else{
        newColumns.get(columnId)?.todos.push(newTodo);
      }

      return {
        board : {columns: newColumns}
      }
    });
  }
}));