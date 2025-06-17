
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
import { useIsMobile } from '@/hooks/use-mobile';

const Chat = () => {
  const { user } = useAuth();
  const { messages, apiKey } = useChat();
  const [sidebarOpen, setSidebarOpen] = useState(false); // Default closed on mobile
  const [showTemplates, setShowTemplates] = useState(false);
  const isMobile = useIsMobile();

  // Show API key input if not set
  if (!apiKey) {
    return <ApiKeyInput />;
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar - Hidden on mobile by default, overlay when open */}
      <div className={`${
        isMobile 
          ? `fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`
          : sidebarOpen ? 'block' : 'hidden'
      }`}>
        <ChatSidebar 
          isOpen={sidebarOpen} 
          onToggle={() => setSidebarOpen(!sidebarOpen)} 
        />
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <ChatHeader 
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onShowTemplates={() => setShowTemplates(true)}
        />

        {/* Messages Area */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          {messages.length === 0 ? (
            <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-md mx-auto"
              >
                <h2 className="text-xl sm:text-2xl font-bold mb-4">
                  Welcome to AetherBot, {user?.user_metadata?.full_name || 'there'}!
                </h2>
                <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                  Start a conversation by typing a message below, or use one of our prompt templates.
                </p>
                <button
                  onClick={() => setShowTemplates(true)}
                  className="text-primary hover:underline text-sm sm:text-base"
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
