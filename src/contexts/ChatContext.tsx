
import React, { createContext, useContext, useState, useCallback } from 'react';
import { sendMessage as sendGeminiMessage, initializeGemini } from '@/lib/gemini';
import { useToast } from '@/hooks/use-toast';

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatContextType {
  messages: ChatMessage[];
  isLoading: boolean;
  apiKey: string;
  setApiKey: (key: string) => void;
  sendMessage: (content: string) => Promise<void>;
  clearChat: () => void;
  exportChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const { toast } = useToast();

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: content.trim(),
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Prepare chat history for Gemini
      const history = messages.map(msg => ({
        role: msg.role,
        parts: msg.content
      }));

      const response = await sendGeminiMessage(content, history);

      // Add assistant message
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: "Message Failed",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [messages, toast]);

  const clearChat = useCallback(() => {
    setMessages([]);
  }, []);

  const exportChat = useCallback(() => {
    const chatData = {
      messages,
      exportedAt: new Date().toISOString(),
    };

    const dataStr = JSON.stringify(chatData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `chat-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Chat Exported",
      description: "Your chat history has been downloaded as a JSON file.",
    });
  }, [messages, toast]);

  // Handle API key changes
  const handleSetApiKey = useCallback((key: string) => {
    setApiKey(key);
    if (key) {
      const initialized = initializeGemini(key);
      if (initialized) {
        toast({
          title: "API Key Set",
          description: "Gemini AI is now ready to use!",
        });
      }
    }
  }, [toast]);

  return (
    <ChatContext.Provider value={{
      messages,
      isLoading,
      apiKey,
      setApiKey: handleSetApiKey,
      sendMessage,
      clearChat,
      exportChat,
    }}>
      {children}
    </ChatContext.Provider>
  );
};
