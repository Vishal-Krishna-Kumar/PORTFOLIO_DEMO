import React, { useState, useRef, useEffect } from "react";
import { X, Mic, MicOff, Sparkles } from "lucide-react";
import AnimatedEllipsis from "./AnimatedEllipsis";

interface ChatbotProps {
  theme: "dark" | "light";
  isExpanded?: boolean;
  onClose?: () => void;
  setTheme: (theme: "dark" | "light") => void;
  setExpandWindow: (window: string) => void;
}

// Speech Recognition Type Definition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const Chatbot: React.FC<ChatbotProps> = ({ theme, isExpanded = false, onClose, setTheme, setExpandWindow }) => {
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi! I'm Vishal. You can use your voice to control this portfolio. Try saying 'Open Projects' or 'Switch to Light Mode'!",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId] = useState<string>(() => 
    `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  );
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const isDark = theme === "dark";
  const windowThemeClass = isDark 
    ? "bg-black/95 border border-gray-700" 
    : "bg-white/95 border border-gray-300";
  
  const headerClass = isDark 
    ? "bg-white text-black" 
    : "bg-gray-400 text-black";

  // Load chat history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('chatbotHistory');
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        const historyWithDates = parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(historyWithDates);
      } catch (error) {
        console.error('Failed to load chat history:', error);
      }
    }
  }, []);

  // Save chat history to localStorage whenever it changes
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatbotHistory', JSON.stringify(messages));
    }
  }, [messages]);

  // Focus input when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onClose) {
        onClose();
      }
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
      if (e.key === "Enter" && e.ctrlKey && input.trim()) {
        handleSend();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [input, onClose]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Voice Command Processing
  const processCommand = (text: string) => {
    const lowerText = text.toLowerCase();
    
    // System Commands
    if (lowerText.includes("project")) {
        setExpandWindow("projects");
        return "Opening Projects window...";
    }
    if (lowerText.includes("experience") || lowerText.includes("work")) {
        setExpandWindow("experience");
        return "Showing Experience window...";
    }
    if (lowerText.includes("music") || lowerText.includes("spotify")) {
        setExpandWindow("spotify");
        return "Opening Music player...";
    }
    if (lowerText.includes("coding") || lowerText.includes("leetcode")) {
        setExpandWindow("leetcode");
        return "Opening Coding Stats...";
    }
    if (lowerText.includes("close") || lowerText.includes("minimize")) {
        setExpandWindow("");
        return "Minimizing windows...";
    }
    if (lowerText.includes("light mode") || lowerText.includes("day mode")) {
        setTheme("light");
        return "Switching to Light Mode...";
    }
    if (lowerText.includes("dark mode") || lowerText.includes("night mode")) {
        setTheme("dark");
        return "Switching to Dark Mode...";
    }

    return null; // Not a system command
  };
  
  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (!recognitionRef.current) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
          recognitionRef.current = new SpeechRecognition();
          recognitionRef.current.continuous = false;
          recognitionRef.current.lang = "en-US";
          
          recognitionRef.current.onresult = (event: any) => {
             const transcript = event.results[0][0].transcript;
             setInput(transcript);
             
             // Immediate feedback for voice commands
             const systemResponse = processCommand(transcript);
             if (systemResponse) {
                 // It was a command, execute it and show feedback
                 const userMsg: Message = {
                    id: `msg_${Date.now()}_user`,
                    role: "user",
                    content: transcript,
                    timestamp: new Date()
                 };
                 const sysMsg: Message = {
                    id: `msg_${Date.now()}_sys`,
                    role: "assistant",
                    content: `⚡ ${systemResponse}`,
                    timestamp: new Date()
                 };
                 setMessages(prev => [...prev, userMsg, sysMsg]);
             } else {
                 // Not a command, treat as chat
                 handleSend(transcript); 
             }
             setIsListening(false);
          };
          
          recognitionRef.current.onerror = (event: any) => {
            console.error("Speech recognition error", event.error);
            setIsListening(false);
          };
          
          recognitionRef.current.onend = () => {
             setIsListening(false);
          };
        } else {
           alert("Voice recognition not supported in this browser.");
           return;
        }
      }
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  // Modified handleSend to accept optional text arg
  const handleSend = async (overrideText?: string) => {
    const textToSend = overrideText || input;
    if (!textToSend.trim() || isLoading) return;

    if(!overrideText) setInput(""); // Clear input if it came from text box
    
    // Check for system command first (if typed)
    if (!overrideText) {
        const sysResponse = processCommand(textToSend);
        if (sysResponse) {
             const userMsg: Message = {
                id: `msg_${Date.now()}_user`,
                role: "user",
                content: textToSend,
                timestamp: new Date()
             };
             const sysMsg: Message = {
                id: `msg_${Date.now()}_sys`,
                role: "assistant",
                content: `⚡ ${sysResponse}`,
                timestamp: new Date()
             };
             setMessages(prev => [...prev, userMsg, sysMsg]);
             return;
        }
    }

    // Standard AI Chat Logic
    // Add user message
    const userMsg: Message = {
      id: `msg_${Date.now()}_user`,
      role: "user",
      content: textToSend,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: textToSend,
          conversationId,
          history: messages.slice(-5).map(m => ({
            role: m.role,
            content: m.content
          }))
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Add assistant message
      const assistantMsg: Message = {
        id: `msg_${Date.now()}_assistant`,
        role: "assistant",
        content: data.answer,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMsg]);
      
    } catch (error) {
      console.error("Error sending message:", error);
      
      const errorMsg: Message = {
        id: `msg_${Date.now()}_error`,
        role: "assistant",
        content: "Sorry, I'm having trouble connecting right now. Please try again in a moment!",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const quickQuestions = [
    "Tell me about yourself",
    "What are your skills?",
    "What projects have you worked on?",
    "What is your experience?",
    "How can I contact you?"
  ];

  return (
    <div className={`${windowThemeClass} rounded-xl flex flex-col h-full shadow-2xl`}>
      {/* Header */}
      <div className={`rounded-t-xl text-sm text-center relative flex items-center justify-center py-2 ${headerClass}`}>
        <Sparkles className="w-4 h-4 mr-2 text-yellow-500" />
        <span className="font-mono font-bold">AI COMMAND CENTER</span>
        <button 
          className="rounded-full p-1 bg-red-500 absolute right-4 cursor-pointer hover:bg-red-600 transition-colors"
          onClick={onClose}
        >
          <X className="w-3 h-3 text-white" />
        </button>
      </div>

      {/* Messages Container */}
      <div 
        ref={chatContainerRef}
        className="flex-grow overflow-y-auto p-4"
        style={{
          height: isExpanded ? "calc(100vh - 200px)" : "400px",
          userSelect: "text",
        }}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}
          >
            <div className={`inline-block max-w-[80%] rounded-lg px-4 py-2 ${
              message.role === "user"
                ? isDark 
                  ? "bg-blue-600 text-white" 
                  : "bg-blue-500 text-white"
                : isDark 
                  ? "bg-gray-800 text-gray-200 border border-gray-700" 
                  : "bg-gray-100 text-gray-800 border border-gray-300"
            }`}>
              <div className="whitespace-pre-wrap">{message.content}</div>
              <div className={`text-xs mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                {formatTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="mb-4 text-left">
            <div className={`inline-block max-w-[80%] rounded-lg px-4 py-2 ${
              isDark 
                ? "bg-gray-800 text-gray-200 border border-gray-700" 
                : "bg-gray-100 text-gray-800 border border-gray-300"
            }`}>
              <div className="flex items-center">
                <span className="mr-2">Thinking</span>
                <AnimatedEllipsis />
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      {messages.length <= 2 && (
        <div className="px-4 pb-3">
          <div className="text-xs text-gray-500 mb-2">Try asking:</div>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => setInput(question)}
                className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                  isDark
                    ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t px-4 py-3" style={{ 
        borderColor: isDark ? '#374151' : '#d1d5db' 
      }}>
        <div className="flex items-center">
          <div className={`flex-grow flex items-center rounded-lg border px-3 py-2 ${
            isDark 
              ? "bg-gray-900 border-gray-700" 
              : "bg-white border-gray-300"
          }`}>
            <span className={`mr-2 ${isDark ? "text-green-400" : "text-green-600"}`}>❯</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              placeholder={isLoading ? "Wait for response..." : "Ask me anything..."}
              className={`flex-grow bg-transparent border-none outline-none ${
                isDark 
                  ? "text-gray-200 placeholder:text-gray-500" 
                  : "text-gray-800 placeholder:text-gray-400"
              } ${isLoading ? "cursor-not-allowed" : ""}`}
              autoComplete="off"
              spellCheck="true"
            />
          </div>
          <button
            onClick={toggleListening}
            className={`mr-2 p-2 rounded-full transition-all ${
              isListening 
                ? "bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/50" 
                : isDark 
                  ? "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700" 
                  : "bg-gray-200 text-gray-600 hover:text-black hover:bg-gray-300"
            }`}
            title="Voice Control"
          >
            {isListening ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </button>
          
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className={`ml-3 px-4 py-2 rounded-lg transition-colors ${
              !input.trim() || isLoading
                ? isDark 
                  ? "bg-gray-800 text-gray-500 cursor-not-allowed" 
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
                : isDark 
                  ? "bg-blue-600 text-white hover:bg-blue-700" 
                  : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Send
          </button>
        </div>
        <div className={`text-xs mt-2 text-center ${
          isDark ? "text-gray-500" : "text-gray-600"
        }`}>
          Press <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-800 rounded text-xs">Enter</kbd> to send • 
          <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-800 rounded text-xs mx-1">ESC</kbd> to close • 
          <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-800 rounded text-xs mx-1">Ctrl+Enter</kbd> to send
        </div>
      </div>
    </div>
  );
};

export default Chatbot;