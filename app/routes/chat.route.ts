import { NextResponse } from "next/server";
import { ChatCompletionMessage } from "../interface/chat.interface";

export async function POST(request: Request) {
    const { prompt, sessionId }: ChatCompletionMessage = await request.json();

    // Simulate backend response
    const result = `AI Response to: ${prompt}`;
    const newSessionId = sessionId || Math.random().toString(36).substring(7);

    return NextResponse.json({ result, sessionId: newSessionId });
}