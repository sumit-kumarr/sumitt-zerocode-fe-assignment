import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, Zap, Shield, Sparkles, Mic, Download, FileText, ArrowRight, Star, Users, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Landing = () => {
  const [user, setUser] = useState(null);
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const particlesRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Animated background particles
  useEffect(() => {
    const particles = [];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2
      });
    }

    const canvas = particlesRef.current;
    const ctx = canvas?.getContext('2d');
    
    if (!canvas || !ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147, 51, 234, ${particle.opacity})`;
        ctx.fill();
        
        // Connect nearby particles
        particles.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const distance = Math.sqrt(
              Math.pow(particle.x - otherParticle.x, 2) + 
              Math.pow(particle.y - otherParticle.y, 2)
            );
            
            if (distance < 100) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = `rgba(147, 51, 234, ${0.1 * (100 - distance) / 100})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        });
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Mouse movement effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ 
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // GSAP-like animations using CSS animations and Intersection Observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8" />,
      title: "Smart Conversations",
      description: "Powered by Google Gemini AI for intelligent, contextual responses",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Zap className="h-6 w-6 sm:h-8 sm:w-8" />,
      title: "Real-time Responses",
      description: "Lightning-fast AI responses with streaming capabilities",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Shield className="h-6 w-6 sm:h-8 sm:w-8" />,
      title: "Secure & Private",
      description: "Enterprise-grade security with Supabase authentication",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Mic className="h-6 w-6 sm:h-8 sm:w-8" />,
      title: "Voice Input",
      description: "Speak naturally with built-in speech recognition",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <FileText className="h-6 w-6 sm:h-8 sm:w-8" />,
      title: "Prompt Templates",
      description: "Pre-built templates for common use cases",
      color: "from-red-500 to-rose-500"
    },
    {
      icon: <Download className="h-6 w-6 sm:h-8 sm:w-8" />,
      title: "Export Chats",
      description: "Download your conversation history anytime",
      color: "from-indigo-500 to-purple-500"
    }
  ];

  const stats = [
    { icon: <Users className="h-6 w-6" />, value: "50K+", label: "Active Users" },
    { icon: <MessageCircle className="h-6 w-6" />, value: "1M+", label: "Conversations" },
    { icon: <Star className="h-6 w-6" />, value: "4.9", label: "Rating" },
    { icon: <Globe className="h-6 w-6" />, value: "24/7", label: "Availability" }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated Background */}
      <canvas
        ref={particlesRef}
        className="fixed inset-0 w-full h-full pointer-events-none opacity-30"
        style={{ zIndex: 1 }}
      />
      
      {/* Gradient Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-20"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)`,
          zIndex: 2
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          {/* Navigation */}
          <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-black/20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16 sm:h-20">
                <div className="flex items-center space-x-2">
                  <img src="/bot-logo.svg" alt="AetherBot Logo" className="h-8 w-8" />
                  <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    AetherBot
                  </span>
                </div>
                
                <div className="flex items-center space-x-4">
                  <Link
                    to="/auth"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 text-center" ref={heroRef}>
          <div className="animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-1000 ease-out">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full border border-purple-500/30 mb-6 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 mr-2 text-purple-400" />
              <span className="text-sm font-medium">Your Assistant</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight">
              Your Intelligent
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
                AI Assistant
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Experience the future of conversation with our advanced AI chatbot. 
              Get instant, intelligent responses to any question or task.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 overflow-hidden">
                <span className="relative z-10 flex items-center">
                  <Link to="/auth" className="flex items-center">
                  Start Chatting
                  </Link>
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              
              
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="p-4 backdrop-blur-md bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex flex-col items-center">
                    <div className="text-purple-400 mb-2">{stat.icon}</div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20" ref={featuresRef}>
          <div className="text-center mb-16 animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-1000 ease-out">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Powerful Features
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need for seamless AI conversations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-1000 ease-out hover:scale-105"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative p-6 sm:p-8 backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:bg-white/10 h-full overflow-hidden">
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`} />
                  
                  <div className="relative z-10">
                    <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-white">{feature.icon}</div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-white transition-colors duration-300">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  
                  {/* Shine effect */}
                  <div className="absolute -inset-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 transform -skew-x-12 group-hover:animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="relative animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-1000 ease-out">
            <div className="relative p-8 sm:p-12 lg:p-16 backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 text-center max-w-4xl mx-auto overflow-hidden">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-pink-500/10 rounded-3xl" />
              
              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                    Ready to Start?
                  </span>
                </h2>
                
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Join thousands of users already experiencing the power of AI conversation.
                </p>
                
                <Link 
                  to="/auth"
                  className="group relative inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Get Started
                    <Sparkles className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-4 left-4 w-8 h-8 bg-purple-500/20 rounded-full blur-sm" />
              <div className="absolute bottom-4 right-4 w-6 h-6 bg-blue-500/20 rounded-full blur-sm" />
              <div className="absolute top-1/2 left-8 w-4 h-4 bg-pink-500/20 rounded-full blur-sm" />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <div className="border-t border-white/10 pt-8 animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-1000 ease-out">
            <p className="text-gray-400 flex flex-col sm:flex-row items-center justify-center gap-2">
              © 2025 AetherBot. Built by sumit😎. All rights reserved.
              <span className="flex items-center gap-1">
          <a
            href="https://github.com/sumit-kumarr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
            aria-label="GitHub Profile"
          >
            {/* GitHub Icon (Lucide-react or SVG) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              fill="none"
              viewBox="0 0 24 24"
              className="mr-1"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2Z"
                clipRule="evenodd"
              />
            </svg>
            <span className="underline">Github</span>
          </a>
              </span>
            </p>
          </div>
        </footer>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default Landing;