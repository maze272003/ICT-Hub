// resources/js/Pages/Student/Dashboard.jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { GraduationCap, Layers, Search, ArrowRight } from 'lucide-react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Student Dashboard"
        >
            <Head title="Student Dashboard" />

            <div className="space-y-10">
                {/* --- WELCOME GLASS CARD --- */}
                <div className="relative group">
                    {/* Outer Ambient Glow */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-[2rem] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
                    
                    <div className="relative bg-slate-900/40 backdrop-blur-2xl border border-white/5 overflow-hidden shadow-2xl rounded-[2rem] p-8 md:p-12">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                            {/* Animated Icon Container */}
                            <div className="relative">
                                <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full animate-pulse"></div>
                                <div className="relative p-5 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-xl shadow-cyan-500/20">
                                    <GraduationCap className="text-white w-10 h-10" />
                                </div>
                            </div>
                            
                            <div>
                                <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                                    Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">{auth.user.name}</span>!
                                </h3>
                                <p className="text-slate-400 text-sm md:text-base font-medium mt-2 max-w-xl leading-relaxed">
                                    You are currently accessed as a <span className="text-cyan-400/80 font-bold">Grade 10 ICT-TLE Student</span>. Ready to dive into your technical modules?
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- TILES GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    
                    {/* Modules Card */}
                    <div className="group relative bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-500 cursor-pointer overflow-hidden shadow-xl">
                        {/* Inner Ambient Light */}
                        <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all"></div>
                        
                        <div className="relative z-10">
                            <div className="p-4 bg-cyan-500/10 rounded-2xl w-fit mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                                <Layers className="text-cyan-400 w-7 h-7" />
                            </div>
                            <h4 className="text-white font-black text-xl tracking-wider uppercase">My Modules</h4>
                            <p className="text-slate-500 text-xs mt-3 leading-relaxed font-medium">
                                Access and download your specialized ICT learning materials and technical guides.
                            </p>
                            
                            <div className="mt-8 flex items-center text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em] group-hover:tracking-[0.3em] transition-all">
                                Open Library
                                <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-2 transition-transform" />
                            </div>
                        </div>
                    </div>

                    {/* Practical Research Card */}
                    <div className="group relative bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 hover:border-blue-500/50 transition-all duration-500 cursor-pointer overflow-hidden shadow-xl">
                        {/* Inner Ambient Light */}
                        <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all"></div>
                        
                        <div className="relative z-10">
                            <div className="p-4 bg-blue-500/10 rounded-2xl w-fit mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                                <Search className="text-blue-400 w-7 h-7" />
                            </div>
                            <h4 className="text-white font-black text-xl tracking-wider uppercase">Research</h4>
                            <p className="text-slate-500 text-xs mt-3 leading-relaxed font-medium">
                                Monitor your Practical Research progress, documentation, and technical requirements.
                            </p>
                            
                            <div className="mt-8 flex items-center text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] group-hover:tracking-[0.3em] transition-all">
                                View Progress
                                <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-2 transition-transform" />
                            </div>
                        </div>
                    </div>

                    {/* Future Additions Placeholder */}
                    <div className="border-2 border-dashed border-white/5 rounded-[2rem] flex items-center justify-center p-8 opacity-30 hover:opacity-50 transition-opacity">
                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">More Features Coming Soon</p>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}