"use client";

import { useState } from "react";
import { sendMessage } from "../api/create-chat.api";
import { Message } from "../interface/chat.interface";

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState<Message | null>(null);

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      setStreamingMessage({ role: "assistant", content: "" });

      const aiResponse = await sendMessage(input);
      const chars = aiResponse.split("");
      const batchSize = 3; // Process 3 characters at a time for faster streaming

      // Stream in batches
      for (let i = 0; i < chars.length; i += batchSize) {
        await new Promise(resolve => setTimeout(resolve, 10)); // Faster timeout
        const batch = chars.slice(i, i + batchSize).join("");
        setStreamingMessage(prev =>
          prev ? { ...prev, content: prev.content + batch } : null
        );
      }

      setMessages(prev => [...prev, { role: "assistant", content: aiResponse }]);
      setStreamingMessage(null);
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
    streamingMessage,
  };
};
