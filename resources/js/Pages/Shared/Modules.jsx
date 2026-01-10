import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { BookOpen, Download, Search, Box, Clock, ChevronRight } from 'lucide-react';

export default function Modules({ auth }) {
    const modules = [
        { id: 1, title: 'Computer Hardware Servicing', code: 'CHS-10', status: 'Available' },
        { id: 2, title: 'Network Configuration', code: 'NET-10', status: 'Available' },
        { id: 3, title: 'Software Development Basics', code: 'SDB-10', status: 'Coming Soon' },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Learning Modules"
        >
            <Head title="Modules" />

            <div className="space-y-6 md:space-y-8">
                {/* --- SEARCH & FILTER --- */}
                <div className="relative w-full max-w-md group px-1 md:px-0">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                    </div>
                    
                    {/* mobile tip: text-base sa mobile para iwas auto-zoom ng iOS */}
                    <input
                        type="text"
                        placeholder="Search modules..."
                        className="block w-full pl-11 pr-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-2xl backdrop-blur-md text-base md:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/40 transition-all shadow-2xl"
                    />
                </div>

                {/* --- MODULES GRID --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {modules.map((mod) => (
                        <div key={mod.id} className="group relative">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-[1.5rem] md:rounded-[2rem] opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500"></div>
                            
                            <div className="relative bg-slate-900/40 backdrop-blur-2xl border border-white/5 p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] shadow-2xl hover:border-cyan-500/30 transition-all overflow-hidden h-full flex flex-col">
                                <div className="flex justify-between items-start mb-4 md:mb-6">
                                    <div className="p-2.5 md:p-3 bg-cyan-500/10 rounded-xl md:rounded-2xl border border-cyan-500/20">
                                        <BookOpen className="text-cyan-400 w-5 h-5 md:w-6 md:h-6" />
                                    </div>
                                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-500">{mod.code}</span>
                                </div>

                                <h3 className="text-base md:text-lg font-black text-white tracking-tight mb-2 group-hover:text-cyan-300 transition-colors">
                                    {mod.title}
                                </h3>
                                
                                <div className="flex items-center text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 md:mb-6">
                                    <Clock size={12} className="me-2" /> 2h 30m reading time
                                </div>

                                <div className="mt-auto flex items-center justify-between pt-4 md:pt-6 border-t border-white/5">
                                    <span className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest ${mod.status === 'Available' ? 'text-cyan-400' : 'text-slate-600'}`}>
                                        {mod.status}
                                    </span>
                                    {mod.status === 'Available' && (
                                        <button className="flex items-center text-[9px] md:text-[10px] font-black uppercase tracking-widest text-white hover:text-cyan-400 transition-colors active:scale-95 transition-transform">
                                            Download <ChevronRight size={14} className="ms-1" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}