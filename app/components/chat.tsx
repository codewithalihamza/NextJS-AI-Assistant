"use client";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeRaw from "rehype-raw";
import { useChat } from "../hooks/useChat";
import { LoadingSkeleton } from "./LoadingSkeleton";

export default function Chat() {
  const { messages, input, setInput, handleSendMessage, loading, streamingMessage } = useChat();

  return (
    <div className="mx-auto flex h-screen max-w-7xl flex-col justify-between p-4">
      {/* Chat Display */}
      <div className="flex flex-grow flex-col space-y-4 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`max-w-[80%] rounded-md p-3 ${message.role === "user"
              ? "self-end bg-blue-500 text-white"
              : "self-start bg-white text-black"
              }`}
          >
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              components={{
                code({ node, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return match ? (
                    <SyntaxHighlighter
                      style={oneDark as any}
                      language={match[1]}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        ))}

        {/* Loading Indicator - Show only when loading AND not streaming yet */}
        {loading && !streamingMessage && (
          <div className="w-full max-w-[80%] self-start">
            <LoadingSkeleton
              lines={7}
              height="h-3"
              width="w-full"
              animate={true}
              className="w-full"
            />
          </div>
        )}

        {/* Streaming Message */}
        {streamingMessage && (
          <div className="max-w-[80%] self-start rounded-md bg-white p-3 text-black">
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              components={{
                code({ node, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return match ? (
                    <SyntaxHighlighter
                      style={oneDark as any}
                      language={match[1]}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {streamingMessage.content}
            </ReactMarkdown>
          </div>
        )}
      </div>

      {/* Input Field */}
      <div className="mt-4 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          className="flex-1 rounded-l-md border p-2 focus:border-blue-500 focus:outline-none"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSendMessage}
          disabled={loading}
          className="ml-2 rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 disabled:bg-blue-300"
        >
          Send
        </button>
      </div>
    </div>
  );
}