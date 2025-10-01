'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  isTyping?: boolean;
}

interface FloatingChatBubbleProps {
  pageContext: string;
  pageSpecificQuestions?: string[];
}

export default function FloatingChatBubble({ pageContext, pageSpecificQuestions = [] }: FloatingChatBubbleProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hi! I'm Selma's AI assistant. I can help you learn about her ${pageContext.toLowerCase()} and more. What would you like to know?`,
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  // Default questions + page-specific questions
  const suggestedQuestions = [
    `Tell me more about Selma's ${pageContext.toLowerCase()}`,
    "What makes her an outstanding candidate?",
    "What's her experience with MCP and AI?",
    ...pageSpecificQuestions
  ];

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Add typing indicator
    setMessages(prev => [...prev, {
      id: 'typing',
      text: '',
      sender: 'assistant',
      timestamp: new Date(),
      isTyping: true
    }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: text.trim(),
          pageContext: pageContext
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      // Remove typing indicator and add response
      setMessages(prev => {
        const withoutTyping = prev.filter(msg => msg.id !== 'typing');
        return [...withoutTyping, {
          id: Date.now().toString(),
          text: data.response,
          sender: 'assistant',
          timestamp: new Date()
        }];
      });
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => {
        const withoutTyping = prev.filter(msg => msg.id !== 'typing');
        return [...withoutTyping, {
          id: Date.now().toString(),
          text: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
          sender: 'assistant',
          timestamp: new Date()
        }];
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleSuggestedClick = (question: string) => {
    sendMessage(question);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Bubble Container */}
      <div className={`transition-all duration-500 ease-in-out ${
        isExpanded 
          ? 'w-96 h-[500px] opacity-100' 
          : 'w-16 h-16 opacity-90 hover:opacity-100'
      }`}>
        
        {/* Expanded Chat Bubble */}
        {isExpanded && (
          <div className="bg-black rounded-3xl shadow-2xl border border-gray-800 h-full flex flex-col overflow-hidden">
            {/* Chat Bubble Header */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4 rounded-t-3xl flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <span className="text-white text-sm font-bold">SA</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white">
                    Selma's AI Assistant
                  </h3>
                  <p className="text-xs text-purple-100">
                    Ask about {pageContext.toLowerCase()}
                  </p>
                </div>
              </div>
              <button
                onClick={toggleExpanded}
                className="text-white hover:text-purple-200 transition-colors p-1 rounded-full hover:bg-white hover:bg-opacity-10"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-purple-600 text-white rounded-br-md'
                        : 'bg-gray-800 text-white border border-gray-700 rounded-bl-md'
                    }`}
                  >
                    {message.isTyping ? (
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    ) : (
                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {messages.length === 1 && (
              <div className="p-4 bg-black border-t border-gray-800">
                <p className="text-xs text-gray-400 mb-2 font-medium">Suggested questions:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.slice(0, 3).map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestedClick(question)}
                      className="text-xs bg-gray-800 text-gray-300 px-3 py-1.5 rounded-full hover:bg-gray-700 hover:text-white transition-all border border-gray-700 hover:border-purple-500"
                    >
                      {question.length > 35 ? question.substring(0, 35) + '...' : question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-4 bg-black border-t border-gray-800">
              <div className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={`Ask about Selma's ${pageContext.toLowerCase()}...`}
                  className="flex-1 px-4 py-3 border border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-gray-900 text-white placeholder-gray-400 text-sm"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Floating Button (when collapsed) */}
        {!isExpanded && (
          <button
            onClick={toggleExpanded}
            className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
          >
            {/* Chat Icon */}
            <svg className="w-7 h-7 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            
            {/* Pulse Animation */}
            <div className="absolute inset-0 bg-purple-400 rounded-full animate-ping opacity-20"></div>
          </button>
        )}
      </div>
    </div>
  );
}
