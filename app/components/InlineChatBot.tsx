'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  isTyping?: boolean;
}

interface InlineChatBotProps {
  pageContext: string;
  pageSpecificQuestions?: string[];
}

export default function InlineChatBot({ pageContext, pageSpecificQuestions = [] }: InlineChatBotProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
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

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`fixed bottom-0 right-0 z-40 transition-all duration-300 ${
      isFullscreen ? 'w-full h-full' : 'w-96'
    }`}>
      {/* Chat Container */}
      <div className={`bg-black border border-gray-800 shadow-2xl transition-all duration-300 ${
        isFullscreen 
          ? 'w-full h-full rounded-none' 
          : isExpanded 
            ? 'h-96 rounded-t-lg' 
            : 'h-16 rounded-lg'
      }`}>
        
        {/* Header - Always visible */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-black">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">SA</span>
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm">
                Selma's AI Assistant
              </h3>
              <p className="text-xs text-gray-400">
                Ask about {pageContext.toLowerCase()}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              className="text-gray-400 hover:text-white transition-colors p-1"
              title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isFullscreen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M9 9L3.5 3.5M15 9v4.5M15 9h4.5M15 9l5.5-5.5M9 15v4.5M9 15H4.5M9 15l-5.5 5.5M15 15v-4.5M15 15h4.5M15 15l5.5 5.5" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                )}
              </svg>
            </button>
            {/* Expand/Collapse Toggle */}
            <button
              onClick={toggleExpanded}
              className="text-gray-400 hover:text-white transition-colors p-1"
              title={isExpanded ? "Collapse" : "Expand"}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isExpanded ? "M19 9l-7 7-7-7" : "M5 15l7-7 7 7"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages Area - Only visible when expanded */}
        {(isExpanded || isFullscreen) && (
          <>
            {/* Messages */}
            <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${
              isFullscreen ? 'h-[calc(100vh-200px)]' : 'h-64'
            }`}>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-3 py-2 rounded-lg text-sm ${
                      message.sender === 'user'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-800 text-white border border-gray-700'
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

            {/* Suggested Questions - Only show when first message */}
            {messages.length === 1 && (
              <div className="p-4 border-t border-gray-800">
                <p className="text-xs text-gray-400 mb-2">Suggested questions:</p>
                <div className="flex flex-wrap gap-1">
                  {suggestedQuestions.slice(0, 3).map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestedClick(question)}
                      className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full hover:bg-gray-700 transition border border-gray-700"
                    >
                      {question.length > 40 ? question.substring(0, 40) + '...' : question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800">
              <div className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={`Ask about Selma's ${pageContext.toLowerCase()}...`}
                  className="flex-1 px-3 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-gray-900 text-white placeholder-gray-400 text-sm"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </form>
          </>
        )}

        {/* Collapsed State - Show when not expanded */}
        {!isExpanded && !isFullscreen && (
          <div className="p-4">
            <p className="text-sm text-gray-400">
              Click to chat with Selma's AI assistant about {pageContext.toLowerCase()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
