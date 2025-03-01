'use client'
import { useState } from "react";
import { sendMessage } from "../api/create-chat.api";
import { Message } from "../interface/chat.interface";


export const useChat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        // Add user message to UI
        const userMessage: Message = { role: "user", content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");

        try {
            // Send request to backend
            const aiResponse = await sendMessage(input);

            // Add AI response to UI
            const aiMessage: Message = { role: "assistant", content: aiResponse };
            setMessages((prev) => [...prev, aiMessage]);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return {
        messages,
        input,
        setInput,
        handleSendMessage,
    };
};