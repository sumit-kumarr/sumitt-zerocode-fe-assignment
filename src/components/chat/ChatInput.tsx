
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useChat } from '@/contexts/ChatContext';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { Send, Mic, MicOff } from 'lucide-react';

// Add types for Speech Recognition API
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
}

declare const SpeechRecognition: {
  prototype: SpeechRecognition;
  new(): SpeechRecognition;
};

export const ChatInput = () => {
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const { sendMessage, isLoading } = useChat();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const message = input.trim();
    setInput('');
    await sendMessage(message);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const startVoiceRecording = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: "Voice input not supported",
        description: "Your browser doesn't support voice input.",
        variant: "destructive",
      });
      return;
    }

    const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognitionClass();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsRecording(true);
      toast({
        title: "Listening...",
        description: "Speak now, I'm listening!",
      });
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(prev => prev + (prev ? ' ' : '') + transcript);
      setIsRecording(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsRecording(false);
      toast({
        title: "Voice input error",
        description: "Could not recognize speech. Please try again.",
        variant: "destructive",
      });
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopVoiceRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);
  };

  return (
    <div className="border-t border-border bg-card p-3 sm:p-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="flex-1 relative">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isMobile ? "Type a message..." : "Type your message... (Press Enter to send, Shift+Enter for new line)"}
            className="min-h-[44px] sm:min-h-[50px] max-h-32 resize-none pr-10 sm:pr-12 text-sm sm:text-base"
            disabled={isLoading}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={`absolute right-1 sm:right-2 top-1 sm:top-2 h-6 w-6 sm:h-8 sm:w-8 ${
              isRecording ? 'text-red-500 hover:text-red-600' : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={isRecording ? stopVoiceRecording : startVoiceRecording}
            disabled={isLoading}
          >
            {isRecording ? (
              <MicOff className="h-3 w-3 sm:h-4 sm:w-4" />
            ) : (
              <Mic className="h-3 w-3 sm:h-4 sm:w-4" />
            )}
          </Button>
        </div>
        <Button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="px-4 sm:px-6 h-11 sm:h-12"
          size={isMobile ? "sm" : "default"}
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
      
      {isRecording && (
        <div className="mt-2 text-center">
          <span className="text-xs sm:text-sm text-red-500 animate-pulse">
            🎤 Recording... Click mic to stop
          </span>
        </div>
      )}
    </div>
  );
};
