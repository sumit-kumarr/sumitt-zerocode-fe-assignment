
import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, MessageSquare, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface ChatHeaderProps {
  onToggleSidebar: () => void;
  onShowTemplates: () => void;
}

export const ChatHeader = ({ onToggleSidebar, onShowTemplates }: ChatHeaderProps) => {
  const { user } = useAuth();

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <h1 className="text-lg font-semibold">AetherBot</h1>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onShowTemplates}
            className="hidden sm:flex"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Templates
          </Button>
          
          <div className="text-sm text-muted-foreground">
            Welcome, {user?.user_metadata?.full_name || 'User'}
          </div>
        </div>
      </div>
    </header>
  );
};
