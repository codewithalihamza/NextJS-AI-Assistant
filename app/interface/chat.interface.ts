export interface ChatCompletionMessage {
  prompt: string;
  sessionId?: string | null;
}

export interface Message {
  role: "user" | "assistant";
  content: string;
}
