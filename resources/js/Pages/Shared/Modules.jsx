import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { 
  BookOpen, Search, Clock, ChevronRight, 
  ArrowLeft, Download, FileText, Eye, Archive, 
  CheckCircle2, Trophy, Lock 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Modules({ auth }) {
    // --- APP STATES ---
    const [selectedModule, setSelectedModule] = useState(null);
    const [selectedQuarter, setSelectedQuarter] = useState(null);
    const [showQuiz, setShowQuiz] = useState(false);
    const [currentQuizModule] = useState('Q1M1'); 
    
    // --- QUIZ & PERSISTENCE STATES ---
    const [userAnswers, setUserAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [isCompleted, setIsCompleted] = useState(false);

    // --- EFFECT: LOAD DATA & LOCK STATUS ---
    useEffect(() => {
        // I-check kung naka-lock na ang module
        const completionStatus = localStorage.getItem(`quiz_completed_${currentQuizModule}`);
        if (completionStatus === 'true') {
            setIsCompleted(true);
        }

        // I-load ang mga dating sagot
        const savedAnswers = localStorage.getItem(`quiz_answers_${currentQuizModule}`);
        if (savedAnswers) setUserAnswers(JSON.parse(savedAnswers));

        // I-load ang huling score
        const savedScore = localStorage.getItem(`quiz_score_${currentQuizModule}`);
        if (savedScore) setScore(parseInt(savedScore));
    }, [currentQuizModule, showQuiz]);

    // --- LOGIC: QUIZ HANDLERS ---
    const handleSelectOption = (questionIndex, option) => {
        if (isCompleted) return; // Stop action kung locked na

        const updatedAnswers = { ...userAnswers, [questionIndex]: option };
        setUserAnswers(updatedAnswers);
        localStorage.setItem(`quiz_answers_${currentQuizModule}`, JSON.stringify(updatedAnswers));
    };

    const handleSubmitQuiz = () => {
        if (isCompleted) return;

        const currentQuestions = quizzes[currentQuizModule];
        let correctCount = 0;
        currentQuestions.forEach((item, index) => {
            if (userAnswers[index] === item.a) correctCount++;
        });

        // Save at Lock
        setScore(correctCount);
        setIsCompleted(true);
        localStorage.setItem(`quiz_score_${currentQuizModule}`, correctCount.toString());
        localStorage.setItem(`quiz_completed_${currentQuizModule}`, 'true');
        
        alert(`Quiz Submitted! Final Score: ${correctCount} / ${currentQuestions.length}. This module is now locked.`);
    };

    // --- LOGIC: FILE ACTIONS ---
    // const handleFileView = (file) => {
    //     const fileUrl = `${window.location.origin}/files/pr/Quarter 1/${file.name}`;
    //     if (file.type === 'pptx') {
    //         // Preview PPTX using Google Docs Viewer
    //         const previewUrl = `https://docs.google.com/gview?url=${encodeURIComponent(fileUrl)}&embedded=true`;
    //         window.open(previewUrl, '_blank');
    //     } else {
    //         // Open PDF or TXT directly
    //         window.open(fileUrl, '_blank');
    //     }
    // };
    const handleFileView = (file) => {
        const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
        const fileUrl = `${window.location.origin}/files/pr/Quarter 1/${file.name}`;

        if (file.type === 'pptx') {
            if (isLocal) {
                // Pag local, i-download na lang muna para hindi mag-error ang Google preview
                alert("Note: PPTX Preview is only available when the site is live. Downloading file instead.");
                handleDownload(file.name);
            } else {
                // Pag live na, ito ang gagana
                const previewUrl = `https://docs.google.com/gview?url=${encodeURIComponent(fileUrl)}&embedded=true`;
                window.open(previewUrl, '_blank');
            }
        } else {
            window.open(fileUrl, '_blank');
        }
    };

    const handleDownload = (fileName) => {
        const link = document.createElement('a');
        link.href = `/files/pr/Quarter 1/${fileName}`;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // --- DATA ---
    const modules = [
        { id: 1, title: 'Practical Research 1', code: 'PR1-10', status: 'Available' },
        { id: 2, title: 'Computer Hardware Servicing', code: 'CHS-10', status: 'Available' },
        { id: 3, title: 'Network Configuration', code: 'NET-10', status: 'Available' },
    ];

    const quarters = [
        { id: 'q1', title: 'Quarter 1', topic: 'Introduction & Research Basics', status: 'Unlocked' },
        { id: 'q2', title: 'Quarter 2', topic: 'Technical Skills & Configuration', status: 'Unlocked' },
        { id: 'q3', title: 'Quarter 3', topic: 'Advanced Diagnostics', status: 'Locked' },
        { id: 'q4', title: 'Quarter 4', topic: 'Final Project & Certification', status: 'Locked' },
    ];

    const quarterFiles = [
        { name: '1pr.pdf', type: 'pdf' }, { name: '2pr.pdf', type: 'pdf' },
        { name: '3pr.pdf', type: 'pdf' }, { name: '4pr.pdf', type: 'pdf' },
        { name: '5pr.pdf', type: 'pdf' }, { name: '6pr.pdf', type: 'pdf' },
        { name: '7pr.pdf', type: 'pdf' }, { name: 'https_www.can.txt', type: 'txt' },
        { name: 'Research-Characteristics.pptx', type: 'pptx' },
        { name: 'week-2-what-is-an-information-system.pptx', type: 'pptx' },
    ];

    const quizzes = {
        'Q1M1': [
            { q: "The information you use to make decisions or provide best practice of operation is based from what?", a: "Research findings", options: ["Research findings", "Thoughts and Opinions", "Other people", "None of the Above"] },
            { q: "What is Research? Choose the most accurate answer.", a: "An activity of systematic investigation that seeks answers to a problem", options: ["Searching on Google", "Doing experiment", "An activity of systematic investigation that seeks answers to a problem", "None of the Above"] },
            { q: "Which is one of the characteristics of research?", a: "Logical", options: ["Biased", "Fiction", "Logical", "None of the Above"] },
            { q: "Which characteristic of research means it is based on observable and measurable evidence?", a: "Empirical", options: ["Ethical", "Empirical", "Replicable", "Analytical"] },
            { q: "Which characteristic of research means it is based on clear and valid reasoning?", a: "Logical", options: ["Logical", "Ethical", "Replicable", "None of the above"] },
            { q: "Which characteristic of research means it is based on systematic methods and procedure?", a: "Methodical", options: ["Logical", "Cyclical", "Methodical", "None of the above"] },
            { q: "Which characteristic of research means it is based on strict and careful decision-making?", a: "Critical", options: ["Methodical", "Replicable", "Critical", "None of the above"] },
            { q: "Which characteristic of research means it is based on procedures that can be duplicated to enable the researcher to obtain definite and valid result?", a: "Replicable", options: ["Critical", "Ethical", "Replicable", "None of the above"] },
            { q: "Which characteristic of research means it is based on utilizing, testing, and analyzing approach in collecting data?", a: "Analytical", options: ["Empirical", "Analytical", "Logical", "None of the above"] },
            { q: "Which characteristic of means it is based on resolving a problem and generates a problem to be solved again?", a: "Cyclical", options: ["Logical", "Cyclical", "Methodical", "None of the above"] }
        ]
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={showQuiz ? `Assessment: Q1M1` : (selectedQuarter ? `${selectedQuarter.title} Files` : (selectedModule ? selectedModule.title : "Learning Modules"))}
        >
            <Head title="TechNest | Learning" />

            <div className="max-w-7xl mx-auto space-y-6">
                <AnimatePresence mode="wait">
                    
                    {/* --- VIEW 1: MODULE LIST --- */}
                    {!selectedModule && (
                        <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {modules.map((mod) => (
                                <button key={mod.id} onClick={() => mod.status === 'Available' && setSelectedModule(mod)} className="group relative text-left">
                                    <div className="relative bg-slate-900/40 border border-white/5 p-6 rounded-[2rem] hover:border-cyan-500/30 transition-all h-full shadow-2xl">
                                        <div className="p-3 bg-cyan-500/10 rounded-2xl text-cyan-400 w-fit mb-6"><BookOpen size={24} /></div>
                                        <h3 className="text-lg font-black text-white italic uppercase tracking-tighter">{mod.title}</h3>
                                        <div className="mt-6 pt-6 border-t border-white/5 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-cyan-400">
                                            {mod.status} <ChevronRight size={16} />
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </motion.div>
                    )}

                    {/* --- VIEW 2: QUARTERS --- */}
                    {selectedModule && !selectedQuarter && (
                        <motion.div key="quarters" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                            <button onClick={() => setSelectedModule(null)} className="text-xs font-black uppercase tracking-widest text-cyan-400 flex items-center hover:text-white transition-colors">
                                <ArrowLeft size={16} className="mr-2" /> Back to Modules
                            </button>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {quarters.map((q) => (
                                    <div key={q.id} className="bg-white/5 border border-white/10 rounded-[2rem] p-6 hover:border-cyan-500/30 transition-all flex flex-col">
                                        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 font-black text-xs mb-6">{q.id.toUpperCase()}</div>
                                        <h4 className="text-white font-black text-xl italic uppercase mb-2">{q.title}</h4>
                                        <p className="text-slate-500 text-xs mb-8 leading-relaxed">{q.topic}</p>
                                        <button onClick={() => q.status === 'Unlocked' && setSelectedQuarter(q)} disabled={q.status === 'Locked'} className={`mt-auto w-full py-3 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all ${q.status === 'Unlocked' ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400' : 'bg-white/5 text-slate-600 cursor-not-allowed'}`}>
                                            {q.status === 'Unlocked' ? 'Select Quarter' : 'Locked'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* --- VIEW 3: FILES & QUIZ ENTRY --- */}
                    {selectedQuarter && !showQuiz && (
                        <motion.div key="files" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 pb-10">
                            <button onClick={() => setSelectedQuarter(null)} className="text-xs font-black uppercase tracking-widest text-cyan-400 flex items-center hover:text-white transition-colors group">
                                <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Quarters
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 p-8 rounded-[2.5rem] flex flex-col items-center text-center">
                                    <div className="p-5 bg-cyan-500 rounded-2xl mb-6 shadow-lg shadow-cyan-500/20"><Archive className="text-slate-950 w-8 h-8" /></div>
                                    <h3 className="text-xl font-black text-white uppercase italic mb-2">Bulk Download</h3>
                                    <button className="w-full bg-cyan-500 text-slate-950 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-cyan-400 flex items-center justify-center active:scale-95 transition-all">
                                        <Download size={18} className="mr-2" /> Download All
                                    </button>
                                </div>

                                <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] flex flex-col items-center text-center">
                                    <div className="p-5 bg-cyan-500/10 rounded-2xl mb-6"><CheckCircle2 className="text-cyan-400 w-8 h-8" /></div>
                                    <h3 className="text-xl font-black text-white uppercase italic mb-2">Module Quiz</h3>
                                    <button onClick={() => setShowQuiz(true)} className="w-full bg-white/10 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-cyan-500 hover:text-slate-950 transition-all active:scale-95">
                                        {isCompleted ? 'View Result' : 'Begin Assessment'}
                                    </button>
                                </div>
                            </div>

                            <div className="pt-8">
                                <h4 className="text-white font-black uppercase tracking-[0.3em] text-[10px] mb-6 flex items-center"><ChevronRight className="text-cyan-400 mr-2" size={16} /> Individual Resources</h4>
                                <div className="grid grid-cols-1 gap-3">
                                    {quarterFiles.map((file, idx) => (
                                        <div key={idx} className="bg-slate-900/40 border border-white/5 p-4 rounded-2xl flex items-center justify-between group hover:border-cyan-500/30 transition-all shadow-xl">
                                            <div className="flex items-center space-x-4">
                                                <div className={`p-2 rounded-lg ${file.type === 'pdf' ? 'bg-red-500/10 text-red-400' : (file.type === 'pptx' ? 'bg-orange-500/10 text-orange-400' : 'bg-slate-500/10 text-slate-400')}`}><FileText size={18} /></div>
                                                <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{file.name}</span>
                                            </div>
                                            <div className="flex space-x-2">
                                                <button onClick={() => handleFileView(file)} className="p-2 text-slate-500 hover:text-cyan-400 transition-colors" title="Preview"><Eye size={18} /></button>
                                                <button onClick={() => handleDownload(file.name)} className="p-2 text-slate-500 hover:text-cyan-400 transition-colors" title="Download"><Download size={18} /></button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* --- VIEW 4: QUIZ INTERFACE (LOCKED) --- */}
                    {showQuiz && (
                        <motion.div key="quiz" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-3xl mx-auto space-y-8 pb-40">
                            <div className="flex flex-col md:flex-row justify-between items-center border-b border-white/5 pb-6 gap-4">
                                <button onClick={() => setShowQuiz(false)} className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-white flex items-center group">
                                    <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Exit Quiz
                                </button>
                                {isCompleted && (
                                    <div className="flex items-center bg-cyan-500/10 border border-cyan-500/30 px-6 py-2 rounded-2xl animate-pulse">
                                        <Trophy size={18} className="text-cyan-400 mr-3" />
                                        <span className="text-cyan-400 font-black text-sm uppercase tracking-tighter">LOCKED: {score} / {quizzes['Q1M1'].length}</span>
                                    </div>
                                )}
                            </div>

                            <div className={`space-y-12 ${isCompleted ? 'pointer-events-none' : ''}`}>
                                {quizzes['Q1M1'].map((item, index) => (
                                    <div key={index} className="space-y-6">
                                        <div className="flex items-start space-x-4">
                                            <span className="text-cyan-500 font-black italic text-2xl">0{index + 1}.</span>
                                            <p className="text-lg text-white font-medium leading-relaxed">{item.q}</p>
                                        </div>
                                        <div className="grid grid-cols-1 gap-3 pl-12">
                                            {item.options.map((opt, oIdx) => (
                                                <button 
                                                    key={oIdx} 
                                                    onClick={() => handleSelectOption(index, opt)} 
                                                    className={`w-full text-left p-5 rounded-2xl border transition-all text-sm font-medium ${
                                                        userAnswers[index] === opt 
                                                        ? 'bg-cyan-500 border-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/30 scale-[1.02]' 
                                                        : 'bg-white/5 border-white/5 text-slate-400 hover:border-cyan-500/50'
                                                    }`}
                                                >
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="fixed bottom-0 left-0 right-0 p-8 bg-slate-950/90 backdrop-blur-xl border-t border-white/5 flex justify-center z-50">
                                {!isCompleted ? (
                                    <button 
                                        onClick={handleSubmitQuiz} 
                                        className="bg-cyan-500 text-slate-950 px-16 py-4 rounded-2xl font-black uppercase text-xs tracking-widest italic shadow-2xl shadow-cyan-500/30 active:scale-95 transition-all"
                                    >
                                        Final Submit & Lock Module
                                    </button>
                                ) : (
                                    <div className="bg-white/5 border border-white/10 px-10 py-4 rounded-2xl text-slate-500 font-black uppercase text-[10px] tracking-widest flex items-center">
                                        <Lock size={14} className="mr-3" /> Assessment Completed and Locked
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