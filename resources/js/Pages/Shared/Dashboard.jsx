import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { GraduationCap, Layers, Search, ArrowRight, BookOpen, BrainCircuit, Info } from 'lucide-react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Student Dashboard"
        >
            <Head title="Home" />

            <div className="space-y-12">
                
                {/* --- HERO SECTION (Welcome Message) --- */}
                <div className="relative group">
                    {/* Background Glow Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-teal-400 rounded-[2.5rem] blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
                    
                    <div className="relative bg-slate-900/60 backdrop-blur-3xl border border-white/10 overflow-hidden shadow-2xl rounded-[2.5rem] p-8 md:p-16 text-center">
                        
                        {/* Decorative Icon */}
                        <div className="flex justify-center mb-6">
                            <div className="p-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-lg shadow-cyan-500/20 transform -rotate-6 hover:rotate-0 transition-transform duration-500">
                                <GraduationCap className="text-white w-10 h-10" />
                            </div>
                        </div>

                        {/* Main Headlines */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4 leading-tight">
                            Welcome <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">{auth.user.name}</span> to TechNest!
                        </h1>
                        
                        <h2 className="text-lg md:text-2xl font-bold text-cyan-100/80 italic tracking-wide mb-8">
                            Your Cozy Home for Grade 10 ICT & TLE Learning!
                        </h2>

                        {/* Subheadline / Tagline */}
                        <div className="max-w-3xl mx-auto mb-12">
                            <p className="text-slate-400 text-sm md:text-base font-medium leading-relaxed">
                                <span className="text-cyan-400 font-bold uppercase tracking-wider block mb-2 text-xs">Hey, fellow Grade 10 warriors!</span>
                                This is our little nest — created especially for us Grade 10 ICT-TLE students. 
                                Here you can review lessons, try quick quizzes, and level up your knowledge about Research and TLE, anytime, anywhere!
                            </p>
                        </div>

                        {/* Call-to-Action Buttons */}
                        <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full md:w-auto">
                            
                            {/* Button 1: View Lessons */}
                            <a href="#lessons" className="w-full md:w-auto group relative px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-black uppercase tracking-widest rounded-xl transition-all hover:-translate-y-1 shadow-lg shadow-cyan-500/25 flex items-center justify-center">
                                <BookOpen className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                                View Lessons
                            </a>

                            {/* Button 2: Take Quiz */}
                            <a href="#quiz" className="w-full md:w-auto group relative px-8 py-4 bg-slate-800 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-950/50 hover:border-cyan-400 font-black uppercase tracking-widest rounded-xl transition-all hover:-translate-y-1 flex items-center justify-center">
                                <BrainCircuit className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                                Take a Quick Quiz
                            </a>

                             {/* Button 3: Learn More */}
                             <a href="#about" className="w-full md:w-auto group px-8 py-4 text-slate-500 hover:text-white font-bold uppercase tracking-widest text-xs transition-colors flex items-center justify-center">
                                Learn More
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </a>

                        </div>
                    </div>
                </div>

                {/* --- EXISTING TILES (OPTIONAL: Pwede mong tanggalin kung gusto mo purely welcome page lang) --- */}
                {/* Nilagyan ko ng divider text para clear na "Shortcuts" ito */}
                <div>
                    <h3 className="text-slate-500 text-xs font-black uppercase tracking-[0.3em] mb-6 ml-2">Quick Access Tiles</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        
                        {/* Modules Tile */}
                        <Link href={route('dashboard.modules')} className="group relative bg-slate-900/40 border border-white/5 p-8 rounded-[2rem] hover:bg-white/5 hover:border-cyan-500/30 transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400">
                                    <Layers size={24} />
                                </div>
                                <ArrowRight size={20} className="text-slate-600 group-hover:text-cyan-400 -translate-x-2 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all" />
                            </div>
                            <h4 className="text-white font-bold text-lg">My Modules</h4>
                            <p className="text-slate-500 text-xs mt-2">Access learning materials.</p>
                        </Link>

                        {/* Research Tile */}
                        <Link href={route('dashboard.research')} className="group relative bg-slate-900/40 border border-white/5 p-8 rounded-[2rem] hover:bg-white/5 hover:border-blue-500/30 transition-all duration-300">
                             <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
                                    <Search size={24} />
                                </div>
                                <ArrowRight size={20} className="text-slate-600 group-hover:text-blue-400 -translate-x-2 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all" />
                            </div>
                            <h4 className="text-white font-bold text-lg">Research</h4>
                            <p className="text-slate-500 text-xs mt-2">Track progress & docs.</p>
                        </Link>

                        {/* Placeholder */}
                        <div className="border border-dashed border-white/10 rounded-[2rem] flex items-center justify-center p-8 opacity-40">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Coming Soon</span>
                        </div>

                    </div>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}