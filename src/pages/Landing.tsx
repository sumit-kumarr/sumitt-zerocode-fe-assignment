import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Zap, Shield, Sparkles, Mic, Download, FileText } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { ThemeToggle } from '@/components/ThemeToggle';

const Landing = () => {
  const { theme } = useTheme();
  const { user } = useAuth();

  const features = [
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "Smart Conversations",
      description: "Powered by Google Gemini AI for intelligent, contextual responses"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Real-time Responses",
      description: "Lightning-fast AI responses with streaming capabilities"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure & Private",
      description: "Enterprise-grade security with Supabase authentication"
    },
    {
      icon: <Mic className="h-8 w-8" />,
      title: "Voice Input",
      description: "Speak naturally with built-in speech recognition"
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Prompt Templates",
      description: "Pre-built templates for common use cases"
    },
    {
      icon: <Download className="h-8 w-8" />,
      title: "Export Chats",
      description: "Download your conversation history anytime"
    }
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'gradient-bg-dark' : 'gradient-bg'}`}>
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <Sparkles className="h-8 w-8 text-white" />
            <span className="text-2xl font-bold text-white">AetherBot</span>
          </motion.div>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {user ? (
              <Link to="/chat">
                <Button variant="secondary">Go to Chat</Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button variant="secondary">Get Started</Button>
              </Link>
            )}
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="secondary" className="mb-4">
            Powered by Google Gemini AI
          </Badge>
          <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
            Your Intelligent
            <br />
            <span className="bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
              AI Assistant
            </span>
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Experience the future of conversation with our advanced AI chatbot. 
            Get instant, intelligent responses to any question or task.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Link to="/chat">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                  Start Chatting
                  <MessageCircle className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                  Get Started Free
                  <Sparkles className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            )}
            <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
              Learn More
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Powerful Features
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Everything you need for seamless AI conversations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white hover:bg-white/20 transition-all duration-300">
                <CardHeader>
                  <div className="text-purple-300 mb-2">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-white/80">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 border border-white/20"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Start?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Join thousands of users already experiencing the power of AI conversation.
          </p>
          {!user && (
            <Link to="/auth">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                Create Free Account
                <Sparkles className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          )}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center">
        <div className="border-t border-white/20 pt-8">
          <p className="text-white/60">
            © 2024 AetherBot. Built with ❤️ using React, Supabase, and Gemini AI.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
