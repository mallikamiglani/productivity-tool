import openai from "@/openai";
import { NextResponse } from "next/server";

export async function POST(request: Request){
    console.log("Checkpoint 1");
    const {todos} = await request.json();
    console.log("TODOS FROM ROUTE HERE:", todos);

    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        temperature: 0.8,
        n: 1,
        stream: false,
        messages: [
            {
                role: 'system',
                content: `When responding, act as user's productivity assistant. Limit response to 200 characters`,
            },
            {
                role: 'user',
                content: `Using ${JSON.stringify(todos)}, summarize number of todos by category like todo, in progress, and done. Cheerfully give user a relevant productivity tip or motivate them - use emojis.`,
            },
        ],
    })

    const {data} = response;

    console.log("Data is:", data);
    console.log("Message:", data.choices[0].message);

    return NextResponse.json(data.choices[0].message);
}