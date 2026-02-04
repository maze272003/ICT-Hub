import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { 
    FileText, Search, ChevronRight, 
    ArrowLeft, Download, Eye, FolderOpen, 
    Layers, BookOpen 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Research({ auth }) {
    // --- STATE MANAGEMENT ---
    const [selectedQuarter, setSelectedQuarter] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // --- DATA: FILE STRUCTURE (Based on your image) ---
    const quartersData = [
        {
            id: 'q1',
            title: 'Quarter 1',
            folderName: 'Quarter 1',
            description: 'Introduction to Research, Characteristics, and Ethics',
            status: 'Unlocked',
            files: [
                '10-IT_-_RESEARCH-_WEEK-1-introduction-to-research_BABAC_.pdf',
                '10-IT_-_RESEARCH_WEEK-2-GOALS-od-Research_B.-BABAC.pdf',
                '10-IT_-_RESEARCH_WEEK-3-Characteristics-of-Research_JOHN-ELMOS-SEASTRES.pdf',
                '10-IT_-_RESEARCH_WEEK-3-Characteristics-of-Research_JOHN-ELMOS-SEASTRES(1).pdf',
                '10-IT_-_RESEARCH_WEEK-4_TYPES-of-Research-M.COLLADO.pdf',
                '10-IT_-_RESEARCH_WEEK-5_Primary-and-secondary-Sources_EDNALYN-F.-OROLA.pdf',
                '10-IT_-_RESEARCH_WEEK-6-Research-Process-and-Key-Considerations-DBDCarreon.pdf',
                '10-IT_-_RESEARCH_WEEK-7_RESEARCH-design_concepcion.pdf',
                '10-IT_-_RESEARCH_WEEK-8-_Qualitative-vs-Quantitative-Research_Anita-B.-Concepcion.pdf',
            ]
        },
        {
            id: 'q2',
            title: 'Quarter 2',
            folderName: 'Quarter 2',
            description: 'Research Problems, Feasibility, and Sampling',
            status: 'Unlocked',
            files: [
                'week-1-Research-Problem-2.pdf',
                'WEEK-2-1 (1).pdf',
                'Week-3-1 (2).pdf',
                'Week3_Sampling_EdnalynOrola-2 (1).pdf',
                'WEEK4-1-1.pdf',
                'WEEK5-1-1.pdf',
                'WEEK-5-FEASIBILITY-STUDY-IN-INFORMATION-SYSTEM.pdf',
                'WEEK-21-1.pdf',
                'WEEK-22-1.pdf',
            ]
        },
        {
            id: 'q3',
            title: 'Quarter 3',
            folderName: 'Quarter 3',
            description: 'Systems Development, SDLC, and Dataflow',
            status: 'Unlocked',
            files: [
                'WEEK-1_APPROACHES-TO-SYSTEMS-DEVELOPMENT_BADUA.pdf',
                'week-2-what-is-an-information-system.pdf',
                'Week-3-Systems-Development-Life-Cycle.pdf',
                'Week-3-Systems-Development-Life-Cycle-2.docx.pdf',
                'WEEK-4-Traditional-VS-Object-Oriented-Approach.pdf',
                'WEEK-5-FEASIBILITY-STUDY-IN-INFORMATION-SYSTEM.pdf',
                'WEEK6-DATAFLOW-DIAGRAM.pdf',
            ]
        }
    ];

    // --- HANDLERS ---
    const handleFileView = (fileName) => {
        // Path based on your image structure: public/files/module/pr/Quarter X/...
        const fileUrl = `/files/module/pr/${selectedQuarter.folderName}/${fileName}`;
        window.open(fileUrl, '_blank');
    };

    const handleDownload = (fileName) => {
        try {
            const link = document.createElement('a');
            link.href = `/files/module/pr/${selectedQuarter.folderName}/${fileName}`;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            alert('Error downloading file.');
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={selectedQuarter ? `${selectedQuarter.title} Materials` : "Practical Research Repository"}
        >
            <Head title="Research Files" />

            <div className="max-w-7xl mx-auto space-y-6">
                
                {/* Header Decoration */}
                <div className="relative overflow-hidden rounded-[2rem] bg-slate-900/40 border border-white/5 p-8 mb-8">
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px]"></div>
                    <div className="relative z-10">
                        <h2 className="text-2xl font-black text-white italic uppercase tracking-tight flex items-center gap-3">
                            <BookOpen className="text-cyan-400" /> 
                            {selectedQuarter ? selectedQuarter.title : "Research Modules"}
                        </h2>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-2">
                            {selectedQuarter ? selectedQuarter.description : "Select a quarter to access learning materials"}
                        </p>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {/* --- VIEW 1: QUARTER SELECTION --- */}
                    {!selectedQuarter ? (
                        <motion.div 
                            key="quarters-list"
                            initial={{ opacity: 0, y: 20 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            exit={{ opacity: 0, y: -20 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-6"
                        >
                            {quartersData.map((quarter) => (
                                <button 
                                    key={quarter.id} 
                                    onClick={() => setSelectedQuarter(quarter)}
                                    className="group relative text-left h-full"
                                >
                                    <div className="relative bg-slate-900/40 border border-white/5 p-8 rounded-[2rem] hover:border-cyan-500/30 transition-all h-full shadow-2xl hover:shadow-cyan-500/5 hover:-translate-y-1">
                                        <div className="w-12 h-12 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                                            <FolderOpen size={24} />
                                        </div>
                                        
                                        <h3 className="text-xl font-black text-white italic uppercase tracking-tighter mb-2">
                                            {quarter.title}
                                        </h3>
                                        
                                        <div className="flex items-center gap-2 mb-6">
                                            <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400 border border-white/5">
                                                {quarter.files.length} Files
                                            </span>
                                            <span className="px-3 py-1 bg-cyan-500/10 rounded-full text-[10px] font-black uppercase tracking-widest text-cyan-400 border border-cyan-500/20">
                                                {quarter.status}
                                            </span>
                                        </div>

                                        <p className="text-slate-500 text-xs leading-relaxed mb-8">
                                            {quarter.description}
                                        </p>

                                        <div className="absolute bottom-8 right-8 text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0">
                                            <ChevronRight size={24} />
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </motion.div>
                    ) : (
                        /* --- VIEW 2: FILE LIST --- */
                        <motion.div 
                            key="file-list"
                            initial={{ opacity: 0, x: 50 }} 
                            animate={{ opacity: 1, x: 0 }} 
                            exit={{ opacity: 0, x: 50 }}
                            className="space-y-6"
                        >
                            {/* Navigation & Search Bar */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <button 
                                    onClick={() => {
                                        setSelectedQuarter(null);
                                        setSearchTerm('');
                                    }} 
                                    className="text-xs font-black uppercase tracking-widest text-cyan-400 flex items-center hover:text-white transition-colors group w-fit"
                                >
                                    <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> 
                                    Back to Quarters
                                </button>

                                <div className="relative w-full md:w-96">
                                    <Search size={16} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500" />
                                    <input
                                        type="text"
                                        placeholder="Search documents..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full bg-slate-900/60 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Files Grid */}
                            <div className="grid grid-cols-1 gap-3 pb-20">
                                {selectedQuarter.files
                                    .filter(file => file.toLowerCase().includes(searchTerm.toLowerCase()))
                                    .map((file, idx) => (
                                    <motion.div 
                                        key={idx}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="bg-slate-900/40 border border-white/5 p-4 rounded-2xl flex items-center justify-between group hover:border-cyan-500/30 hover:bg-white/[0.02] transition-all shadow-lg"
                                    >
                                        <div className="flex items-center gap-4 overflow-hidden">
                                            <div className="p-3 bg-red-500/10 text-red-400 rounded-xl flex-shrink-0">
                                                <FileText size={20} />
                                            </div>
                                            <div className="min-w-0">
                                                <h4 className="text-sm font-bold text-slate-200 truncate pr-4 group-hover:text-white transition-colors">
                                                    {file}
                                                </h4>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">PDF Document</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 pl-4 border-l border-white/5">
                                            <button 
                                                onClick={() => handleFileView(file)}
                                                className="p-2 text-slate-500 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-all" 
                                                title="Preview"
                                            >
                                                <Eye size={18} />
                                            </button>
                                            <button 
                                                onClick={() => handleDownload(file)}
                                                className="p-2 text-slate-500 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-all" 
                                                title="Download"
                                            >
                                                <Download size={18} />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}

                                {selectedQuarter.files.filter(file => file.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
                                    <div className="text-center py-12 text-slate-500">
                                        <Layers size={48} className="mx-auto mb-4 opacity-20" />
                                        <p className="text-sm font-medium">No files found matching your search.</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </AuthenticatedLayout>
    );
}