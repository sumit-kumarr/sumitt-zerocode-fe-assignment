import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useChat } from '@/contexts/ChatContext';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export const ChatMessages = () => {
  const { messages, isLoading } = useChat();
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-4 sm:space-y-6">
      {messages.map((message, index) => (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className={`flex gap-2 sm:gap-4 ${
            message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
          }`}
        >
          {/* Avatar */}
          <Avatar className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0">
            <AvatarFallback 
              className={
                message.role === 'user' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted'
              }
            >
              {message.role === 'user' ? (
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <img src="/bot-logo.svg" alt="AetherBot" className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </AvatarFallback>
          </Avatar>

          {/* Message Content */}
          <div className={`flex-1 max-w-[85%] sm:max-w-3xl ${
            message.role === 'user' ? 'text-right' : 'text-left'
          }`}>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs sm:text-sm font-medium">
                {message.role === 'user' 
                  ? user?.user_metadata?.full_name || 'You'
                  : 'AetherBot'
                }
              </span>
              <Badge variant="outline" className="text-xs">
                {formatTime(message.timestamp)}
              </Badge>
            </div>
            
            <div className={`p-3 sm:p-4 rounded-2xl break-words ${
              message.role === 'user'
                ? 'chat-bubble-user text-white'
                : 'bg-muted'
            }`}>
              {message.role === 'assistant' ? (
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <ReactMarkdown 
                    components={{
                      code: ({ children, className }) => (
                        <code className={`${className || ''} bg-background/50 px-1 py-0.5 rounded text-sm`}>
                          {children}
                        </code>
                      ),
                      pre: ({ children }) => (
                        <pre className="bg-background/50 p-3 rounded-lg overflow-x-auto text-sm">
                          {children}
                        </pre>
                      )
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
              ) : (
                <p className="whitespace-pre-wrap text-sm sm:text-base">{message.content}</p>
              )}
            </div>
          </div>
        </motion.div>
      ))}

      {/* Loading Indicator */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-2 sm:gap-4"
        >
          <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
            <AvatarFallback className="bg-muted">
              <Bot className="w-4 h-4 sm:w-5 sm:h-5" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 max-w-[85%] sm:max-w-3xl">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs sm:text-sm font-medium">AetherBot</span>
              <Badge variant="outline" className="text-xs">
                Thinking...
              </Badge>
            </div>
            <div className="p-3 sm:p-4 rounded-2xl bg-muted">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full typing-indicator"></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full typing-indicator" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full typing-indicator" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};
