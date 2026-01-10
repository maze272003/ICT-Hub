import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { FileText, CheckCircle2, Clock, Download, Upload } from 'lucide-react';

export default function Research({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Practical Research"
        >
            <Head title="Research Progress" />

            <div className="space-y-8">
                {/* --- PROGRESS OVERVIEW (Static) --- */}
                <div className="relative bg-slate-900/40 backdrop-blur-2xl border border-white/5 p-8 rounded-[2rem] shadow-2xl overflow-hidden">
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px]"></div>
                    
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <h3 className="text-2xl font-black text-white tracking-tight italic uppercase">Overall Progress</h3>
                            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">Technical Documentation Status</p>
                        </div>
                        <div className="flex items-end gap-2">
                            <span className="text-5xl font-black text-blue-400 italic">45%</span>
                            <span className="text-slate-500 text-[10px] font-black uppercase mb-2 tracking-widest">Completed</span>
                        </div>
                    </div>
                    
                    <div className="relative w-full h-3 bg-white/5 rounded-full mt-8 overflow-hidden border border-white/5">
                        <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 to-cyan-400 w-[45%] shadow-[0_0_15px_rgba(37,99,235,0.5)]"></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* --- MILESTONES (Hardcoded Static List) --- */}
                    <div className="lg:col-span-2 space-y-4">
                        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">Milestones</h4>
                        
                        {/* Chapter 1 */}
                        <div className="flex items-center justify-between p-5 bg-white/[0.03] border border-white/[0.05] rounded-2xl">
                            <div className="flex items-center gap-4">
                                <CheckCircle2 className="text-cyan-400" size={20} />
                                <div>
                                    <div className="text-sm font-black text-white italic tracking-tight">Chapter 1: The Problem</div>
                                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Jan 05, 2026</div>
                                </div>
                            </div>
                            <span className="text-[9px] font-black uppercase px-3 py-1 rounded-full border border-cyan-500/30 text-cyan-400 bg-cyan-500/5">Completed</span>
                        </div>

                        {/* Chapter 2 */}
                        <div className="flex items-center justify-between p-5 bg-white/[0.03] border border-white/[0.05] rounded-2xl">
                            <div className="flex items-center gap-4">
                                <Clock className="text-blue-400" size={20} />
                                <div>
                                    <div className="text-sm font-black text-white italic tracking-tight">Chapter 2: RRL</div>
                                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Ongoing</div>
                                </div>
                            </div>
                            <span className="text-[9px] font-black uppercase px-3 py-1 rounded-full border border-blue-500/30 text-blue-400 bg-blue-500/5">In Progress</span>
                        </div>

                        {/* Chapter 3 */}
                        <div className="flex items-center justify-between p-5 bg-white/[0.03] border border-white/[0.05] rounded-2xl">
                            <div className="flex items-center gap-4">
                                <Clock className="text-slate-600" size={20} />
                                <div>
                                    <div className="text-sm font-black text-white italic tracking-tight">Chapter 3: Methodology</div>
                                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">-</div>
                                </div>
                            </div>
                            <span className="text-[9px] font-black uppercase px-3 py-1 rounded-full border border-slate-700 text-slate-500">Pending</span>
                        </div>
                    </div>

                    {/* --- RESOURCES (Static Buttons) --- */}
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">Resources</h4>
                        <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/5 p-6 rounded-[2rem] space-y-4">
                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                                <div className="flex items-center gap-3">
                                    <FileText className="text-blue-400" size={18} />
                                    <span className="text-[10px] font-black text-slate-300 uppercase italic">Title Page Template</span>
                                </div>
                                <Download size={14} className="text-slate-600" />
                            </div>
                            
                            <div className="pt-4 border-t border-white/5">
                                <div className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20">
                                    <Upload size={14} /> Submit Documentation
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}