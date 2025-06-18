import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, MessageSquare, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

interface ChatHeaderProps {
  onToggleSidebar: () => void;
  onShowTemplates: () => void;
}

export const ChatHeader = ({ onToggleSidebar, onShowTemplates }: ChatHeaderProps) => {
  const { user } = useAuth();

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-3 sm:px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="h-8 w-8 sm:h-10 sm:w-10"
          >
            <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          
          <Link to="/" className="flex items-center space-x-1 sm:space-x-2 hover:opacity-80 transition-opacity">
            <img src="/bot-logo.svg" alt="AetherBot" className="h-6 w-6 sm:h-7 sm:w-7" />
            <h1 className="text-base sm:text-lg font-semibold">AetherBot</h1>
          </Link>
        </div>

        <div className="flex items-center space-x-1 sm:space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onShowTemplates}
            className="hidden xs:flex text-xs sm:text-sm px-2 sm:px-3"
          >
            <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Templates</span>
            <span className="sm:hidden">T</span>
          </Button>
          
          <div className="text-xs sm:text-sm text-muted-foreground max-w-[120px] sm:max-w-none truncate">
            <span className="hidden sm:inline">Welcome, </span>
            {user?.user_metadata?.full_name || 'User'}
          </div>
        </div>
      </div>
    </header>
  );
};
