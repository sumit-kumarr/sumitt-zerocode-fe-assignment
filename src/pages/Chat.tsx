
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useChat } from '@/contexts/ChatContext';
import { ChatSidebar } from '@/components/chat/ChatSidebar';
import { ChatHeader } from '@/components/chat/ChatHeader';
import { ChatMessages } from '@/components/chat/ChatMessages';
import { ChatInput } from '@/components/chat/ChatInput';
import { PromptTemplates } from '@/components/chat/PromptTemplates';
import { useIsMobile } from '@/hooks/use-mobile';

const Chat = () => {
  const { user } = useAuth();
  const { messages } = useChat();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const isMobile = useIsMobile();

  const sidebarVariants = {
    open: { 
      x: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        duration: 0.3
      } 
    },
    closed: { 
      x: "-100%",
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        duration: 0.3
      } 
    }
  };

  const overlayVariants = {
    visible: { 
      opacity: 1,
      transition: { duration: 0.2 }
    },
    hidden: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div 
      className="flex h-screen bg-background overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || !isMobile) && (
          <motion.div
            className={`${
              isMobile 
                ? 'fixed inset-y-0 left-0 z-50'
                : sidebarOpen ? 'block' : 'hidden'
            }`}
            variants={isMobile ? sidebarVariants : {}}
            initial={isMobile ? "closed" : false}
            animate={isMobile ? "open" : false}
            exit={isMobile ? "closed" : false}
          >
            <ChatSidebar 
              isOpen={sidebarOpen} 
              onToggle={() => setSidebarOpen(!sidebarOpen)} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isMobile && sidebarOpen && (
          <motion.div 
            className="fixed inset-0 bg-black/50 z-40"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <motion.div 
        className="flex-1 flex flex-col min-w-0"
        layout
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <ChatHeader 
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            onShowTemplates={() => setShowTemplates(true)}
          />
        </motion.div>

        {/* Messages Area */}
        <motion.div 
          className="flex-1 flex flex-col min-h-0 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {messages.length === 0 ? (
            <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.3,
                  type: "spring",
                  stiffness: 200
                }}
                className="text-center max-w-md mx-auto"
              >
                <motion.h2 
                  className="text-xl sm:text-2xl font-bold mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  Welcome to AetherBot, {user?.user_metadata?.full_name || 'there'}!
                </motion.h2>
                <motion.p 
                  className="text-muted-foreground mb-6 text-sm sm:text-base"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  Start a conversation by typing a message below, or use one of our prompt templates.
                </motion.p>
                <motion.button
                  onClick={() => setShowTemplates(true)}
                  className="text-primary hover:underline text-sm sm:text-base"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Browse Prompt Templates →
                </motion.button>
              </motion.div>
            </div>
          ) : (
            <ChatMessages />
          )}
        </motion.div>

        {/* Input Area */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <ChatInput />
        </motion.div>
      </motion.div>

      {/* Prompt Templates Modal */}
      <AnimatePresence>
        {showTemplates && (
          <PromptTemplates onClose={() => setShowTemplates(false)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Chat;
