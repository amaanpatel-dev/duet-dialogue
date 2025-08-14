import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  avatar?: string;
  timestamp?: string;
}

const ChatMessage = ({ message, isUser, avatar, timestamp }: ChatMessageProps) => {
  return (
    <div className={`flex gap-3 mb-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <Avatar className="w-8 h-8 flex-shrink-0">
        <AvatarImage src={avatar} alt={isUser ? "You" : "AI"} />
        <AvatarFallback className={isUser ? "bg-user-message" : "bg-bot-message"}>
          {isUser ? "U" : "AI"}
        </AvatarFallback>
      </Avatar>
      
      <div className={`flex flex-col max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div 
          className={`px-4 py-3 rounded-2xl shadow-message transition-all duration-200 hover:shadow-lg ${
            isUser 
              ? 'bg-user-message text-message-text rounded-br-md' 
              : 'bg-bot-message text-message-text rounded-bl-md border border-border/50'
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
        </div>
        
        {timestamp && (
          <span className="text-xs text-muted-foreground mt-1 px-2">
            {timestamp}
          </span>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;