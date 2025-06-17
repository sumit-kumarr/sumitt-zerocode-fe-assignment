
import React from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
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
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

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

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 24
      }
    }
  };

  return (
    <motion.div 
      className={`min-h-screen ${theme === 'dark' ? 'gradient-bg-dark' : 'gradient-bg'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <motion.header 
        className="container mx-auto px-4 py-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <nav className="flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Sparkles className="h-8 w-8 text-white" />
            <span className="text-2xl font-bold text-white">AetherBot</span>
          </motion.div>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {user ? (
                <Link to="/chat">
                  <Button variant="secondary">Go to Chat</Button>
                </Link>
              ) : (
                <Link to="/auth">
                  <Button variant="secondary">Get Started</Button>
                </Link>
              )}
            </motion.div>
          </div>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <motion.div
          style={{ y }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Badge variant="secondary" className="mb-4">
              Powered by Google Gemini AI
            </Badge>
          </motion.div>
          
          <motion.h1 
            className="text-6xl font-bold text-white mb-6 leading-tight"
            variants={itemVariants}
          >
            Your Intelligent
            <br />
            <motion.span 
              className="bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] 
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            >
              AI Assistant
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-white/80 mb-8 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Experience the future of conversation with our advanced AI chatbot. 
            Get instant, intelligent responses to any question or task.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
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
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Powerful Features
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Everything you need for seamless AI conversations
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                transition: { type: "spring", stiffness: 300 }
              }}
            >
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white hover:bg-white/20 transition-all duration-300 h-full">
                <CardHeader>
                  <motion.div 
                    className="text-purple-300 mb-2"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {feature.icon}
                  </motion.div>
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
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <motion.div
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 border border-white/20"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Start?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Join thousands of users already experiencing the power of AI conversation.
          </p>
          {!user && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/auth">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                  Create Free Account
                  <Sparkles className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer 
        className="container mx-auto px-4 py-8 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="border-t border-white/20 pt-8">
          <p className="text-white/60">
            © 2024 AetherBot. Built with ❤️ using React, Supabase, and Gemini AI.
          </p>
        </div>
      </motion.footer>
    </motion.div>
  );
};

export default Landing;
