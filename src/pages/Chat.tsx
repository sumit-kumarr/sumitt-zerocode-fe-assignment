
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useChat } from '@/contexts/ChatContext';
import { ChatSidebar } from '@/components/chat/ChatSidebar';
import { ChatHeader } from '@/components/chat/ChatHeader';
import { ChatMessages } from '@/components/chat/ChatMessages';
import { ChatInput } from '@/components/chat/ChatInput';
import { PromptTemplates } from '@/components/chat/PromptTemplates';
import { ApiKeyInput } from '@/components/chat/ApiKeyInput';

const Chat = () => {
  const { user } = useAuth();
  const { messages, apiKey } = useChat();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showTemplates, setShowTemplates] = useState(false);

  // Show API key input if not set
  if (!apiKey) {
    return <ApiKeyInput />;
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <ChatSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <ChatHeader 
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onShowTemplates={() => setShowTemplates(true)}
        />

        {/* Messages Area */}
        <div className="flex-1 flex flex-col min-h-0">
          {messages.length === 0 ? (
            <div className="flex-1 flex items-center justify-center p-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-md"
              >
                <h2 className="text-2xl font-bold mb-4">
                  Welcome to AetherBot, {user?.user_metadata?.full_name || 'there'}!
                </h2>
                <p className="text-muted-foreground mb-6">
                  Start a conversation by typing a message below, or use one of our prompt templates.
                </p>
                <button
                  onClick={() => setShowTemplates(true)}
                  className="text-primary hover:underline"
                >
                  Browse Prompt Templates →
                </button>
              </motion.div>
            </div>
          ) : (
            <ChatMessages />
          )}
        </div>

        {/* Input Area */}
        <ChatInput />
      </div>

      {/* Prompt Templates Modal */}
      {showTemplates && (
        <PromptTemplates onClose={() => setShowTemplates(false)} />
      )}
    </div>
  );
};

export default Chat;
