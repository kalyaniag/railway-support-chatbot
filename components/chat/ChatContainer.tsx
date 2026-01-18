"use client";

import { useState, useEffect, useRef } from "react";
import { Message } from "@/types/chat";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import ChatInput from "./ChatInput";
import QuickActions from "./QuickActions";
import ClearChatButton from "./ClearChatButton";
import { detectIntent } from "@/lib/chatbot/intentDetector";
import { generateResponse } from "@/lib/chatbot/responseGenerator";
import { updateContext } from "@/lib/chatbot/conversationContext";

interface ChatContainerProps {
  isWidget?: boolean;
}

const CHAT_STORAGE_KEY = "irctc_chat_messages";

const saveMessagesToStorage = (messages: Message[]) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    } catch (error) {
      console.error("Failed to save messages:", error);
    }
  }
};

const loadMessagesFromStorage = (): Message[] => {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(CHAT_STORAGE_KEY);
      if (stored) {
        const messages = JSON.parse(stored) as Array<{
          id: string;
          role: "user" | "bot";
          content: string;
          timestamp: string;
          streaming?: boolean;
          link?: string;
          richContent?: unknown;
        }>;
        return messages.map((msg) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        })) as Message[];
      }
    } catch (error) {
      console.error("Failed to load messages:", error);
    }
  }
  return [];
};

export default function ChatContainer({
  isWidget = false,
}: ChatContainerProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

  useEffect(() => {
    const storedMessages = loadMessagesFromStorage();
    if (storedMessages.length > 0) {
      setMessages(storedMessages);
      setShowWelcome(false);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded && messages.length > 0) {
      saveMessagesToStorage(messages);
    }
  }, [messages, isLoaded]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Check if user is at bottom of scroll
  const checkIfAtBottom = () => {
    if (!chatContainerRef.current) return true;
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    const threshold = 100; // pixels from bottom
    return scrollHeight - scrollTop - clientHeight < threshold;
  };

  // Handle scroll events to detect manual scrolling
  const handleScroll = () => {
    const isAtBottom = checkIfAtBottom();
    setShouldAutoScroll(isAtBottom);
  };

  useEffect(() => {
    if (shouldAutoScroll) {
      scrollToBottom();
    }
  }, [messages, isTyping, shouldAutoScroll]);

  const simulateStreaming = (
    text: string,
    callback: (chunk: string) => void,
  ) => {
    let index = 0;
    const words = text.split(" ");

    const streamInterval = setInterval(() => {
      if (index < words.length) {
        callback(words.slice(0, index + 1).join(" "));
        index++;
      } else {
        clearInterval(streamInterval);
      }
    }, 50);

    return () => clearInterval(streamInterval);
  };

  const handleSendMessage = async (userMessage: string) => {
    if (!userMessage.trim()) return;

    setShowWelcome(false);
    setShouldAutoScroll(true); // Always auto-scroll when user sends a message

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      // Call AI-powered API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: messages.slice(-20).map((msg) => ({
            text: msg.content,
            isBot: msg.role === "bot",
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      const botMsgId = (Date.now() + 1).toString();
      const botMsg: Message = {
        id: botMsgId,
        role: "bot",
        content: "",
        timestamp: new Date(),
        streaming: true,
        richContent: data.richContent,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);

      // Stream the response
      simulateStreaming(data.response, (chunk) => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMsgId ? { ...msg, content: chunk } : msg,
          ),
        );
      });

      setTimeout(
        () => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === botMsgId ? { ...msg, streaming: false } : msg,
            ),
          );
        },
        data.response.split(" ").length * 50,
      );
    } catch (error) {
      console.error("Error getting AI response:", error);
      setIsTyping(false);

      // Fallback to old system if API fails
      const intent = detectIntent(userMessage);
      const responseData = generateResponse(intent, userMessage);

      const pnrMatch = userMessage.match(/\b(\d{10})\b/);
      const trainMatch = userMessage.match(/\b(\d{5})\b/);

      if (intent) {
        updateContext(userMessage, intent, {
          pnr: pnrMatch?.[1],
          trainNumber: trainMatch?.[1],
          richContent: responseData.richContent?.data,
        });
      }

      const botMsgId = (Date.now() + 1).toString();
      const botMsg: Message = {
        id: botMsgId,
        role: "bot",
        content: "",
        timestamp: new Date(),
        streaming: true,
        link: responseData.link,
        richContent: responseData.richContent as Message["richContent"],
      };

      setMessages((prev) => [...prev, botMsg]);

      simulateStreaming(responseData.text, (chunk) => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMsgId ? { ...msg, content: chunk } : msg,
          ),
        );
      });

      setTimeout(
        () => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === botMsgId
                ? {
                    ...msg,
                    streaming: false,
                    content: responseData.text,
                    link: responseData.link,
                    richContent:
                      responseData.richContent as Message["richContent"],
                  }
                : msg,
            ),
          );
        },
        responseData.text.split(" ").length * 50 + 100,
      );
    }
  };

  const handleQuickAction = (query: string) => {
    handleSendMessage(query);
  };

  const handleClearChat = () => {
    setMessages([]);
    setShowWelcome(true);
    if (typeof window !== "undefined") {
      localStorage.removeItem(CHAT_STORAGE_KEY);
    }
  };

  if (isWidget) {
    return (
      <div className="flex flex-col h-full bg-gradient-to-b from-gray-50 to-white">
        <div
          ref={chatContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto px-4 py-4"
        >
          {showWelcome && messages.length === 0 ? (
            <QuickActions onQuickAction={handleQuickAction} />
          ) : (
            <>
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        <div className="border-t border-gray-200">
          {messages.length > 0 && (
            <div className="px-4 py-2 border-b border-gray-100 flex justify-end">
              <ClearChatButton
                onClear={handleClearChat}
                messageCount={messages.length}
              />
            </div>
          )}
          <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-blue-800/90 to-blue-900/95" />
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage:
              'url(\'data:image/svg+xml,%3Csvg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3ClinearGradient id="grad" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23003f7f;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23001f3f;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="1920" height="1080" fill="url(%23grad)" /%3E%3C/svg%3E\')',
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <header className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center">
                <span className="text-white text-xl font-bold">IR</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-blue-900">
                  INDIAN RAILWAYS
                </h1>
                <p className="text-xs text-gray-600">
                  Safety | Security | Punctuality
                </p>
              </div>
            </div>
            <div className="text-sm text-gray-700">18-Jan-2026</div>
          </div>
        </header>

        <div className="flex-1 overflow-hidden flex items-center justify-center p-4">
          <div className="w-full max-w-2xl h-full max-h-[600px] bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold">AskDisha 2.0</h2>
                  <p className="text-sm text-blue-200">AI Support Assistant</p>
                </div>
                {messages.length > 0 && (
                  <ClearChatButton
                    onClear={handleClearChat}
                    messageCount={messages.length}
                  />
                )}
              </div>
            </div>

            <div
              ref={chatContainerRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto px-6 py-4 bg-gradient-to-b from-gray-50 to-white"
            >
              {showWelcome && messages.length === 0 ? (
                <QuickActions onQuickAction={handleQuickAction} />
              ) : (
                <>
                  {messages.map((message) => (
                    <MessageBubble key={message.id} message={message} />
                  ))}
                  {isTyping && <TypingIndicator />}
                </>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-gray-200 bg-white px-6 py-4">
              <ChatInput
                onSendMessage={handleSendMessage}
                disabled={isTyping}
              />
            </div>

            <div className="bg-gray-50 px-6 py-2 border-t border-gray-200">
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>Terms of Use</span>
                <span>Powered by IRCTC</span>
                <span>Privacy Policy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
