interface Board {
    columns: Map<TypeColumn, Column>;
}

type TypeColumn = "todo" | "in-progress" | "done";

interface Column {
    id: TypeColumn;
    todos: ToDo[];
}

interface ToDo {
    $id: string;
    $createdAt: string;
    title: string;
    status: string;
    image?: Image; 
}

interface Image {
    bucketId: string;
    fileId: string;
}