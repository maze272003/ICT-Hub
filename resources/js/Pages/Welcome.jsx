import React, { useState } from 'react';
import { 
  Laptop, Cpu, Check, Menu, X, Sparkles, 
  Zap, BookOpen, Users, Clock 
} from 'lucide-react';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';

const Welcome = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userName] = useState("Student");

  const navigation = [
    { name: 'Home', href: '#home', icon: <Sparkles size={18} /> },
    { name: 'About', href: '#about', icon: <Users size={18} /> },
    { name: 'Dev', href: '#timeline', icon: <Zap size={18} /> },
  ];

  const timelineSteps = [
    { id: 1, title: "Conceptualization", description: "Identifying the need for a dedicated ICT portal for FMNHS Grade 10 students.", icon: "💡" },
    { id: 2, title: "Theme Selection", description: "Choosing the Navy Blue and Cyan professional technology aesthetic.", icon: "🎨" },
    { id: 3, title: "Development", description: "Coding the frontend interface using React and integrating student resources.", icon: "⚡" },
    { id: 4, title: "Deployment", description: "Making TechNest accessible to all Grade 10 ICT-TLE students.", icon: "🚀" }
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans scroll-smooth overflow-x-hidden">
      <Head title="Welcome to TechNest" />
      {/* --- NAVIGATION --- */}
      <nav className="bg-slate-950/80 sticky top-0 z-50 shadow-2xl backdrop-blur-xl border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl shadow-lg">
                <Cpu className="text-white w-5 h-5 md:w-6 md:h-6" />
              </div>
              <span className="text-xl md:text-2xl font-black tracking-tighter text-white italic">
                Tech<span className="text-cyan-400">Nest</span>
              </span>
            </motion.div>
            <div className="hidden md:block">
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center space-x-1">
                {navigation.map((item) => (
                  <a key={item.name} href={item.href} className="group relative px-4 py-2 rounded-xl font-bold uppercase text-[10px] tracking-widest text-slate-400 hover:text-white transition-all">
                    <span className="flex items-center space-x-2">{item.icon} <span>{item.name}</span></span>
                  </a>
                ))}
                <Link href={route('login')} className="ml-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-6 py-2.5 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all active:scale-95 shadow-lg shadow-cyan-500/20">
                  Enter Portal
                </Link>
              </motion.div>
            </div>
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-xl bg-white/5 border border-white/10 text-cyan-400">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-slate-950 border-b border-white/10 p-6 space-y-3 overflow-hidden">
              {navigation.map((item) => (
                <a key={item.name} href={item.href} className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 border border-white/5 font-bold uppercase text-xs tracking-widest" onClick={() => setIsMenuOpen(false)}>
                  {item.icon} <span>{item.name}</span>
                </a>
              ))}
              <Link href={route('login')} className="flex w-full justify-center bg-cyan-500 text-slate-950 py-4 rounded-2xl font-black uppercase text-xs tracking-widest italic shadow-xl">
                Launch Portal
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      {/* --- HERO SECTION --- */}
      <header id="home" className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#020617]">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1)_0%,transparent_70%)]"></div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="max-w-4xl z-10 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8">
            <Sparkles className="text-cyan-400 mr-2" size={14} />
            <span className="text-cyan-400 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em]">Fort Magsaysay National High School</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black mb-6 leading-tight text-white italic uppercase tracking-tighter">
            Welcome <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{userName}</span>
            <br />
            to TechNest!
          </h1>
          <p className="text-slate-400 text-sm md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
            The specialized digital hub for <span className="text-cyan-400 font-bold italic">Grade 10 ICT-TLE</span> students. Empowering future tech innovators with centralized resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={route('login')} className="flex items-center justify-center bg-cyan-500 text-slate-950 px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-widest italic hover:bg-cyan-400 transition-all active:scale-95 shadow-2xl shadow-cyan-500/20">
              <BookOpen className="mr-3" size={18} /> Explore Platform
            </Link>
            <Link href={route('login')} className="flex items-center justify-center bg-white/5 border border-white/10 text-white px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-widest italic hover:bg-white/10 transition-all">
              View Modules <Zap className="ml-3" size={18} />
            </Link>
          </div>
        </motion.div>
      </header>
      {/* --- FOCUS SECTION --- */}
      <section id="about" className="py-20 md:py-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div {...fadeIn} className="order-2 lg:order-1">
            <div className="flex items-center mb-6">
              <div className="w-12 h-1 bg-cyan-500 rounded-full"></div>
              <span className="ml-4 text-cyan-500 font-black uppercase tracking-[0.3em] text-[10px]">Our Focus</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-8 italic uppercase tracking-tight">
              Specialized <span className="text-cyan-400 underline decoration-cyan-500/30">Curriculum</span>
            </h2>
            <p className="text-slate-400 mb-10 text-base md:text-lg leading-relaxed">
              TechNest is centralized exclusively for the <strong className="text-white">Grade 10 level</strong>. We prioritize the <strong className="text-cyan-400 italic">ICT components</strong> of TLE to ensure specialized learning for FMNHS students.
            </p>
            <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="grid sm:grid-cols-2 gap-4">
              {['G10 Content', 'ICT Modules', 'FMNHS Hub', 'Collaboration'].map((text, i) => (
                <motion.div variants={fadeIn} key={i} className="flex items-center p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all group">
                  <div className="w-8 h-8 bg-cyan-500/10 rounded-lg flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all">
                    <Check size={16} strokeWidth={4} />
                  </div>
                  <span className="ml-4 text-slate-300 font-black uppercase text-[10px] tracking-widest">{text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="order-1 lg:order-2 grid grid-cols-2 gap-4 md:gap-8">
            <div className="bg-slate-900/60 backdrop-blur-xl border border-white/5 p-8 md:p-12 rounded-[2rem] text-center shadow-2xl">
              <Laptop className="text-cyan-400 w-12 h-12 md:w-16 md:h-16 mx-auto mb-6" />
              <h3 className="text-white font-black text-xl uppercase italic">ICT</h3>
            </div>
            <div className="bg-cyan-500 p-8 md:p-12 rounded-[2rem] text-center shadow-2xl mt-8">
              <Cpu className="text-slate-950 w-12 h-12 md:w-16 md:h-16 mx-auto mb-6" />
              <h3 className="text-slate-950 font-black text-xl uppercase italic">TLE</h3>
            </div>
          </motion.div>
        </div>
      </section>
      {/* --- TIMELINE SECTION --- */}
      <section id="timeline" className="py-20 md:py-32 px-6 bg-slate-950/50">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-16 md:mb-24">
            <Clock className="text-cyan-500 mx-auto mb-6" size={40} />
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase italic">Timeline</h2>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em]">From idea to reality</p>
          </motion.div>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-white/10"></div>
            {timelineSteps.map((step, index) => (
              <motion.div key={step.id} initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className={`relative flex items-center mb-12 md:mb-20 ps-12 md:ps-0 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className={`w-full md:w-[45%] ${index % 2 === 0 ? 'md:text-right md:pe-12' : 'md:text-left md:ps-12'}`}>
                  <div className="bg-white/5 backdrop-blur-md p-6 md:p-8 rounded-[2rem] border border-white/5 hover:border-cyan-500/30 transition-all">
                    <div className="text-2xl mb-4">{step.icon}</div>
                    <h3 className="text-cyan-400 font-black text-lg md:text-xl mb-2 uppercase italic tracking-tighter">{step.title}</h3>
                    <p className="text-slate-500 text-xs md:text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} className="w-4 h-4 bg-cyan-500 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.5)] border-4 border-[#020617]"></motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* --- FOOTER --- */}
      <footer className="py-20 border-t border-white/5 text-center px-6">
        <div className="flex items-center justify-center space-x-3 mb-8">
          <div className="p-2 bg-cyan-500 rounded-lg"><Cpu className="text-slate-950 w-5 h-5" /></div>
          <span className="text-2xl font-black text-white italic uppercase tracking-tighter">Tech<span className="text-cyan-400">Nest</span></span>
        </div>
        <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.5em] leading-loose">
          Grade 10 ICT-TLE Portal • {new Date().getFullYear()} <br />
          Fort Magsaysay National High School
        </p>
      </footer>
    </div>
  );
};

export default Welcome;