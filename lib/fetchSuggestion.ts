import Column from "@/components/Column";

const formatTodosForAI = (board: Board) => {
    const todos = Array.from(board.columns.entries());
    const flatTodos = todos.reduce((map, [key, val]) => {
        map[key] = val.todos;
        return map;
    }, {} as {[key in TypeColumn]: ToDo[]});
    const flatFrequency = Object.entries(flatTodos).reduce((map, [key, val]) => {
        map[key as TypeColumn] = val.length;
        return map;
    }, {} as {[key in TypeColumn]: number});

    return flatFrequency;
}

const fetchSuggestion = async(board: Board) => {
    const todos = formatTodosForAI(board);
    const res = await fetch("/api/generateSummary", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
        },
        body: JSON.stringify({todos}),
    });
    const GPTdata = await res.json();
    const {content} = GPTdata;
    return content;
};

export default fetchSuggestion;