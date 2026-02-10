import React, { useState } from 'react';
import { 
  Laptop, Cpu, Check, Menu, X, Sparkles, 
  Zap, BookOpen, Users, Clock, ArrowRight, GraduationCap 
} from 'lucide-react';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';

// 1. Updated Component to accept 'image' prop
const LaptopCard = ({ name, role, type, image }) => {
    const wallpaperGradient = type === 'teacher' 
        ? 'from-blue-900/40 via-slate-900 to-purple-900/40' 
        : 'from-cyan-900/20 via-slate-900 to-teal-900/20';  

    return (
        <div className="group relative mx-auto w-full max-w-[280px]"> 
            
            <div className="relative bg-slate-950 border-[10px] border-slate-800 rounded-t-2xl overflow-hidden transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]">
                
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-3 bg-slate-800 rounded-b-md flex items-center justify-center z-20">
                    <div className="w-1 h-1 bg-black rounded-full border-[0.5px] border-slate-600"></div>
                </div>

                <div className={`relative h-48 flex flex-col items-center justify-center p-4 bg-gradient-to-br ${wallpaperGradient}`}>
                    
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/5 to-transparent pointer-events-none"></div>

                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>

                    <div className="relative z-10 flex flex-col items-center">
                        {/* Logic: Show Image if provided, else show Icon */}
                        <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-3 shadow-inner border border-white/10 group-hover:scale-110 transition-transform overflow-hidden">
                            {image ? (
                                <img 
                                    src={image} 
                                    alt={name} 
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <Users size={24} className="text-white" />
                            )}
                        </div>
                        
                        <h4 className="text-white font-bold text-sm md:text-base text-center tracking-tight drop-shadow-md">
                            {name}
                        </h4>
                        
                        <div className="h-0.5 w-10 bg-cyan-500/50 my-2 rounded-full"></div>

                        <p className={`text-[9px] font-black uppercase tracking-widest text-center ${type === 'teacher' ? 'text-blue-300' : 'text-cyan-400'}`}>
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

const Welcome = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '#home', icon: <Sparkles size={18} /> },
    { name: 'Timeline', href: '#timeline', icon: <Clock size={18} /> },
    { name: 'About', href: '#about', icon: <Users size={18} /> },
    { name: 'Team', href: '#team', icon: <GraduationCap size={18} /> },
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans scroll-smooth overflow-x-hidden selection:bg-cyan-500/30 selection:text-white">
      <Head title="Welcome to TEchNest" />

      <nav className="bg-slate-950/80 sticky top-0 z-50 shadow-2xl backdrop-blur-xl border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center space-x-3">
              {/* --- CHANGED: Replaced Icon with School Logo --- */}
              <div className="w-10 h-10 bg-white rounded-xl shadow-lg p-0.5 overflow-hidden flex items-center justify-center">
                <img src="/images/fmnhs.png" alt="School Logo" className="w-full h-full object-cover rounded-lg" />
              </div>
              {/* ----------------------------------------------- */}
              <span className="text-xl md:text-2xl font-black tracking-tighter text-white italic">
                TEch<span className="text-cyan-400">Nest</span>
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
                  Log In
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
                Log In
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <header id="home" className="relative min-h-[90vh] flex items-center justify-center px-6 overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[#020617]">
          <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="max-w-5xl z-10 text-center">
          
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8 animate-pulse">
            <Sparkles className="text-cyan-400 mr-2" size={14} />
            <span className="text-cyan-400 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em]">
              Grade 10 ICT-TLE Learning Hub
            </span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black mb-6 leading-tight text-white italic uppercase tracking-tighter">
            From Classroom <br className="hidden md:block" />
            Brainstorm to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">TEchNest</span>
          </h1>

          <p className="text-slate-400 text-sm md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
              Building Our Grade 10 ICT-TLE Learning Hub. The journey from a simple idea to a fully functional student portal.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <a href="#timeline" className="flex items-center justify-center bg-cyan-500 text-slate-950 px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-widest italic hover:bg-cyan-400 transition-all active:scale-95 shadow-2xl shadow-cyan-500/20">
               View The Journey <ArrowRight className="ml-3" size={16} />
             </a>
          </div>
        </motion.div>
      </header>

      <section id="timeline" className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10">
          
          <motion.div {...fadeIn} className="text-center mb-20">
            <div className="inline-flex p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg mb-6 transform -rotate-3">
                 <Clock className="text-white w-8 h-8" />
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase italic tracking-tighter">
              Timeline
            </h2>
            <p className="text-cyan-400 text-xs font-black uppercase tracking-[0.4em]">
              From Idea to Reality
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyan-500/50 via-blue-600/50 to-transparent rounded-full"></div>

            <TimelineItem 
                number="01"
                title="Conceptualization"
                align="left"
                content="Everything started with a simple class discussion and the challenge given by our Research teacher: create a student-made website that would help Grade 10 learners review and practice ICT and TLE topics. Our group sat together during class and brainstormed what we really needed — a fun, easy-to-use, cozy digital space made just for Grade 10 batch. We decided the website should feel like a “home” where we could safely learn. That’s when the name TEchNest was born — with “TEN” proudly standing for Grade 10."
            />

            <TimelineItem 
                number="02"
                title="Theme Selection"
                align="right"
                content="After picking the name, we talked about colors and vibe. We wanted something modern and techy but not cold or too serious — something that feels welcoming like a real nest. We finally chose deep blue as the main color (for trust and technology) combined with bright cyan/teal accents (for fresh energy and youthfulness). We also selected the Poppins font because it looks clean and modern. Everyone in the group agreed this combination felt “G10” — professional yet cool."
            />

             <TimelineItem 
                number="03"
                title="Development"
                align="left"
                content="This was the longest and most difficult part. We divided the work: some focused on the layout and design, others wrote the content, and a few handled the interactive parts. We built the website step by step: First, the basic structure (Home, About Us, Lessons). Then we applied our chosen colors and made it mobile-friendly. The most fun part was adding the quiz! We made simple multiple-choice questions about ICT topics, and programmed it to show scores with encouraging messages like “You nailed it!”"
            />

             <TimelineItem 
                number="04"
                title="Deployment & Testing"
                align="right"
                content="Once we were happy with how everything looked and worked, we prepared the final version. We tested TEchNest on different phones, laptops, and browsers to make sure it worked perfectly. We shared the prototype with some of our classmates and asked for their honest feedback. They gave us great suggestions, and we quickly made improvements. Finally, TEchNest was no longer just an idea — it became a real, working website made 100% by Grade 10 students for Grade 10 students."
            />
          </div>
        </div>
      </section>

      <section id="about" className="py-24 px-6 bg-slate-900/30 border-y border-white/5">
        <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                
                <motion.div {...fadeIn}>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-8 uppercase italic tracking-tighter">
                        About <span className="text-cyan-400">TEchNest</span>
                    </h2>
                    
                    <div className="space-y-6 text-slate-400 text-sm md:text-base leading-relaxed font-medium">
                        <p>
                            <span className="text-white font-bold">TEchNest</span> is a student-led project created by the <span className="text-cyan-400">Grade 10 - Wakelet</span> class of Fort Magsaysay National High School under the ICT-TLE subject.
                        </p>
                        
                        <p>We built this website to:</p>

                        <ul className="space-y-4 mt-4">
                            {[
                                "Help our fellow G10 students review and master ICT & TLE topics anytime.",
                                "Showcase what we've learned in HTML, CSS, and basic web design.",
                                "Create a fun, safe space just for each ICT-TLE batch to learn and grow."
                            ].map((item, index) => (
                                <li key={index} className="flex items-start">
                                    <div className="mr-4 mt-1 bg-cyan-500/20 p-1 rounded">
                                        <Check size={14} className="text-cyan-400" strokeWidth={3} />
                                    </div>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </motion.div>

                <motion.div {...fadeIn} className="relative">
                    <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-[2rem] blur opacity-20"></div>
                    <div className="relative aspect-video bg-slate-800 rounded-[2rem] border border-white/10 flex items-center justify-center overflow-hidden group">
                        <div className="text-center">
                            <Users size={48} className="text-slate-600 mx-auto mb-4 group-hover:text-cyan-400 transition-colors" />
                            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Researchers Group Photo</p>
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
      </section>

      <section id="team" className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
            <motion.div {...fadeIn} className="text-center mb-20">
                <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-4">
                    The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Developers</span>
                </h2>
                <p className="text-slate-400 text-sm font-medium max-w-2xl mx-auto">
                    Meet the team behind the screen. Grade 10 ICT-TLE Researchers and Advisers.
                </p>
            </motion.div>

            <div className="mb-20">
                 <h3 className="text-center text-slate-500 font-black uppercase tracking-[0.4em] text-xs mb-10 flex items-center justify-center gap-4">
                    <span className="h-px w-12 bg-slate-700"></span>
                    Advisers & Mentors
                    <span className="h-px w-12 bg-slate-700"></span>
                 </h3>
                 <div className="flex flex-wrap justify-center gap-10 md:gap-16">
                     {/* 2. Inserted images for the Advisers here */}
                     <LaptopCard 
                        name="Irma I. Trinidad" 
                        role="Research Adviser" 
                        type="teacher" 
                        image="images/teacher2.png"
                    />
                     <LaptopCard 
                        name="Maximo A. Luna" 
                        role="Subject Teacher TLE" 
                        type="teacher" 
                        image="images/teacher1.png"
                    />
                 </div>
            </div>

            <div>
                <h3 className="text-center text-slate-500 font-black uppercase tracking-[0.4em] text-xs mb-10 flex items-center justify-center gap-4">
                    <span className="h-px w-12 bg-slate-700"></span>
                    Research Team
                    <span className="h-px w-12 bg-slate-700"></span>
                 </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                    
                    {/* Updated: Andrea Kim Huerta with Image */}
                    <LaptopCard 
                        name="Andrea Kim Huerta" 
                        role="Researcher" 
                        type="student" 
                        image="images/andrea.jpg"
                    />

                    {/* No image yet for Gelo - defaults to Icon */}
                    <LaptopCard 
                        name="Marc Gelo Sanchez" 
                        role="Researcher" 
                        type="student" 
                        image="images/marc.jpg"
                    />

                    {/* Updated: Jericka Ante with Image */}
                    <LaptopCard 
                        name="Jericka Ante" 
                        role="Researcher" 
                        type="student" 
                        image="images/jericka.jpg"
                    />

                    {/* No image yet for Job - defaults to Icon */}
                    <LaptopCard 
                        name="Job Mendoza" 
                        role="Researcher" 
                        type="student" 
                        image="images/job.jpg"
                    />
                </div>
            </div>

        </div>
      </section>

      <footer className="py-12 border-t border-white/5 text-center px-6 bg-slate-950">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Cpu className="text-cyan-500 w-5 h-5" />
          <span className="text-xl font-black text-white italic uppercase tracking-tighter">TEch<span className="text-cyan-400">Nest</span></span>
        </div>
        <p className="text-slate-600 text-[10px] font-bold uppercase tracking-[0.3em]">
           Fort Magsaysay National High School • 2026
        </p>
      </footer>
    </div>
  );
};

export default Welcome;