
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useChat } from '@/contexts/ChatContext';
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

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-full bg-primary">
            <Bot className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">AetherBot</h1>
            <div className="flex items-center space-x-2">
              <Circle 
                className={`h-2 w-2 fill-current ${
                  isLoading ? 'text-yellow-500' : 'text-green-500'
                }`} 
              />
              <span className="text-xs text-muted-foreground">
                {isLoading ? 'Thinking...' : 'Online'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Badge variant="secondary" className="text-xs">
          Powered by Gemini AI
        </Badge>
        <Button
          variant="outline"
          size="sm"
          onClick={onShowTemplates}
        >
          <FileText className="h-4 w-4 mr-2" />
          Templates
        </Button>
      </div>
    </header>
  );
};
