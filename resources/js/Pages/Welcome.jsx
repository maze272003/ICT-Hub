import React, { useState } from 'react';
import { 
  Laptop, 
  Cpu, 
  Check, 
  Menu, 
  X, 
  Presentation, 
  UserCog, 
  Clock,
  ChevronRight,
  Sparkles,
  Zap,
  BookOpen,
  Users
} from 'lucide-react';
import { Link } from '@inertiajs/react';

const Welcome = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userName, setUserName] = useState("Student"); 

  const navigation = [
    { name: 'Home', href: '#home', icon: <Sparkles size={18} /> },
    { name: 'About Us', href: '#about', icon: <Users size={18} /> },
    { name: 'Development', href: '#timeline', icon: <Zap size={18} /> },
  ];

  const timelineSteps = [
    { id: 1, title: "Project Conceptualization", description: "Identifying the need for a dedicated ICT portal for FMNHS Grade 10 students.", icon: "💡" },
    { id: 2, title: "Design & Theme Selection", description: "Choosing the Navy Blue and Cyan professional technology aesthetic.", icon: "🎨" },
    { id: 3, title: "Development Phase", description: "Coding the frontend interface using React and integrating student resources.", icon: "⚡" },
    { id: 4, title: "Launch & Deployment", description: "Making TechNest accessible to all Grade 10 ICT-TLE students.", icon: "🚀" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900 font-sans scroll-smooth">
      {/* --- NAVIGATION --- */}
      <nav className="bg-gradient-to-r from-slate-900 to-slate-800 text-white sticky top-0 z-50 shadow-2xl backdrop-blur-lg bg-opacity-95 border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl shadow-lg">
                <Cpu className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  TechNest
                </span>
              </span>
            </div>
            
            <div className="hidden md:block">
              <div className="flex items-center space-x-1">
                {navigation.map((item) => (
                  <a key={item.name} href={item.href} className="group relative px-6 py-3 rounded-xl font-medium hover:bg-slate-800/50 transition-all duration-300 flex items-center space-x-2">
                    <span className="text-cyan-300 group-hover:text-cyan-400 transition-colors">{item.icon}</span>
                    <span className="group-hover:text-cyan-100 transition-colors">{item.name}</span>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-8 h-0.5 bg-cyan-500 rounded-full transition-all duration-300"></div>
                  </a>
                ))}
                
                {/* 2. NAVIGATION ENTER PORTAL BUTTON - Ina-update para sa Login */}
                <Link 
                  href={route('login')} 
                  className="ml-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Enter Portal
                </Link>
              </div>
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-gradient-to-b from-slate-800 to-slate-900 px-4 py-6 space-y-2 border-t border-slate-700/50 backdrop-blur-xl">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="flex items-center space-x-3 px-4 py-4 rounded-xl text-base font-medium hover:bg-slate-700/50 transition-all duration-300 group" onClick={() => setIsMenuOpen(false)}>
                <div className="p-2 bg-slate-700/50 rounded-lg group-hover:bg-cyan-500/20 transition-colors">{item.icon}</div>
                <span className="group-hover:text-cyan-300 transition-colors">{item.name}</span>
                <ChevronRight className="ml-auto text-slate-500 group-hover:text-cyan-400 transition-colors" size={20} />
              </a>
            ))}
            {/* Mobile login link */}
            <Link href={route('login')} className="flex w-full justify-center bg-cyan-500 text-white py-4 rounded-xl font-bold">
              Enter Portal
            </Link>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <header id="home" className="relative min-h-[90vh] flex items-center justify-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900/30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(6,182,212,0.15)_0%,transparent_50%)]"></div>
        </div>
        
        <div className="max-w-6xl z-10 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-8">
            <Sparkles className="text-cyan-400 mr-2" size={16} />
            <span className="text-cyan-400 text-sm font-bold uppercase tracking-widest">Fort Magsaysay National High School</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 leading-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
              Welcome <span className="italic">{userName}</span>
            </span>
            <br />
            <span className="text-white text-4xl md:text-6xl">to TechNest!</span>
          </h1>
          
          <p className="text-slate-300 text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed">
            The specialized digital hub for <span className="relative inline-block"><span className="relative z-10 px-2 font-bold text-cyan-300">Grade 10 ICT-TLE</span><span className="absolute bottom-0 left-0 w-full h-3 bg-cyan-500/30 -rotate-1 -z-0"></span></span> students. Empowering future tech innovators.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            {/* 3. HERO BUTTON - I-route din sa Login para diretso sa portal */}
            <Link 
              href={route('login')} 
              className="group relative inline-flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-12 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/50 transform hover:-translate-y-1"
            >
              <BookOpen className="mr-3" size={22} />
              Explore Platform
              <ChevronRight className="ml-2 group-hover:translate-x-2 transition-transform" size={20} />
            </Link>
            
            <Link 
              href={route('login')}
              className="group relative inline-flex items-center justify-center bg-transparent border-2 border-cyan-500/50 hover:border-cyan-400 text-cyan-300 hover:text-white px-12 py-4 rounded-2xl font-bold text-lg transition-all duration-300 backdrop-blur-sm hover:bg-cyan-500/10"
            >
              View Modules
              <Zap className="ml-3 group-hover:rotate-12 transition-transform" size={20} />
            </Link>
          </div>
        </div>
      </header>

      {/* --- FOCUS SECTION --- */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/50 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center mb-6">
                <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
                <span className="ml-4 text-cyan-600 font-bold uppercase tracking-widest text-sm">Our Focus</span>
              </div>
              
              <h2 className="text-5xl font-black text-slate-900 mb-8">
                Specialized{' '}
                <span className="relative">
                  <span className="relative z-10">Curriculum</span>
                  <div className="absolute bottom-2 left-0 w-full h-4 bg-cyan-400/20 -rotate-1 -z-0"></div>
                </span>
              </h2>
              
              <p className="text-slate-600 mb-10 text-lg leading-relaxed">
                TechNest is centralized exclusively for the <strong className="text-slate-900">Grade 10 level</strong>. 
                We prioritize <strong className="text-cyan-600">ICT components</strong> of TLE to ensure specialized 
                learning for Fort Magsaysay National High School students.
              </p>
              
              <div className="space-y-4">
                {['Grade 10 Specialized Content', 'ICT/TLE Technical Modules', 'Exclusive FMNHS Learning Hub', 'Student-Researcher Collaboration'].map((text, i) => (
                  <div key={i} className="group flex items-center p-4 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                        <Check className="text-white" size={20} strokeWidth={3} />
                      </div>
                    </div>
                    <span className="ml-4 text-slate-800 font-semibold text-lg">{text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-2 gap-8 relative z-10">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl transform group-hover:rotate-3 transition-transform duration-500 blur-xl opacity-50"></div>
                  <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 p-12 rounded-3xl text-center shadow-2xl transform group-hover:-translate-y-2 transition-all duration-500">
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <Laptop className="text-white" size={24} />
                    </div>
                    <Laptop className="text-cyan-400 w-20 h-20 mx-auto mb-8" />
                    <h3 className="text-white font-black text-2xl tracking-tight mb-2">ICT</h3>
                    <p className="text-slate-400">Information & Communication Technology</p>
                  </div>
                </div>
                
                <div className="relative group mt-12">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl transform group-hover:-rotate-3 transition-transform duration-500 blur-xl opacity-50"></div>
                  <div className="relative bg-gradient-to-br from-cyan-500 to-blue-500 p-12 rounded-3xl text-center shadow-2xl transform group-hover:-translate-y-2 transition-all duration-500">
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg">
                      <Cpu className="text-cyan-400" size={24} />
                    </div>
                    <Cpu className="text-white w-20 h-20 mx-auto mb-8" />
                    <h3 className="text-slate-900 font-black text-2xl tracking-tight mb-2">TLE</h3>
                    <p className="text-slate-800">Technology & Livelihood Education</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ABOUT US SECTION --- */}
      <section id="about" className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 mb-6">
              <Users className="text-cyan-600" size={36} />
            </div>
            <h2 className="text-6xl font-black text-slate-900 mb-6">
              Meet <span className="text-transparent bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text">Our Team</span>
            </h2>
            <p className="text-slate-600 text-xl max-w-2xl mx-auto">
              The dedicated mentors and creators shaping the future of ICT education.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Teacher Card */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl transform group-hover:rotate-2 transition-transform duration-500 opacity-0 group-hover:opacity-100 blur-xl"></div>
              <div className="relative bg-white p-8 rounded-3xl shadow-xl border border-slate-200 hover:border-transparent transition-all duration-500 transform group-hover:-translate-y-2">
                <div className="w-24 h-24 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center transform group-hover:rotate-3 transition-transform duration-500 shadow-lg">
                  <Presentation className="text-cyan-400" size={48} />
                </div>
                <h3 className="font-black text-2xl text-slate-900 mb-2">Mr. John Smith</h3>
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-cyan-500/10 mb-4">
                  <span className="text-cyan-600 font-bold text-sm uppercase tracking-widest">ICT-TLE Faculty</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Expert mentor with 10+ years experience in ICT education, providing curriculum oversight for Grade 10 ICT.
                </p>
              </div>
            </div>

            {/* Researcher Cards */}
            {[
              { name: "Sarah Johnson", role: "Lead Researcher", desc: "Full-stack developer focused on creating intuitive learning experiences." },
              { name: "Michael Chen", role: "UX Researcher", desc: "Specializes in user-centered design and educational technology." }
            ].map((researcher, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl transform group-hover:rotate-2 transition-transform duration-500 opacity-0 group-hover:opacity-100 blur-xl"></div>
                <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl shadow-xl border border-slate-800 hover:border-transparent transition-all duration-500 transform group-hover:-translate-y-2">
                  <div className="w-24 h-24 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center transform group-hover:-rotate-3 transition-transform duration-500">
                    <UserCog className="text-cyan-300" size={48} />
                  </div>
                  <h3 className="font-black text-2xl text-white mb-2">{researcher.name}</h3>
                  <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-cyan-500/20 mb-4">
                    <span className="text-cyan-300 font-bold text-sm uppercase tracking-widest">{researcher.role}</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {researcher.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TIMELINE SECTION --- */}
      <section id="timeline" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1)_0%,transparent_50%)]"></div>
        
        <div className="max-w-6xl mx-auto px-4 relative">
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 mb-6">
              <Clock className="text-cyan-400" size={36} />
            </div>
            <h2 className="text-5xl font-black text-white mb-4">
              Development <span className="text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text">Timeline</span>
            </h2>
            <p className="text-slate-400 text-xl">How TechNest evolved from idea to reality</p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyan-500 via-blue-500 to-cyan-500"></div>
            
            {timelineSteps.map((step, index) => (
              <div 
                key={step.id} 
                className={`relative flex items-center mb-16 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
                    <div className="relative bg-slate-800/50 backdrop-blur-sm p-8 rounded-3xl border border-slate-700/50 group-hover:border-cyan-500/50 transition-all duration-500">
                      <div className="text-3xl mb-4">{step.icon}</div>
                      <h3 className="text-cyan-400 font-black text-xl mb-3">{step.title}</h3>
                      <p className="text-slate-400 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
                
                {/* Center indicator */}
                <div className="absolute left-1/2 transform -translate-x-1/2">
                  <div className="relative">
                    <div className="w-6 h-6 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-lg shadow-cyan-500/50"></div>
                    <div className="absolute inset-0 animate-ping bg-cyan-500 rounded-full opacity-20"></div>
                  </div>
                </div>
                
                {/* Step number */}
                <div className={`absolute left-1/2 transform -translate-x-1/2 ${
                  index % 2 === 0 ? '-translate-x-16' : 'translate-x-16'
                }`}>
                  <div className="w-12 h-12 bg-slate-900 border-4 border-cyan-500 rounded-2xl flex items-center justify-center font-black text-cyan-400 shadow-xl">
                    {step.id}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-gradient-to-b from-slate-900 to-slate-950 py-16 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center space-x-3 mb-8">
              <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl">
                <Cpu className="text-white" size={28} />
              </div>
              <span className="text-3xl font-black tracking-tight">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  TechNest
                </span>
              </span>
            </div>
            
            <p className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-6">
              Grade 10 ICT-TLE Digital Portal
            </p>
            
            <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
              Empowering the next generation of tech innovators at Fort Magsaysay National High School.
            </p>
            
            <div className="flex justify-center space-x-6 mb-12">
              <a href="#home" className="text-slate-500 hover:text-cyan-400 transition-colors">Home</a>
              <a href="#about" className="text-slate-500 hover:text-cyan-400 transition-colors">About</a>
              <a href="#timeline" className="text-slate-500 hover:text-cyan-400 transition-colors">Development</a>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800 text-center">
            <p className="text-slate-600 font-bold uppercase tracking-widest text-sm">
              © {new Date().getFullYear()} Fort Magsaysay National High School • Developed with ❤️ for Education
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Welcome;