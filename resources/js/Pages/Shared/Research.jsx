import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { 
    FileText, Search, ChevronRight, 
    ArrowLeft, Download, Eye, FolderOpen, 
    Layers, BookOpen, Trophy, CheckCircle2, Lock, X,
    Clock, Star, TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Research({ auth }) {
    // --- APP STATES ---
    const [selectedQuarter, setSelectedQuarter] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    
    // --- MODAL STATES ---
    const [showQuiz, setShowQuiz] = useState(false);
    const [showPdfModal, setShowPdfModal] = useState(false);
    const [currentPdfUrl, setCurrentPdfUrl] = useState(null);
    const [currentFileName, setCurrentFileName] = useState('');
    
    // --- QUIZ & PERSISTENCE STATES ---
    const [userAnswers, setUserAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [isCompleted, setIsCompleted] = useState(false);

    const quizId = selectedQuarter ? `quiz_${selectedQuarter.id}` : null;

    useEffect(() => {
        if (selectedQuarter && quizId) {
            const completionStatus = localStorage.getItem(`completed_${quizId}`);
            const savedAnswers = localStorage.getItem(`answers_${quizId}`);
            const savedScore = localStorage.getItem(`score_${quizId}`);

            setIsCompleted(completionStatus === 'true');
            setUserAnswers(savedAnswers ? JSON.parse(savedAnswers) : {});
            setScore(savedScore ? parseInt(savedScore) : null);
        } else {
            setIsCompleted(false);
            setUserAnswers({});
            setScore(null);
            setShowQuiz(false);
        }
    }, [selectedQuarter, quizId]);

    // --- DATA: QUIZ QUESTIONS ---
    const quizzes = {
        'q1': [
            { q: "What is defined as a purposive scientific endeavor that results in the acquisition of new knowledge?", a: "Research", options: ["Research", "Hypothesis", "Conclusion", "Observation"] },
            { q: "Which characteristic of research means that data is gathered through direct experience?", a: "Empirical", options: ["Logical", "Empirical", "Cyclical", "Critical"] },
            { q: "Research is considered ________ when it resolves a problem and generates a new problem.", a: "Cyclical", options: ["Analytical", "Methodical", "Cyclical", "Replicable"] },
            { q: "What procedure involves collecting, analyzing, and mixing quantitative and qualitative research?", a: "Mixed Method Research", options: ["Triangulation", "Mixed Method Research", "Pure Analysis", "Systematic Review"] },
            { q: "Diaries, original documents, and autobiographies are examples of what type of source?", a: "Primary Sources", options: ["Secondary Sources", "Primary Sources", "Tertiary Sources", "Abstract Sources"] },
            { q: "In evaluating sources, what refers to data that produces the same results repeatedly?", a: "Reliability", options: ["Validity", "Practicality", "Reliability", "Authenticity"] },
            { q: "What is the first phase in conducting the research process?", a: "Definition of the Problem", options: ["Data Gathering", "Review of Related Literature", "Definition of the Problem", "Data Analysis"] },
            { q: "Which research design aims to describe subjects with higher accuracy?", a: "Descriptive", options: ["Exploratory", "Descriptive", "Explanatory", "Experimental"] },
            { q: "Which type of research aims for accurate explanations using statistical models?", a: "Quantitative Research", options: ["Qualitative Research", "Quantitative Research", "Historical Research", "Ethnographic Research"] },
            { q: "Which type of research derives information from understanding human behavior in words?", a: "Qualitative Research", options: ["Quantitative Research", "Qualitative Research", "Statistical Research", "Experimental Research"] }
        ],
        'q2': [
            { q: "What type of question requires decision-making on research design?", a: "Researchable question", options: ["Non-researchable question", "Researchable question", "Rhetorical question", "Hypothetical question"] },
            { q: "Which hypothesis states 'no difference' between variables?", a: "Null Hypothesis", options: ["Alternative Hypothesis", "Null Hypothesis", "Cause and Effect Hypothesis", "Complex Hypothesis"] },
            { q: "Which variable is manipulated by the researcher?", a: "Independent Variable", options: ["Dependent Variable", "Independent Variable", "Extraneous Variable", "Confounding Variable"] },
            { q: "Which measurement scale has a true zero point?", a: "Ratio Scale", options: ["Nominal Scale", "Ordinal Scale", "Interval Scale", "Ratio Scale"] },
            { q: "What is the 'gold standard' research design?", a: "Experimental Research Design", options: ["Descriptive Research Design", "Developmental Research Design", "Experimental Research Design", "Correlational Research Design"] },
            { q: "Which sampling technique gives every unit an equal chance of selection?", a: "Probability Sampling", options: ["Non-Probability Sampling", "Probability Sampling", "Quota Sampling", "Purposive Sampling"] },
            { q: "Data consisting of names without order (e.g., Male/Female) is:", a: "Nominal Data", options: ["Ordinal Data", "Interval Data", "Ratio Data", "Nominal Data"] },
            { q: "Which visual tool reveals trends at a glance?", a: "Graph", options: ["Tabulation", "Graph", "Textual Presentation", "Raw Data"] },
            { q: "Copying another person's work and pretending it is yours is called:", a: "Plagiarism", options: ["Citation", "Paraphrasing", "Plagiarism", "Copyright"] },
            { q: "Which format is commonly used for citations in research?", a: "APA Format", options: ["MLA Format", "APA Format", "Chicago Style", "IEEE Format"] }
        ],
        'q3': [
            { q: "What are the raw materials that an information system transforms into useful information?", a: "Data", options: ["Software", "Data", "Process", "Hardware"] },
            { q: "According to Moore's Law, what doubles every 18 to 24 months?", a: "Computer processing power", options: ["Internet speed", "Data storage costs", "Computer processing power", "Screen resolution"] },
            { q: "Which SDLC phase involves creating a blueprint and specifying hardware?", a: "Systems Design", options: ["Systems Planning", "Systems Analysis", "Systems Design", "Systems Implementation"] },
            { q: "Which SDLC model is described as 'risk-driven'?", a: "Spiral Model", options: ["Waterfall Model", "Agile Model", "Iterative Model", "Spiral Model"] },
            { q: "In the Traditional Approach, stages are completed in what order?", a: "Sequential/Linear", options: ["Randomized", "Sequential/Linear", "Cyclical", "Parallel"] },
            { q: "What modeling language is used in the Object-Oriented approach?", a: "Unified Modeling Language (UML)", options: ["HTML", "Unified Modeling Language (UML)", "DFD", "SQL"] },
            { q: "Which feasibility study involves cost/benefit analysis?", a: "Economic Feasibility", options: ["Technical Feasibility", "Operational Feasibility", "Economic Feasibility", "Scheduling Feasibility"] },
            { q: "What diagram shows data movement without program logic?", a: "Data Flow Diagram (DFD)", options: ["Flowchart", "Use Case Diagram", "Data Flow Diagram (DFD)", "Class Diagram"] },
            { q: "In a DFD, a process with input but no output is called:", a: "Black hole", options: ["Miracle", "Black hole", "Gray hole", "Data store"] },
            { q: "Which component consists of programs controlling hardware?", a: "Software", options: ["People", "Process", "Software", "Database"] }
        ]
    };

    // --- DATA: FILE STRUCTURE (Based on public/files/pr/q1 path) ---
    const quartersData = [
        {
            id: 'q1',
            title: 'Quarter 1',
            folderName: 'q1', // Matches public/files/pr/q1
            description: 'Introduction to Research, Characteristics, and Ethics',
            status: 'Unlocked',
            hasQuiz: true,
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
            id: 'q2',
            title: 'Quarter 2',
            folderName: 'q2', // Matches public/files/pr/q2
            description: 'Research Problems, Feasibility, and Sampling',
            status: 'Unlocked',
            hasQuiz: true,
            files: [
                'WEEK-21-1.pdf',
                'WEEK-22-1.pdf',
                'WEEK1-PROBLEM-SOLVING.pdf',
                'WEEK1-PROBLEM-SOLVING.pdf.pdf', // Double extension included to match screenshot
                'WEEK2-1-PROBLEM-SOLVING.pdf.pdf',
                'WEEK3-1-PROBLEM-SOLVING.pdf.pdf',
                'Week3-Sampling-EdnalynOrola-2.pdf',
                'WEEK5-1-1-PROBLEM-SOLVING.pdf',
                'WEEK5-PROBLEM-SOLVING.pdf'
            ]
        },
        {
            id: 'q3',
            title: 'Quarter 3',
            folderName: 'q3', // Matches public/files/pr/q3
            description: 'Systems Development, SDLC, and Dataflow',
            status: 'Unlocked',
            hasQuiz: true,
            files: [
                'WEEK-1-APPROACHES-TO-SYSTEMS-DEVELOPMENT-BADUA.pdf',
                'week-2-what-is-an-information-system.pdf',
                'Week-3-Systems-Development-Life-Cycle-2.docx.pdf',
                'Week-3-Systems-Development-Life-Cycle.pdf',
                'WEEK-4-Traditional-VS-Object-Oriented-Approach.pdf',
                'WEEK-5-FEASIBILITY-STUDY-IN-INFORMATION-SYSTEM.pdf',
                'WEEK6-DATAFLOW-DIAGRAM.pdf'
            ]
        }
    ];

    // --- HANDLERS: DOWNLOAD ---
    const handleDownload = (fileName) => {
        try {
            const link = document.createElement('a');
            // FIX: Uses /files/pr/[quarter]/[file]
            link.href = `/files/pr/${selectedQuarter.folderName}/${fileName}`;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            alert('Error downloading file.');
        }
    };

    // --- HANDLERS: VIEW FILE (PDF MODAL) ---
    const handleFileView = (fileName) => {
        const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
        
        // Encode URL parts
        const safeFolderName = encodeURIComponent(selectedQuarter.folderName);
        const safeFileName = encodeURIComponent(fileName);
        
        // FIX: Uses /files/pr/[quarter]/[file] based on your specific instruction
        const fileUrl = `${window.location.origin}/files/pr/${safeFolderName}/${safeFileName}`;
        
        console.log("Attempting to open:", fileUrl); // Debug log

        const type = fileName.split('.').pop().toLowerCase();

        if (type === 'pptx') {
            if (isLocal) {
                alert("PPTX Preview only works on live site. Downloading instead.");
                handleDownload(fileName);
            } else {
                const previewUrl = `https://docs.google.com/gview?url=${encodeURIComponent(fileUrl)}&embedded=true`;
                window.open(previewUrl, '_blank');
            }
        } else {
            // Open PDF in Modal
            setCurrentPdfUrl(fileUrl);
            setCurrentFileName(fileName);
            setShowPdfModal(true);
        }
    };

    // --- HANDLERS: QUIZ ---
    const handleSelectOption = (questionIndex, option) => {
        if (isCompleted) return;
        const updatedAnswers = { ...userAnswers, [questionIndex]: option };
        setUserAnswers(updatedAnswers);
        localStorage.setItem(`answers_${quizId}`, JSON.stringify(updatedAnswers));
    };

    const handleSubmitQuiz = () => {
        if (isCompleted) return;
        const currentQuestions = quizzes[selectedQuarter.id];
        let correctCount = 0;
        currentQuestions.forEach((item, index) => {
            if (userAnswers[index] === item.a) correctCount++;
        });
        setScore(correctCount);
        setIsCompleted(true);
        localStorage.setItem(`score_${quizId}`, correctCount.toString());
        localStorage.setItem(`completed_${quizId}`, 'true');
        const percentage = Math.round((correctCount / currentQuestions.length) * 100);
        alert(`Assessment Completed!\n\nYour Score: ${correctCount} / ${currentQuestions.length} (${percentage}%)\n\n${percentage === 100 ? '🏆 Perfect Score! Outstanding work!' : percentage >= 70 ? 'Great job! You passed the assessment.' : 'Keep learning! Review the materials and try again.'}`);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                showQuiz 
                ? `Assessment: ${selectedQuarter?.title}` 
                : (selectedQuarter ? `${selectedQuarter.title} Materials` : "Practical Research Repository")
            }
        >
            <Head title="Research Files" />

            <div className="max-w-7xl mx-auto space-y-6">
                
                {!showQuiz && (
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-white/10 p-8 mb-8 backdrop-blur-xl">
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/20 rounded-full blur-[100px]"></div>
                        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px]"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
                                    <BookOpen className="text-white" size={28} />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-black text-white italic uppercase tracking-tight">
                                        {selectedQuarter ? selectedQuarter.title : "Research Modules"}
                                    </h2>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                                            {selectedQuarter ? selectedQuarter.description : "Select a quarter to access learning materials"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {!selectedQuarter && (
                                <div className="flex items-center gap-6 mt-6 pt-6 border-t border-white/5">
                                    <div className="flex items-center gap-2">
                                        <FolderOpen className="text-cyan-400" size={18} />
                                        <span className="text-slate-400 text-sm font-medium">{quartersData.length} Quarters</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FileText className="text-purple-400" size={18} />
                                        <span className="text-slate-400 text-sm font-medium">{quartersData.reduce((acc, q) => acc + q.files.length, 0)} Documents</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="text-emerald-400" size={18} />
                                        <span className="text-slate-400 text-sm font-medium">3 Assessments</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <AnimatePresence mode="wait">
                    
                    {/* --- VIEW 1: QUARTER SELECTION --- */}
                    {!selectedQuarter && (
                        <motion.div 
                            key="quarters-list"
                            initial={{ opacity: 0, y: 20 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            exit={{ opacity: 0, y: -20 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-6"
                        >
                            {quartersData.map((quarter, idx) => (
                                <motion.button 
                                    key={quarter.id} 
                                    onClick={() => setSelectedQuarter(quarter)}
                                    className="group relative text-left h-full"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <div className="relative bg-gradient-to-b from-slate-800/50 to-slate-900/60 border border-white/10 p-8 rounded-3xl hover:border-cyan-500/40 transition-all h-full shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-1 overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-bl-full"></div>
                                        <div className="relative z-10">
                                            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform duration-300">
                                                <FolderOpen size={32} className="text-white" />
                                            </div>
                                            <div className="flex items-start justify-between mb-4">
                                                <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">
                                                    {quarter.title}
                                                </h3>
                                                <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-cyan-500 group-hover:scale-110 transition-all">
                                                    <ChevronRight size={16} className="text-slate-400 group-hover:text-white" />
                                                </div>
                                            </div>
                                            <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2">
                                                {quarter.description}
                                            </p>
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="px-4 py-2 bg-gradient-to-r from-white/10 to-white/5 rounded-xl text-xs font-bold uppercase tracking-widest text-slate-300 border border-white/10 flex items-center gap-2">
                                                    <FileText size={14} className="text-cyan-400" />
                                                    {quarter.files.length} Files
                                                </span>
                                                {quarter.hasQuiz && (
                                                    <span className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/10 rounded-xl text-xs font-bold uppercase tracking-widest text-cyan-400 border border-cyan-500/20 flex items-center gap-2">
                                                        <CheckCircle2 size={14} />
                                                        Quiz
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.button>
                            ))}
                        </motion.div>
                    )}

                    {/* --- VIEW 2: FILE LIST --- */}
                    {selectedQuarter && !showQuiz && (
                        <motion.div 
                            key="file-list"
                            initial={{ opacity: 0, x: 50 }} 
                            animate={{ opacity: 1, x: 0 }} 
                            exit={{ opacity: 0, x: 50 }}
                            className="space-y-6"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <button 
                                    onClick={() => { setSelectedQuarter(null); setSearchTerm(''); }} 
                                    className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-cyan-400 flex items-center transition-colors group w-fit"
                                >
                                    <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center mr-3 group-hover:bg-cyan-500/20 group-hover:-translate-x-1 transition-all">
                                        <ArrowLeft size={14} className="text-slate-400 group-hover:text-cyan-400" />
                                    </div>
                                    Back to Quarters
                                </button>

                                <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                                    <div className="relative w-full md:w-72">
                                        <Search size={16} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500" />
                                        <input
                                            type="text"
                                            placeholder="Search documents..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full bg-slate-900/60 border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                                        />
                                    </div>
                                    
                                    {selectedQuarter.hasQuiz && (
                                        <button 
                                            onClick={() => setShowQuiz(true)}
                                            className={`px-6 py-3.5 rounded-2xl font-black uppercase text-xs tracking-widest transition-all flex items-center justify-center whitespace-nowrap ${
                                                isCompleted 
                                                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                                                    : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 hover:-translate-y-0.5'
                                            }`}
                                        >
                                            {isCompleted ? (
                                                <>
                                                    <Trophy size={16} className="mr-2" />
                                                    View Result ({score}/{quizzes[selectedQuarter.id].length})
                                                </>
                                            ) : (
                                                <>
                                                    <CheckCircle2 size={16} className="mr-2" />
                                                    Take Assessment
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 pb-32">
                                {selectedQuarter.files
                                    .filter(file => file.toLowerCase().includes(searchTerm.toLowerCase()))
                                    .length === 0 && searchTerm && (
                                    <motion.div 
                                        initial={{ opacity: 0 }} 
                                        animate={{ opacity: 1 }}
                                        className="text-center py-20"
                                    >
                                        <div className="w-20 h-20 bg-slate-900/60 border border-white/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                            <Search size={40} className="text-slate-600" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-400 mb-2">No documents found</h3>
                                        <p className="text-slate-600 text-sm">Try adjusting your search term</p>
                                    </motion.div>
                                )}
                                {selectedQuarter.files
                                    .filter(file => file.toLowerCase().includes(searchTerm.toLowerCase()))
                                    .map((file, idx) => (
                                    <motion.div 
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="group relative bg-gradient-to-r from-slate-800/40 to-slate-900/60 border border-white/10 p-5 rounded-3xl hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/5 hover:-translate-y-0.5 transition-all"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-5 overflow-hidden">
                                                <div className="w-14 h-14 bg-gradient-to-br from-red-500/20 to-orange-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                                    <FileText size={26} className="text-red-400" />
                                                </div>
                                                <div className="min-w-0">
                                                    <h4 className="text-base font-bold text-slate-200 truncate pr-4 group-hover:text-white transition-colors">
                                                        {file}
                                                    </h4>
                                                    <div className="flex items-center gap-3 mt-2">
                                                        <span className="px-2.5 py-1 bg-white/5 rounded-lg text-[10px] font-bold uppercase tracking-wider text-slate-500 border border-white/5">
                                                            PDF Document
                                                        </span>
                                                        <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-600">
                                                            <Clock size={10} />
                                                            Week {idx + 1}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 pl-5 border-l border-white/10">
                                                <button 
                                                    onClick={() => handleFileView(file)} 
                                                    className="w-11 h-11 bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/30 rounded-xl flex items-center justify-center transition-all group/btn"
                                                    title="Preview"
                                                >
                                                    <Eye size={18} className="text-slate-500 group-hover/btn:text-cyan-400 transition-colors" />
                                                </button>
                                                <button 
                                                    onClick={() => handleDownload(file)} 
                                                    className="w-11 h-11 bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/30 rounded-xl flex items-center justify-center transition-all group/btn"
                                                    title="Download"
                                                >
                                                    <Download size={18} className="text-slate-500 group-hover/btn:text-cyan-400 transition-colors" />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* --- VIEW 3: QUIZ INTERFACE --- */}
                    {showQuiz && (
                        <motion.div 
                            key="quiz" 
                            initial={{ opacity: 0, scale: 0.95 }} 
                            animate={{ opacity: 1, scale: 1 }} 
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="max-w-4xl mx-auto space-y-8 pb-40 pt-4"
                        >
                            <div className="flex flex-col md:flex-row justify-between items-center border-b border-white/10 pb-6 gap-4">
                                <button onClick={() => setShowQuiz(false)} className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-white flex items-center group transition-colors">
                                    <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center mr-3 group-hover:bg-white/10 group-hover:-translate-x-1 transition-all">
                                        <ArrowLeft size={14} className="text-slate-500 group-hover:text-white" />
                                    </div>
                                    Exit Quiz
                                </button>
                                {isCompleted && (
                                    <div className="flex items-center bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 px-6 py-3 rounded-2xl">
                                        <Trophy size={20} className="text-emerald-400 mr-3" />
                                        <div>
                                            <span className="text-emerald-400 font-black text-sm uppercase tracking-tighter">
                                                SCORE: {score} / {quizzes[selectedQuarter.id].length}
                                            </span>
                                            <span className="text-slate-500 text-xs font-bold uppercase tracking-wider ml-3">
                                                · COMPLETED
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className={`space-y-10 ${isCompleted ? 'pointer-events-none' : ''}`}>
                                {quizzes[selectedQuarter.id]?.map((item, index) => (
                                    <motion.div 
                                        key={index} 
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="space-y-5"
                                    >
                                        <div className="flex items-start gap-5">
                                            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-cyan-500/30 rounded-2xl flex items-center justify-center flex-shrink-0">
                                                <span className="text-cyan-400 font-black italic text-xl">
                                                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                                                </span>
                                            </div>
                                            <p className="text-lg text-slate-200 font-medium leading-relaxed flex-1 pt-2">
                                                {item.q}
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-1 gap-3 pl-1">
                                            {item.options.map((opt, oIdx) => (
                                                <button 
                                                    key={oIdx} 
                                                    onClick={() => handleSelectOption(index, opt)} 
                                                    className={`w-full text-left p-5 rounded-2xl border transition-all text-sm font-medium ${
                                                        userAnswers[index] === opt 
                                                            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 border-cyan-400 text-white shadow-xl shadow-cyan-500/30 scale-[1.01]' 
                                                            : 'bg-white/5 border-white/10 text-slate-400 hover:border-cyan-500/30 hover:bg-white/10 hover:text-slate-200'
                                                    }`}
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className={`w-6 h-6 rounded-lg border flex items-center justify-center flex-shrink-0 ${
                                                            userAnswers[index] === opt 
                                                                ? 'bg-white/20 border-white/30' 
                                                                : 'border-white/20'
                                                        }`}>
                                                            {userAnswers[index] === opt && (
                                                                <div className="w-3 h-3 bg-white rounded-full"></div>
                                                            )}
                                                        </div>
                                                        <span>{opt}</span>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="fixed bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-slate-950 via-slate-950/95 to-transparent backdrop-blur-xl border-t border-white/10 flex justify-center z-50">
                                {!isCompleted ? (
                                    <button 
                                        onClick={handleSubmitQuiz} 
                                        className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-20 py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-2xl shadow-cyan-500/30 active:scale-95 transition-all hover:shadow-cyan-500/40 hover:-translate-y-0.5 flex items-center gap-3"
                                    >
                                        <CheckCircle2 size={18} />
                                        Submit Assessment
                                    </button>
                                ) : (
                                    <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 px-12 py-4 rounded-2xl text-emerald-400 font-black uppercase text-xs tracking-widest flex items-center gap-3">
                                        <Lock size={16} />
                                        Assessment Completed & Locked
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* --- PDF PREVIEW MODAL --- */}
                    {showPdfModal && (
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-8 bg-black/90 backdrop-blur-xl"
                        >
                            <motion.div 
                                initial={{ scale: 0.95, opacity: 0 }} 
                                animate={{ scale: 1, opacity: 1 }} 
                                className="bg-gradient-to-b from-slate-900 to-slate-950 w-full max-w-7xl h-full md:h-[90vh] rounded-none md:rounded-3xl border-none md:border-white/10 flex flex-col shadow-2xl overflow-hidden"
                            >
                                {/* Modal Header */}
                                <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-r from-white/5 to-transparent">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-red-500/20 to-orange-500/10 border border-red-500/20 rounded-xl flex items-center justify-center">
                                            <FileText className="text-red-400" size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-bold text-white truncate max-w-xl">{currentFileName}</h3>
                                            <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mt-1">PDF Preview</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button 
                                            onClick={() => handleDownload(currentFileName)}
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
                                
                                {/* Modal Content (Iframe) */}
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
                            </motion.div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </AuthenticatedLayout>
    );
}