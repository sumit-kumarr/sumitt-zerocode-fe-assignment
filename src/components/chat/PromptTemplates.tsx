
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useChat } from '@/contexts/ChatContext';
import { 
  X, 
  Code, 
  PenTool, 
  BookOpen, 
  Calculator, 
  Lightbulb, 
  Mail,
  FileText,
  Briefcase
} from 'lucide-react';

interface PromptTemplatesProps {
  onClose: () => void;
}

const templates = [
  {
    id: 'code',
    title: 'Code Assistant',
    description: 'Get help with programming tasks',
    icon: <Code className="h-5 w-5" />,
    category: 'Development',
    prompt: 'I need help with coding. Can you assist me with writing, debugging, or explaining code? Please ask me what specific programming language or problem you can help with.'
  },
  {
    id: 'writing',
    title: 'Creative Writing',
    description: 'Generate creative content and stories',
    icon: <PenTool className="h-5 w-5" />,
    category: 'Creative',
    prompt: 'I would like help with creative writing. Can you help me brainstorm ideas, write content, or improve my writing style? What type of writing project are you working on?'
  },
  {
    id: 'learning',
    title: 'Learning Tutor',
    description: 'Learn new concepts and topics',
    icon: <BookOpen className="h-5 w-5" />,
    category: 'Education',
    prompt: 'I want to learn something new. Can you teach me about a topic, explain complex concepts in simple terms, or help me study? What subject interests you?'
  },
  {
    id: 'math',
    title: 'Math Helper',
    description: 'Solve math problems and equations',
    icon: <Calculator className="h-5 w-5" />,
    category: 'Education',
    prompt: 'I need help with math problems. Can you solve equations, explain mathematical concepts, or walk me through problem-solving steps? What math topic do you need help with?'
  },
  {
    id: 'brainstorm',
    title: 'Brainstorming',
    description: 'Generate ideas and solutions',
    icon: <Lightbulb className="h-5 w-5" />,
    category: 'Creative',
    prompt: 'I need to brainstorm ideas. Can you help me generate creative solutions, think through problems, or explore different possibilities? What challenge or project are you working on?'
  },
  {
    id: 'email',
    title: 'Email Assistant',
    description: 'Write professional emails',
    icon: <Mail className="h-5 w-5" />,
    category: 'Business',
    prompt: 'I need help writing an email. Can you help me craft professional, clear, and effective emails? What type of email do you need to write and who is your audience?'
  },
  {
    id: 'summary',
    title: 'Text Summarizer',
    description: 'Summarize long texts and articles',
    icon: <FileText className="h-5 w-5" />,
    category: 'Productivity',
    prompt: 'I need to summarize some text. Can you help me create concise summaries, extract key points, or analyze content? Please share the text you want me to summarize.'
  },
  {
    id: 'business',
    title: 'Business Advisor',
    description: 'Get business strategy and planning help',
    icon: <Briefcase className="h-5 w-5" />,
    category: 'Business',
    prompt: 'I need business advice. Can you help with strategy, planning, market analysis, or business decisions? What specific business challenge or opportunity are you facing?'
  }
];

export const PromptTemplates: React.FC<PromptTemplatesProps> = ({ onClose }) => {
  const { sendMessage } = useChat();

  const handleTemplateSelect = async (template: typeof templates[0]) => {
    await sendMessage(template.prompt);
    onClose();
  };

  const categories = [...new Set(templates.map(t => t.category))];

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Prompt Templates
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {categories.map(category => (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <Badge variant="secondary" className="mr-2">
                  {category}
                </Badge>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {templates
                  .filter(template => template.category === category)
                  .map((template, index) => (
                    <motion.div
                      key={template.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card 
                        className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => handleTemplateSelect(template)}
                      >
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center gap-2 text-base">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary">
                              {template.icon}
                            </div>
                            {template.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription>
                            {template.description}
                          </CardDescription>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            Click on any template to start a conversation with that prompt
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
