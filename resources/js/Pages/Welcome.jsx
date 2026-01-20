import React, { useState, useEffect, useRef } from 'react';
import {
  Laptop, Cpu, Check, Menu, X, Sparkles,
  Zap, BookOpen, Users, Clock, ArrowRight, GraduationCap,
  Star, Code, Lightbulb, Trophy, ChevronDown, Mouse, Terminal,
  Server, Database, Cloud, GitBranch, Monitor, Keyboard, MousePointer
} from 'lucide-react';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

// 1. Updated Component to accept 'image' prop and size variant
const LaptopCard = ({ name, role, type, image, size = 'normal' }) => {
    const wallpaperGradient = type === 'teacher'
        ? 'from-blue-900/40 via-slate-900 to-purple-900/40'
        : 'from-cyan-900/20 via-slate-900 to-teal-900/20';

    const cardSize = size === 'large' ? 'max-w-[320px]' : 'max-w-[280px]';
    const screenHeight = size === 'large' ? 'h-56' : 'h-48';
    const avatarSize = size === 'large' ? 'w-28 h-28' : 'w-24 h-24';
    const nameSize = size === 'large' ? 'text-base md:text-lg' : 'text-sm md:text-base';

    return (
        <div className={`group relative mx-auto w-full ${cardSize}`}>

            <div className="relative bg-slate-950 border-[10px] border-slate-800 rounded-t-2xl overflow-hidden transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]">

                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-3 bg-slate-800 rounded-b-md flex items-center justify-center z-20">
                    <div className="w-1 h-1 bg-black rounded-full border-[0.5px] border-slate-600"></div>
                </div>

                <div className={`relative ${screenHeight} flex flex-col items-center justify-center p-4 bg-gradient-to-br ${wallpaperGradient}`}>

                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/5 to-transparent pointer-events-none"></div>

                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>

                    <div className="relative z-10 flex flex-col items-center">
                        {/* Logic: Show Image if provided, else show Icon */}
                        <div className={`${avatarSize} bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-3 shadow-inner border border-white/10 group-hover:scale-110 transition-transform overflow-hidden`}>
                            {image ? (
                                <img
                                    src={image}
                                    alt={name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <Users size={size === 'large' ? 28 : 24} className="text-white" />
                            )}
                        </div>

                        <h4 className={`text-white font-bold ${nameSize} text-center tracking-tight drop-shadow-md`}>
                            {name}
                        </h4>

                        <div className="h-0.5 w-10 bg-cyan-500/50 my-2 rounded-full"></div>

                        <p className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest text-center ${type === 'teacher' ? 'text-blue-300' : 'text-cyan-400'}`}>
                            {role}
                        </p>
                    </div>
                </div>
            </div>

            <div className="relative h-3 w-[112%] -ml-[6%] bg-slate-700 rounded-b-lg shadow-xl flex justify-center items-start border-t border-slate-600">

                <div className="w-16 h-1 bg-slate-600 rounded-b-md"></div>
            </div>

            <div className="absolute -bottom-4 left-0 w-full h-4 bg-gradient-to-b from-cyan-500/10 to-transparent blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[100%]"></div>
        </div>
    );
};

const TimelineItem = ({ number, title, content, align }) => {
    const isLeft = align === 'left';
    return (
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`relative flex flex-col md:flex-row items-center mb-16 md:mb-24 ${isLeft ? '' : 'md:flex-row-reverse'}`}
        >
            <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20">
                 <div className="w-4 h-4 bg-slate-950 border-4 border-cyan-500 rounded-full shadow-[0_0_15px_rgba(6,182,212,1)]"></div>
            </div>

            <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isLeft ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-[2rem] blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    <div className="relative bg-slate-900/40 backdrop-blur-sm border border-white/10 p-8 rounded-[2rem] hover:border-cyan-500/30 transition-all">
                        <span className="text-4xl font-black text-white/5 absolute top-4 right-6">{number}</span>
                        <h3 className="text-xl md:text-2xl font-black text-white mb-4 uppercase italic tracking-tight">{title}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed text-justify">
                            {content}
                        </p>
                    </div>
                </div>
            </div>
             
             <div className="hidden md:block md:w-1/2"></div>
        </motion.div>
    );
};

const FloatingElement = ({ children, delay = 0, duration = 3 }) => (
  <motion.div
    animate={{
      y: [-10, 10, -10],
      rotate: [-2, 2, -2],
    }}
    transition={{
      duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
    className="absolute opacity-20 pointer-events-none"
  >
    {children}
  </motion.div>
);

const TechyBackground = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Techy grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-30"></div>

      {/* Floating tech elements */}
      <motion.div
        className="absolute top-[10%] left-[10%] w-8 h-8 border border-cyan-500/20 rounded-lg rotate-45"
        style={{ x: smoothMouseX, y: smoothMouseY }}
        animate={{
          rotate: [0, 360],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute top-[20%] right-[15%] w-6 h-6 bg-cyan-500/20 rounded-full"
        style={{ x: smoothMouseX, y: smoothMouseY }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-[30%] left-[25%] w-4 h-4 border border-blue-500/15 rounded-full"
        style={{ x: smoothMouseX, y: smoothMouseY }}
        animate={{
          rotate: [0, 180],
          opacity: [0.15, 0.35, 0.15]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

const TechyButton = ({ children, href, icon, className = '' }) => {
  return (
    <motion.a
      href={href}
      className={`inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold uppercase text-xs tracking-widest bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-500/40 hover:text-white transition-all duration-300 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 ${className}`}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </motion.a>
  );
};

const Welcome = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'timeline', 'about', 'team'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '#home', icon: <Sparkles size={18} /> },
    { name: 'Timeline', href: '#timeline', icon: <Clock size={18} /> },
    { name: 'About', href: '#about', icon: <Users size={18} /> },
    { name: 'Team', href: '#team', icon: <GraduationCap size={18} /> },
  ];

  const features = [
    { icon: <BookOpen size={24} />, title: "Interactive Lessons", desc: "Learn ICT & TLE through engaging modules" },
    { icon: <Code size={24} />, title: "Hands-on Projects", desc: "Build real-world skills with practical exercises" },
    { icon: <Trophy size={24} />, title: "Track Progress", desc: "Monitor your learning journey and achievements" },
    { icon: <Lightbulb size={24} />, title: "Smart Quizzes", desc: "Test your knowledge with adaptive assessments" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans scroll-smooth overflow-x-hidden selection:bg-cyan-500/30 selection:text-white">
      <Head title="Welcome to TEchNest" />

      <nav className="bg-slate-950/90 sticky top-0 z-50 shadow-2xl backdrop-blur-xl border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="p-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl shadow-lg"
              >
                <Cpu className="text-white w-5 h-5 md:w-6 md:h-6" />
              </motion.div>
              <span className="text-xl md:text-2xl font-black tracking-tighter text-white italic">
                TEch<span className="text-cyan-400">Nest</span>
              </span>
            </motion.div>

            <div className="hidden md:block">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-4"
              >
                {navigation.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative px-4 py-2 rounded-xl font-bold uppercase text-[10px] tracking-widest text-slate-400 hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="flex items-center space-x-2 relative z-10">{item.icon} <span>{item.name}</span></span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      layoutId={`nav-bg-${item.name}`}
                    />
                  </motion.a>
                ))}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link
                    href={route('login')}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 px-6 py-2.5 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all duration-300 active:scale-95 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
                  >
                    Log In
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            <div className="md:hidden">
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-xl bg-white/5 border border-white/10 text-cyan-400 hover:bg-white/10 transition-all duration-300"
              >
                <motion.div
                  animate={{ rotate: isMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden bg-slate-950/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
            >
              <div className="px-6 py-6 space-y-4">
                {navigation.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 border border-white/5 font-bold uppercase text-sm tracking-widest hover:bg-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300"
                  >
                    {item.icon} <span>{item.name}</span>
                  </motion.a>
                ))}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link
                    href={route('login')}
                    className="flex w-full justify-center bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 py-4 rounded-2xl font-black uppercase text-sm tracking-widest italic shadow-xl hover:shadow-cyan-500/40 transition-all duration-300"
                  >
                    Log In
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <header id="home" className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#020617]">
          <motion.div
            className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
          <motion.div
            className="absolute top-[20%] left-[20%] w-[30%] h-[30%] bg-purple-500/5 rounded-full blur-[80px] pointer-events-none"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.05, 0.08, 0.05],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />

          {/* Floating geometric shapes */}
          <FloatingElement delay={0} duration={4}>
            <div className="w-4 h-4 bg-cyan-500/30 rounded-full top-[15%] left-[10%]" style={{ transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)` }} />
          </FloatingElement>
          <FloatingElement delay={1} duration={5}>
            <div className="w-6 h-6 border border-blue-500/20 rounded-lg top-[25%] right-[15%] rotate-45" style={{ transform: `translate(${mousePosition.x * -0.3}px, ${mousePosition.y * -0.3}px)` }} />
          </FloatingElement>
          <FloatingElement delay={2} duration={3.5}>
            <div className="w-3 h-3 bg-purple-500/25 rounded-full top-[60%] left-[20%]" style={{ transform: `translate(${mousePosition.x * 0.7}px, ${mousePosition.y * 0.7}px)` }} />
          </FloatingElement>
          <FloatingElement delay={0.5} duration={4.5}>
            <div className="w-5 h-5 border border-cyan-400/15 rotate-12 top-[40%] right-[25%]" style={{ transform: `translate(${mousePosition.x * -0.4}px, ${mousePosition.y * -0.4}px)` }} />
          </FloatingElement>
          <FloatingElement delay={3} duration={6}>
            <div className="w-2 h-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full top-[70%] left-[60%]" style={{ transform: `translate(${mousePosition.x * 0.6}px, ${mousePosition.y * 0.6}px)` }} />
          </FloatingElement>
          <FloatingElement delay={1.5} duration={4.8}>
            <div className="w-4 h-4 border border-blue-400/10 rounded-lg top-[50%] left-[70%] rotate-45" style={{ transform: `translate(${mousePosition.x * -0.5}px, ${mousePosition.y * -0.5}px)` }} />
          </FloatingElement>
        </div>

          <div className="max-w-7xl mx-auto z-10">
            <TechyBackground />

            <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8 animate-pulse">
                <Sparkles className="text-cyan-400 mr-2" size={14} />
                <span className="text-cyan-400 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em]">
                  Grade 10 ICT-TLE Learning Hub
                </span>
              </div>

              <motion.h1
                className="text-4xl sm:text-6xl md:text-7xl lg:text-6xl font-black mb-6 leading-tight text-white italic uppercase tracking-tighter"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {["From Classroom", "Dreams to", "TEchNest"].map((line, lineIndex) => (
                  <motion.span
                    key={lineIndex}
                    className="block"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 + lineIndex * 0.2 }}
                  >
                    {lineIndex === 2 ? (
                      <span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">TEchNest</span>
                      </span>
                    ) : (
                      line
                    )}
                  </motion.span>
                ))}
              </motion.h1>

              <p className="text-slate-400 text-base md:text-xl mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium text-center lg:text-left">
                Empowering Grade 10 Students: Our ICT-TLE Learning Journey. From classroom dreams to digital reality - a student-built portal for student success.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href={route('login')} className="flex items-center justify-center bg-cyan-500 text-slate-950 px-8 py-4 rounded-2xl font-black uppercase text-sm tracking-widest italic hover:bg-cyan-400 transition-all active:scale-95 shadow-2xl shadow-cyan-500/20">
                    Start Learning <ArrowRight className="ml-3" size={18} />
                  </Link>
                </motion.div>
                <TechyButton href="#timeline" icon={<Clock size={18} />}>
                  Our Journey
                </TechyButton>
              </div>

              {/* Techy IT Experience Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="bg-slate-900/30 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Terminal className="text-cyan-400 w-6 h-6" />
                    <span className="text-white font-bold text-sm uppercase tracking-wider">IT Experience</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Server className="text-blue-400 w-4 h-4" />
                    <Database className="text-purple-400 w-4 h-4" />
                    <Cloud className="text-white w-4 h-4" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="flex items-center space-x-2">
                    <Code className="text-cyan-400 w-4 h-4" />
                    <span className="text-slate-400">Coding Skills</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Monitor className="text-blue-400 w-4 h-4" />
                    <span className="text-slate-400">Web Development</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <GitBranch className="text-purple-400 w-4 h-4" />
                    <span className="text-slate-400">Version Control</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Keyboard className="text-white w-4 h-4" />
                    <span className="text-slate-400">Keyboard Shortcuts</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-cyan-500/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="text-cyan-400 text-xs font-mono">TEchNest v1.0</div>
                  </div>

                  <div className="space-y-6">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentFeature}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                      >
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-500/20 rounded-2xl mb-4">
                          {features[currentFeature].icon}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{features[currentFeature].title}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">{features[currentFeature].desc}</p>
                      </motion.div>
                    </AnimatePresence>

                    <div className="flex justify-center space-x-2">
                      {features.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentFeature(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === currentFeature ? 'bg-cyan-500 w-6' : 'bg-slate-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              className="flex flex-col items-center text-slate-500"
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className="text-xs font-medium mb-2">Scroll to explore</span>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              >
                <ChevronDown size={20} />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </header>

      <section id="timeline" className="py-32 px-6 relative overflow-hidden bg-gradient-to-b from-transparent via-slate-900/20 to-transparent">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/5 via-transparent to-blue-500/5 pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-24"
          >
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex p-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-2xl mb-8"
            >
              <Clock className="text-white w-10 h-10" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-5xl md:text-7xl font-black text-white mb-6 uppercase italic tracking-tighter"
            >
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Journey</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-cyan-400 text-sm md:text-base font-bold uppercase tracking-[0.2em] max-w-md mx-auto"
            >
              From classroom brainstorm to digital reality
            </motion.p>
          </motion.div>

          <div className="relative">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyan-500 via-blue-600 to-purple-600 rounded-full origin-top"
            />

            <TimelineItem
                number="01"
                title="Conceptualization"
                align="left"
                content="It all began with a classroom discussion and our Research teacher's challenge: build a student-made website for Grade 10 ICT-TLE review and practice. Our team brainstormed an intuitive, welcoming digital space tailored for our batch. We envisioned a 'safe learning home' where knowledge meets comfort. Thus, TEchNest emerged — with 'TEN' proudly representing Grade 10."
            />

            <TimelineItem
                number="02"
                title="Theme Selection"
                align="right"
                content="After picking the name, we talked about colors and vibe. We wanted something modern and techy but not cold or too serious — something that feels welcoming like a real nest. We finally chose deep blue as the main color (for trust and technology) combined with bright cyan/teal accents (for fresh energy and youthfulness). We also selected the Poppins font because it looks clean and modern. Everyone in the group agreed this combination felt 'G10' — professional yet cool."
            />

             <TimelineItem
                number="03"
                title="Development"
                align="left"
                content="This was the longest and most difficult part. We divided the work: some focused on the layout and design, others wrote the content, and a few handled the interactive parts. We built the website step by step: First, the basic structure (Home, About Us, Lessons). Then we applied our chosen colors and made it mobile-friendly. The most fun part was adding the quiz! We made simple multiple-choice questions about ICT topics, and programmed it to show scores with encouraging messages like 'You nailed it!'"
            />

             <TimelineItem
                number="04"
                title="Deployment & Testing"
                align="right"
                content="Once we were happy with how everything looked and worked, we prepared the final version. We tested TEchNest on different phones, laptops, and browsers to make sure it worked perfectly. We shared the prototype with some of our classmates and asked for their honest feedback. They gave us great suggestions, and we quickly made improvements. Finally, TEchNest was no longer just an idea — it became a real, working website made 100% by Grade 10 students for Grade 10 students."
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-20"
          >
            <div className="inline-flex items-center px-6 py-3 bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-full">
              <Star className="text-cyan-400 mr-2" size={16} />
              <span className="text-cyan-300 text-sm font-medium">Ready to start your own journey?</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="py-32 px-6 bg-gradient-to-b from-slate-900/20 via-slate-900/40 to-slate-900/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-cyan-500/5 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-2xl mb-6"
            >
              <Users className="text-white w-8 h-8" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-4xl md:text-6xl font-black text-white mb-6 uppercase italic tracking-tighter"
            >
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">TEchNest</span>
            </motion.h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-20 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 shadow-2xl">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="p-3 bg-cyan-500/20 rounded-2xl">
                      <GraduationCap className="text-cyan-400 w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Our Mission</h3>
                  </div>
                  <p className="text-slate-400 text-base leading-relaxed">
                    <span className="text-white font-bold">TEchNest</span> is a student-led project created by the <span className="text-cyan-400 font-semibold">Grade 10 - Wakelet</span> class of Fort Magsaysay National High School under the ICT-TLE subject. We believe in learning by doing, and this platform represents our commitment to making education accessible, engaging, and fun.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {[
                    { number: "100%", label: "Student Built", icon: <Code size={20} /> },
                    { number: "G10", label: "Focused", icon: <Star size={20} /> },
                    { number: "ICT+TLE", label: "Coverage", icon: <BookOpen size={20} /> },
                    { number: "∞", label: "Learning", icon: <Lightbulb size={20} /> }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-slate-800/30 backdrop-blur-sm border border-white/5 rounded-2xl p-6 text-center hover:border-cyan-500/30 transition-all duration-300"
                    >
                      <div className="text-cyan-400 mb-2">{stat.icon}</div>
                      <div className="text-2xl md:text-3xl font-black text-white mb-1">{stat.number}</div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-3 bg-blue-500/20 rounded-2xl">
                    <Trophy className="text-blue-400 w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">What We Built</h3>
                </div>
                <div className="space-y-6">
                  {[
                    "Interactive learning modules covering ICT and TLE topics",
                    "Progress tracking system to monitor student development",
                    "Smart quiz system with instant feedback and scoring",
                    "Mobile-responsive design for learning anywhere",
                    "Student collaboration features and discussion forums",
                    "Comprehensive resource library with downloadable materials"
                  ].map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex items-start space-x-4"
                    >
                      <div className="mt-1">
                        <div className="w-2 h-2 bg-cyan-500 rounded-full shadow-lg shadow-cyan-500/50"></div>
                      </div>
                      <span className="text-slate-400 text-sm leading-relaxed">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center"
          >
            <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-full backdrop-blur-sm">
              <Zap className="text-cyan-400 mr-3" size={18} />
              <span className="text-cyan-300 font-medium">Built with passion, designed for excellence</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="team" className="py-32 px-6 relative overflow-hidden bg-gradient-to-b from-slate-900/10 via-transparent to-slate-900/10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-24"
            >
                <motion.div
                  initial={{ scale: 0, rotate: -10 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-flex p-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-2xl mb-8"
                >
                  <GraduationCap className="text-white w-10 h-10" />
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter mb-6"
                >
                  The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Developers</span>
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-cyan-400 text-sm md:text-base font-bold uppercase tracking-[0.2em] max-w-md mx-auto"
                >
                  Meet the minds behind TEchNest
                </motion.p>
            </motion.div>

            <div className="mb-24">
                 <motion.div
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   className="text-center mb-16"
                 >
                    <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-full backdrop-blur-sm mb-8">
                      <Star className="text-cyan-400 mr-2" size={16} />
                      <span className="text-cyan-300 font-medium">Our Guiding Stars</span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black text-white uppercase italic tracking-tight mb-4">
                        Advisers & Mentors
                    </h3>
                 </motion.div>
                 <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-20">
                     <motion.div
                       initial={{ opacity: 0, y: 30 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true }}
                       transition={{ duration: 0.6, delay: 0.1 }}
                       className="w-full sm:w-auto"
                     >
                         <LaptopCard
                            name="Irma I. Trinidad"
                            role="Research Adviser"
                            type="teacher"
                            image="images/teacher2.png"
                        />
                     </motion.div>
                     <motion.div
                       initial={{ opacity: 0, y: 30 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true }}
                       transition={{ duration: 0.6, delay: 0.2 }}
                       className="w-full sm:w-auto"
                     >
                         <LaptopCard
                            name="Maximo A. Luna"
                            role="Subject Teacher TLE"
                            type="teacher"
                            image="images/teacher1.png"
                        />
                     </motion.div>
                 </div>
            </div>

            <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-16"
                >
                   <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full backdrop-blur-sm mb-8">
                     <Code className="text-blue-400 mr-2" size={16} />
                     <span className="text-blue-300 font-medium">The Code Warriors</span>
                   </div>
                   <h3 className="text-3xl md:text-4xl font-black text-white uppercase italic tracking-tight mb-4">
                       Research Team
                   </h3>
                </motion.div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">

                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <LaptopCard
                            name="Andrea Kim Huerta"
                            role="Researcher"
                            type="student"
                            image="images/andrea.jpg"
                        />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <LaptopCard
                            name="Gelo Sanchez"
                            role="Researcher"
                            type="student"
                        />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <LaptopCard
                            name="Jericka Ante"
                            role="Researcher"
                            type="student"
                            image="images/jericka.jpg"
                        />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <LaptopCard
                            name="Job Mendoza"
                            role="Researcher"
                            type="student"
                        />
                    </motion.div>
                </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center mt-20"
            >
              <div className="inline-flex items-center px-8 py-4 bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-full">
                <Zap className="text-cyan-400 mr-3" size={18} />
                <span className="text-cyan-300 font-medium">Innovation starts with curiosity</span>
              </div>
            </motion.div>

        </div>
      </section>

      <footer className="py-16 border-t border-white/5 px-6 bg-gradient-to-b from-slate-950 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/5 via-transparent to-blue-500/5 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:col-span-2"
            >
              <div className="flex items-center space-x-3 mb-6">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="p-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl shadow-lg"
                >
                  <Cpu className="text-white w-6 h-6" />
                </motion.div>
                <span className="text-2xl font-black text-white italic uppercase tracking-tighter">
                  TEch<span className="text-cyan-400">Nest</span>
                </span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-md">
                A student-led learning platform designed by Grade 10 students for Grade 10 students. Building the future of education, one line of code at a time.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-slate-500">
                  <BookOpen size={16} />
                  <span className="text-xs font-medium">ICT & TLE Hub</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-500">
                  <Users size={16} />
                  <span className="text-xs font-medium">Student Built</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { name: 'Home', href: '#home' },
                  { name: 'Timeline', href: '#timeline' },
                  { name: 'About', href: '#about' },
                  { name: 'Team', href: '#team' }
                ].map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-cyan-400 text-sm transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-6">Resources</h4>
              <ul className="space-y-3">
                {[
                  { name: 'ICT Modules', href: '#' },
                  { name: 'TLE Guides', href: '#' },
                  { name: 'Practice Quizzes', href: '#' },
                  { name: 'Progress Tracker', href: '#' }
                ].map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-cyan-400 text-sm transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="border-t border-white/5 pt-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 mb-4 md:mb-0">
                <p className="text-slate-500 text-xs font-medium">
                  © 2026 TEchNest. Built by Grade 10 Students.
                </p>
                <div className="flex items-center space-x-4">
                  <span className="text-slate-600 text-xs">Fort Magsaysay National High School</span>
                  <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
                  <span className="text-slate-600 text-xs">ICT-TLE Research Project</span>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-slate-500">
                  <Star size={14} />
                  <span className="text-xs">Made with passion</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-500">
                  <Code size={14} />
                  <span className="text-xs">Student powered</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default Welcome;
