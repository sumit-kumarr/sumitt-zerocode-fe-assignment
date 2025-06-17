
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useChat } from '@/contexts/ChatContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Menu, 
  Bot, 
  FileText,
  Circle
} from 'lucide-react';

interface ChatHeaderProps {
  onToggleSidebar: () => void;
  onShowTemplates: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  onToggleSidebar, 
  onShowTemplates 
}) => {
  const { isLoading } = useChat();
  const isMobile = useIsMobile();

  return (
    <motion.header 
      className="h-14 sm:h-16 border-b border-border bg-card flex items-center justify-between px-3 sm:px-4"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center space-x-2 sm:space-x-4">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="h-8 w-8 sm:h-10 sm:w-10"
          >
            <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </motion.div>
        
        <div className="flex items-center space-x-2 sm:space-x-3">
          <motion.div 
            className="p-1.5 sm:p-2 rounded-full bg-primary"
            animate={{ 
              boxShadow: isLoading 
                ? '0 0 20px rgba(147, 51, 234, 0.5)' 
                : '0 0 0px rgba(147, 51, 234, 0)' 
            }}
            transition={{ duration: 0.3 }}
          >
            <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
          </motion.div>
          <div>
            <h1 className="text-base sm:text-lg font-semibold">AetherBot</h1>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <motion.div
                animate={{ 
                  scale: isLoading ? [1, 1.2, 1] : 1,
                  opacity: isLoading ? [1, 0.7, 1] : 1
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: isLoading ? Infinity : 0 
                }}
              >
                <Circle 
                  className={`h-1.5 w-1.5 sm:h-2 sm:w-2 fill-current ${
                    isLoading ? 'text-yellow-500' : 'text-green-500'
                  }`} 
                />
              </motion.div>
              <span className="text-xs text-muted-foreground">
                {isLoading ? 'Thinking...' : 'Online'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-1 sm:space-x-2">
        {!isMobile && (
          <Badge variant="secondary" className="text-xs hidden sm:inline-flex">
            Powered by Gemini AI
          </Badge>
        )}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="outline"
            size={isMobile ? "sm" : "sm"}
            onClick={onShowTemplates}
            className="text-xs sm:text-sm"
          >
            <FileText className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            {isMobile ? '' : 'Templates'}
          </Button>
        </motion.div>
      </div>
    </motion.header>
  );
};
