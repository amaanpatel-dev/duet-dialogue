import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User } from "lucide-react";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import lunaAvatar from "@/assets/luna-avatar.png";
import alexAvatar from "@/assets/alex-avatar.png";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

const personas = {
  luna: {
    name: "Luna",
    avatar: lunaAvatar,
    greeting: "Hi there! I'm Luna, your creative companion. I love exploring ideas, discussing art, and helping with creative projects. What would you like to chat about today?",
    personality: "Creative & Empathetic"
  },
  alex: {
    name: "Alex", 
    avatar: alexAvatar,
    greeting: "Hello! I'm Alex, your analytical assistant. I'm here to help with problem-solving, technical questions, and strategic thinking. How can I assist you today?",
    personality: "Analytical & Practical"
  }
};

const Chat = () => {
  const { personaId } = useParams<{ personaId: string }>();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const persona = personaId ? personas[personaId as keyof typeof personas] : null;

  useEffect(() => {
    if (!persona) {
      navigate("/");
      return;
    }

    // Add initial greeting
    const initialMessage: Message = {
      id: "greeting",
      text: persona.greeting,
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([initialMessage]);
  }, [persona, navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!persona) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = {
        luna: [
          "That's a fascinating perspective! Let me think about this creatively...",
          "I love how you're approaching this! Here's what I'm thinking...",
          "What an interesting question! From a creative standpoint...",
          "That resonates with me deeply. Let me share some thoughts...",
        ],
        alex: [
          "Let me analyze this systematically for you...",
          "Based on logical reasoning, here's my assessment...",
          "That's a good question. Let me break this down step by step...",
          "From a practical standpoint, I would suggest...",
        ]
      };

      const personaResponses = responses[personaId as keyof typeof responses] || responses.alex;
      const randomResponse = personaResponses[Math.floor(Math.random() * personaResponses.length)];

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleBack = () => {
    navigate("/");
  };

  if (!persona) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen bg-chat-background max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-card border-b border-border/50">
        <Button variant="ghost" size="sm" onClick={handleBack} className="hover:bg-card-hover">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        
        <div className="flex items-center space-x-3">
          <img 
            src={persona.avatar} 
            alt={persona.name}
            className="w-8 h-8 rounded-full object-cover border border-primary/20"
          />
          <div className="text-center">
            <h2 className="font-semibold text-foreground">{persona.name}</h2>
            <p className="text-xs text-primary">{persona.personality}</p>
          </div>
        </div>

        <Button variant="ghost" size="sm" className="hover:bg-card-hover">
          <User className="w-4 h-4" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message.text}
            isUser={message.isUser}
            avatar={message.isUser ? undefined : persona.avatar}
            timestamp={message.timestamp}
          />
        ))}
        
        {isTyping && (
          <div className="flex gap-3 mb-4">
            <img 
              src={persona.avatar} 
              alt={persona.name}
              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
            />
            <div className="bg-bot-message border border-border/50 px-4 py-3 rounded-2xl rounded-bl-md">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput 
        onSendMessage={handleSendMessage}
        disabled={isTyping}
        placeholder={`Message ${persona.name}...`}
      />
    </div>
  );
};

export default Chat;