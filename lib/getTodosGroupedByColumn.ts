import { databases } from "@/appwrite";

export const getTodosGroupedByColumn = async() => {
    const data = await databases.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID!,
        process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!
    );

    const todos = data.documents;

    const blank_cols = new Map<TypeColumn, Column>;
    const columnTypes: TypeColumn[] = ["todo", "in-progress", "done"];
    for (const curr_col of columnTypes){
        blank_cols.set(curr_col, {id: curr_col, todos: [],});
    }

    const cols = todos.reduce((acc, todo) => {
        /*if (!acc.get(todo.Status)){
            acc.set(todo.Status, {id: todo.Status, todos: [],});
        }
        */
        acc.get(todo.Status)!.todos.push({
            $id: todo.$id,
            $createdAt: todo.$createdAt,
            title: todo.Title,
            status: todo.Status,
            ...(todo.Image && {image: JSON.parse(todo.Image)})
        });
        return acc;
    }, blank_cols);

    const board: Board = {
        columns: cols
    }
    return board;
};