import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { GraduationCap, Layers, Search, ArrowRight, BookOpen, BrainCircuit, Info, X, Download, FileText, FolderOpen, Eye } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Dashboard({ auth }) {
    const [showLessonsModal, setShowLessonsModal] = useState(false);
    const [showPdfModal, setShowPdfModal] = useState(false);
    const [currentPdfUrl, setCurrentPdfUrl] = useState(null);
    const [currentFileName, setCurrentFileName] = useState('');

    const lessonsData = [
        {
            id: 'module-q1',
            title: 'TLE - Quarter 1', // Changed from Module to TLE
            path: 'module/q1',
            files: ['q1.pdf']
        },
        {
            id: 'module-q2',
            title: 'TLE - Quarter 2', // Changed from Module to TLE
            path: 'module/q2',
            files: ['q2.pdf']
        },
        {
            id: 'module-q3',
            title: 'TLE - Quarter 3', // Changed from Module to TLE
            path: 'module/q3',
            files: ['q3.pdf']
        },
        {
            id: 'pr-q1',
            title: 'Research - Quarter 1',
            path: 'pr/q1',
            files: [
                'G10-RESEARCH-WEEK1.pdf',
                'G10-RESEARCH-WEEK2.pdf',
                'G10-RESEARCH-WEEK3.pdf',
                'G10-RESEARCH-WEEK4.pdf',
                'G10-RESEARCH-WEEK5.pdf',
                'G10-RESEARCH-WEEK6.pdf',
                'G10-RESEARCH-WEEK7.pdf',
                'G10-RESEARCH-WEEK8.pdf'
            ]
        },
        {
            id: 'pr-q2',
            title: 'Research - Quarter 2',
            path: 'pr/q2',
            files: [
                'WEEK1-PROBLEM-SOLVING.pdf',
                'WEEK1-PROBLEM-SOLVING.pdf.pdf',
                'WEEK-21-1.pdf',
                'WEEK2-1-PROBLEM-SOLVING.pdf',
                'WEEK-22-1.pdf',
                'WEEK3-1-PROBLEM-SOLVING.pdf.pdf',
                'Week3-Sampling-EdnalynOrola-2.pdf',
                'WEEK5-1-1-PROBLEM-SOLVING.pdf',
                'WEEK5-PROBLEM-SOLVING.pdf'
            ]
        },
        {
            id: 'pr-q3',
            title: 'Research - Quarter 3',
            path: 'pr/q3',
            files: [
                'WEEK-1-APPROACHES-TO-SYSTEMS-DEVELOPMENT-BADUA.pdf',
                'week-2-what-is-an-information-system.pdf',
                'Week-3-Systems-Development-Life-Cycle.pdf',
                'Week-3-Systems-Development-Life-Cycle-2.docx.pdf',
                'WEEK-4-Traditional-VS-Object-Oriented-Approach.pdf',
                'WEEK-5-FEASIBILITY-STUDY-IN-INFORMATION-SYSTEM.pdf',
                'WEEK6-DATAFLOW-DIAGRAM.pdf'
            ]
        }
    ];

    const handleDownload = (path, fileName) => {
        try {
            const link = document.createElement('a');
            link.href = `/files/${path}/${fileName}`;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            alert('Error downloading file.');
        }
    };

    const handleFileView = (path, fileName) => {
        const safePath = encodeURIComponent(path);
        const safeFileName = encodeURIComponent(fileName);
        const fileUrl = `${window.location.origin}/files/${safePath}/${safeFileName}`;
        setCurrentPdfUrl(fileUrl);
        setCurrentFileName(fileName);
        setShowPdfModal(true);
    };

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
                            <button onClick={() => setShowLessonsModal(true)} className="w-full md:w-auto group relative px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-black uppercase tracking-widest rounded-xl transition-all hover:-translate-y-1 shadow-lg shadow-cyan-500/25 flex items-center justify-center">
                                <BookOpen className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                                View Lessons
                            </button>

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

                {/* --- QUICK ACCESS TILES --- */}
                <div>
                    <h3 className="text-slate-500 text-xs font-black uppercase tracking-[0.3em] mb-6 ml-2">Quick Access Tiles</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        
                        {/* Modules Tile (Renamed to TLE) */}
                        <Link href={route('dashboard.modules')} className="group relative bg-slate-900/40 border border-white/5 p-8 rounded-[2rem] hover:bg-white/5 hover:border-cyan-500/30 transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400">
                                    <Layers size={24} />
                                </div>
                                <ArrowRight size={20} className="text-slate-600 group-hover:text-cyan-400 -translate-x-2 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all" />
                            </div>
                            {/* Changed Tile Name from "My Modules" to "TLE" */}
                            <h4 className="text-white font-bold text-lg">TLE</h4>
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

                {/* --- LESSONS MODAL --- */}
                {showLessonsModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-xl">
                        <div className="bg-gradient-to-b from-slate-900 to-slate-950 w-full max-w-6xl h-[85vh] rounded-3xl border border-white/10 flex flex-col shadow-2xl overflow-hidden">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-r from-white/5 to-transparent">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                                        <BookOpen size={24} className="text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">All Lessons</h3>
                                        <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mt-1">
                                            {lessonsData.reduce((acc, l) => acc + l.files.length, 0)} Documents Available
                                        </p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setShowLessonsModal(false)}
                                    className="p-3 bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/30 rounded-xl transition-all group"
                                >
                                    <X size={20} className="text-slate-400 group-hover:text-red-400 transition-colors" />
                                </button>
                            </div>
                            
                            {/* Modal Content */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-8">
                                {lessonsData.map((category) => (
                                    <div key={category.id} className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <FolderOpen size={20} className="text-cyan-400" />
                                            <h4 className="text-lg font-bold text-white uppercase tracking-tighter">{category.title}</h4>
                                            <span className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-bold uppercase tracking-wider text-slate-500 border border-white/10">
                                                {category.files.length} files
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-1 gap-3">
                                            {category.files.map((file, idx) => (
                                                <div 
                                                    key={idx}
                                                    className="bg-slate-800/40 border border-white/10 p-4 rounded-2xl flex items-center justify-between hover:border-cyan-500/30 hover:bg-white/[0.02] transition-all group"
                                                >
                                                    <div className="flex items-center gap-4 overflow-hidden">
                                                        <div className="w-10 h-10 bg-gradient-to-br from-red-500/20 to-orange-500/10 border border-red-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                                            <FileText size={18} className="text-red-400" />
                                                        </div>
                                                        <h5 className="text-sm font-medium text-slate-300 truncate group-hover:text-white transition-colors">{file}</h5>
                                                    </div>
                                                    <div className="flex items-center gap-2 pl-4 border-l border-white/10">
                                                        <button 
                                                            onClick={() => handleFileView(category.path, file)} 
                                                            className="p-2 text-slate-500 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-all"
                                                            title="Preview"
                                                        >
                                                            <Eye size={16} />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDownload(category.path, file)} 
                                                            className="p-2 text-slate-500 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-all"
                                                            title="Download"
                                                        >
                                                            <Download size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* --- PDF PREVIEW MODAL --- */}
                {showPdfModal && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-0 md:p-8 bg-black/95 backdrop-blur-xl">
                        <div className="bg-gradient-to-b from-slate-900 to-slate-950 w-full max-w-7xl h-full md:h-[90vh] rounded-none md:rounded-3xl border-none md:border-white/10 flex flex-col shadow-2xl overflow-hidden">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-r from-white/5 to-transparent">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-red-500/20 to-orange-500/10 border border-red-500/20 rounded-xl flex items-center justify-center">
                                        <FileText size={24} className="text-red-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-white truncate max-w-xl">{currentFileName}</h3>
                                        <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mt-1">PDF Preview</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={() => handleDownload(currentPdfUrl.split('/files/')[1].split('/').slice(0, -1).join('/'), currentFileName)}
                                        className="p-3 bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/30 rounded-xl transition-all group"
                                        title="Download"
                                    >
                                        <Download size={18} className="text-slate-400 group-hover:text-cyan-400 transition-colors" />
                                    </button>
                                    <button 
                                        onClick={() => setShowPdfModal(false)}
                                        className="p-3 bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/30 rounded-xl transition-all group"
                                    >
                                        <X size={20} className="text-slate-400 group-hover:text-red-400 transition-colors" />
                                    </button>
                                </div>
                            </div>
                            
                            {/* Modal Content */}
                            <div className="flex-1 bg-gradient-to-b from-slate-800/30 to-slate-900/50 relative overflow-auto">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.03),transparent_50%)] pointer-events-none"></div>
                                <iframe 
                                    src={currentPdfUrl} 
                                    className="w-full h-full rounded-b-3xl border-none relative z-10"
                                    title="PDF Preview"
                                    scrolling="yes"
                                    style={{ minHeight: '100%', width: '100%', touchAction: 'auto' }}
                                />
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </AuthenticatedLayout>
    );
}