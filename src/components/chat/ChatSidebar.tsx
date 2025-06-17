
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useChat } from '@/contexts/ChatContext';
import { useTheme } from '@/contexts/ThemeContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  User, 
  LogOut, 
  Trash2, 
  Download, 
  Sparkles,
  MessageCircle,
  X
} from 'lucide-react';

interface ChatSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({ isOpen, onToggle }) => {
  const { user, signOut } = useAuth();
  const { messages, clearChat, exportChat } = useChat();
  const { theme } = useTheme();
  const isMobile = useIsMobile();

  return (
    <div className={`${isMobile ? 'w-80' : 'w-72 lg:w-80'} bg-card border-r border-border flex flex-col h-full`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            <span className="text-base sm:text-lg font-bold">AetherBot</span>
          </div>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggle}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        
        {/* User Info */}
        <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted">
          <div className="p-2 rounded-full bg-primary">
            <User className="h-3 w-3 sm:h-4 sm:w-4 text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-medium truncate">
              {user?.user_metadata?.full_name || 'User'}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.email}
            </p>
          </div>
        </div>
      </div>

      {/* Chat Stats */}
      <div className="p-4 border-b border-border">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-xl sm:text-2xl font-bold text-primary">{messages.length}</p>
            <p className="text-xs text-muted-foreground">Messages</p>
          </div>
          <div className="text-center">
            <p className="text-xl sm:text-2xl font-bold text-primary">
              {messages.filter(m => m.role === 'assistant').length}
            </p>
            <p className="text-xs text-muted-foreground">AI Responses</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 space-y-2">
        <h3 className="text-xs sm:text-sm font-medium text-muted-foreground mb-3">Quick Actions</h3>
        
        <Button
          variant="outline"
          size="sm"
          onClick={exportChat}
          disabled={messages.length === 0}
          className="w-full justify-start text-xs sm:text-sm"
        >
          <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
          Export Chat
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={clearChat}
          disabled={messages.length === 0}
          className="w-full justify-start text-destructive hover:text-destructive text-xs sm:text-sm"
        >
          <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
          Clear Chat
        </Button>
      </div>

      {/* Recent Chats Placeholder */}
      <div className="flex-1 p-4 overflow-y-auto">
        <h3 className="text-xs sm:text-sm font-medium text-muted-foreground mb-3">Recent Chats</h3>
        <div className="space-y-2">
          {messages.length > 0 ? (
            <div className="p-3 rounded-lg bg-muted/50 border border-border">
              <div className="flex items-center space-x-2 mb-1">
                <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                <span className="text-xs sm:text-sm font-medium">Current Session</span>
                <Badge variant="secondary" className="text-xs">Active</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {messages.length} message{messages.length !== 1 ? 's' : ''}
              </p>
            </div>
          ) : (
            <p className="text-xs sm:text-sm text-muted-foreground text-center py-8">
              No chats yet. Start a conversation!
            </p>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={signOut}
          className="w-full justify-start text-destructive hover:text-destructive text-xs sm:text-sm"
        >
          <LogOut className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};
