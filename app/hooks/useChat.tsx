"use client";

import { useState } from "react";
import { sendMessage } from "../api/create-chat.api";
import { Message } from "../interface/chat.interface";

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return; // Prevent sending if already loading

    // Add user message to UI
    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Send request to backend
      const aiResponse = await sendMessage(input);

      // Add AI response to UI
      const aiMessage: Message = { role: "assistant", content: aiResponse };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    input,
    setInput,
    handleSendMessage,
    loading,
  };
};
