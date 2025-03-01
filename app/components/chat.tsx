'use client'
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeRaw from "rehype-raw";
import { useChat } from "../hooks/useChat";

export default function Chat() {
    const { messages, input, setInput, handleSendMessage } = useChat();

    return (
        <div className="h-screen flex flex-col justify-between p-4 max-w-7xl mx-auto">
            {/* Chat Display */}
            <div className="flex flex-col space-y-4 overflow-y-auto flex-grow p-4">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`p-3 rounded-md max-w-[80%] ${message.role === "user"
                            ? "bg-blue-500 text-white self-end"
                            : "bg-white text-black self-start"
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
                                            PreTag="div"
                                            {...props}
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
            </div>

            {/* Input Field */}
            <div className="flex mt-4">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1 p-2"
                    placeholder="Type a message..."
                />
                <button
                    onClick={handleSendMessage}
                    className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                    Send
                </button>
            </div>
        </div>
    );
}