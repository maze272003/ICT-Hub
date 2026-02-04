import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { 
    FileText, Search, ChevronRight, 
    ArrowLeft, Download, Eye, FolderOpen, 
    Layers, BookOpen, Trophy, CheckCircle2, Lock 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Research({ auth }) {
    // --- APP STATES ---
    const [selectedQuarter, setSelectedQuarter] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showQuiz, setShowQuiz] = useState(false);
    
    // --- QUIZ & PERSISTENCE STATES ---
    const [userAnswers, setUserAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [isCompleted, setIsCompleted] = useState(false);

    // Dynamic Quiz ID based on selected quarter (e.g., "quiz_q1", "quiz_q3")
    const quizId = selectedQuarter ? `quiz_${selectedQuarter.id}` : null;

    // --- EFFECT: LOAD QUIZ PROGRESS ---
    useEffect(() => {
        if (selectedQuarter && quizId) {
            // Load progress specific to this quarter
            const completionStatus = localStorage.getItem(`completed_${quizId}`);
            const savedAnswers = localStorage.getItem(`answers_${quizId}`);
            const savedScore = localStorage.getItem(`score_${quizId}`);

            setIsCompleted(completionStatus === 'true');
            setUserAnswers(savedAnswers ? JSON.parse(savedAnswers) : {});
            setScore(savedScore ? parseInt(savedScore) : null);
        } else {
            // Reset states when no quarter is selected
            setIsCompleted(false);
            setUserAnswers({});
            setScore(null);
            setShowQuiz(false);
        }
    }, [selectedQuarter, quizId]);

    // --- DATA: QUIZ QUESTIONS ---
    const quizzes = {
        'q1': [
            { 
                q: "What is defined as a purposive scientific endeavor that results in the acquisition of new knowledge and gathers data to find solutions?", 
                a: "Research", 
                options: ["Research", "Hypothesis", "Conclusion", "Observation"] 
            },
            { 
                q: "Which characteristic of research means that data is gathered through direct experience or observation?", 
                a: "Empirical", 
                options: ["Logical", "Empirical", "Cyclical", "Critical"] 
            },
            { 
                q: "Research is considered ________ when it resolves a problem and generates a new problem to be solved.", 
                a: "Cyclical", 
                options: ["Analytical", "Methodical", "Cyclical", "Replicable"] 
            },
            { 
                q: "What procedure involves collecting, analyzing, and mixing both quantitative and qualitative research in a single study?", 
                a: "Mixed Method Research", 
                options: ["Triangulation", "Mixed Method Research", "Pure Analysis", "Systematic Review"] 
            },
            { 
                q: "Diaries, original documents, birth certificates, and autobiographies are examples of what type of source?", 
                a: "Primary Sources", 
                options: ["Secondary Sources", "Primary Sources", "Tertiary Sources", "Abstract Sources"] 
            },
            { 
                q: "In evaluating sources, which term refers to data that is consistently used, tested, and produces the same results in different times?", 
                a: "Reliability", 
                options: ["Validity", "Practicality", "Reliability", "Authenticity"] 
            },
            { 
                q: "What is the first phase in conducting the research process?", 
                a: "Definition of the Problem", 
                options: ["Data Gathering", "Review of Related Literature", "Definition of the Problem", "Data Analysis"] 
            },
            { 
                q: "Which research design aims to describe subjects with higher accuracy and precision?", 
                a: "Descriptive", 
                options: ["Exploratory", "Descriptive", "Explanatory", "Experimental"] 
            },
            { 
                q: "Which type of research aims for accurate, reliable explanations by constructing statistical models and using numbers?", 
                a: "Quantitative Research", 
                options: ["Qualitative Research", "Quantitative Research", "Historical Research", "Ethnographic Research"] 
            },
            { 
                q: "Which type of research derives information from understanding human behavior, emotions, and beliefs in the form of words?", 
                a: "Qualitative Research", 
                options: ["Quantitative Research", "Qualitative Research", "Statistical Research", "Experimental Research"] 
            }
        ],
        'q2': [
            { 
                q: "What type of question requires decision-making on research design, data collection, and analysis?", 
                a: "Researchable question", 
                options: ["Non-researchable question", "Researchable question", "Rhetorical question", "Hypothetical question"] 
            },
            { 
                q: "Which type of hypothesis states that there is 'no difference' or no significant relationship between variables?", 
                a: "Null Hypothesis", 
                options: ["Alternative Hypothesis", "Null Hypothesis", "Cause and Effect Hypothesis", "Complex Hypothesis"] 
            },
            { 
                q: "In an experiment, which variable is manipulated or changed by the researcher to observe its effect?", 
                a: "Independent Variable", 
                options: ["Dependent Variable", "Independent Variable", "Extraneous Variable", "Confounding Variable"] 
            },
            { 
                q: "Which level of measurement describes variables with a true zero point, such as height, weight, and speed?", 
                a: "Ratio Scale", 
                options: ["Nominal Scale", "Ordinal Scale", "Interval Scale", "Ratio Scale"] 
            },
            { 
                q: "What is considered the 'gold standard' research design involving manipulation, control, and randomization?", 
                a: "Experimental Research Design", 
                options: ["Descriptive Research Design", "Developmental Research Design", "Experimental Research Design", "Correlational Research Design"] 
            },
            { 
                q: "Which sampling technique ensures that every unit in the population has an equal chance of being selected?", 
                a: "Probability Sampling", 
                options: ["Non-Probability Sampling", "Probability Sampling", "Quota Sampling", "Purposive Sampling"] 
            },
            { 
                q: "Data that consists of names or categories without any intrinsic order (e.g., Male/Female) is classified as:", 
                a: "Nominal Data", 
                options: ["Ordinal Data", "Interval Data", "Ratio Data", "Nominal Data"] 
            },
            { 
                q: "Which visual tool is used to reveal trends, relationships, and frequency distributions in data at a glance?", 
                a: "Graph", 
                options: ["Tabulation", "Graph", "Textual Presentation", "Raw Data"] 
            },
            { 
                q: "What is the act of copying another person's ideas, words, or work and pretending they are your own?", 
                a: "Plagiarism", 
                options: ["Citation", "Paraphrasing", "Plagiarism", "Copyright"] 
            },
            { 
                q: "In writing the Review of Related Literature (RRL), which format is commonly used for citing sources?", 
                a: "APA Format", 
                options: ["MLA Format", "APA Format", "Chicago Style", "IEEE Format"] 
            }
        ],
        'q3': [
            { 
                q: "What are the raw materials that an information system transforms into useful information?", 
                a: "Data", 
                options: ["Software", "Data", "Process", "Hardware"] 
            },
            { 
                q: "According to Moore's Law, what is predicted to double every 18 to 24 months?", 
                a: "Computer processing power", 
                options: ["Internet speed", "Data storage costs", "Computer processing power", "Screen resolution"] 
            },
            { 
                q: "Which SDLC phase involves creating a detailed blueprint of various processes and specifying hardware requirements?", 
                a: "Systems Design", 
                options: ["Systems Planning", "Systems Analysis", "Systems Design", "Systems Implementation"] 
            },
            { 
                q: "Which SDLC model is described as a 'risk-driven' process model?", 
                a: "Spiral Model", 
                options: ["Waterfall Model", "Agile Model", "Iterative Model", "Spiral Model"] 
            },
            { 
                q: "In the Traditional Approach to systems development, stages must be completed in what type of order?", 
                a: "Sequential/Linear", 
                options: ["Randomized", "Sequential/Linear", "Cyclical", "Parallel"] 
            },
            { 
                q: "What industry standard modeling language is used in the Object-Oriented approach?", 
                a: "Unified Modeling Language (UML)", 
                options: ["Hypertext Markup Language (HTML)", "Unified Modeling Language (UML)", "Data Flow Diagram (DFD)", "Structured Query Language (SQL)"] 
            },
            { 
                q: "Which type of feasibility study involves a cost/benefit analysis to determine if a project is worth the investment?", 
                a: "Economic Feasibility", 
                options: ["Technical Feasibility", "Operational Feasibility", "Economic Feasibility", "Scheduling Feasibility"] 
            },
            { 
                q: "What graphical technique is used to show how data moves through an information system without showing program logic?", 
                a: "Data Flow Diagram (DFD)", 
                options: ["Flowchart", "Use Case Diagram", "Data Flow Diagram (DFD)", "Class Diagram"] 
            },
            { 
                q: "In a DFD, what do you call a process that has input but produces no output?", 
                a: "Black hole", 
                options: ["Miracle", "Black hole", "Gray hole", "Data store"] 
            },
            { 
                q: "Which component of an Information System consists of the programs that control hardware (e.g., Windows, Android)?", 
                a: "Software", 
                options: ["People", "Process", "Software", "Database"] 
            }
        ]
    };

    // --- DATA: FILE STRUCTURE ---
    const quartersData = [
        {
            id: 'q1',
            title: 'Quarter 1',
            folderName: 'Quarter 1',
            description: 'Introduction to Research, Characteristics, and Ethics',
            status: 'Unlocked',
            hasQuiz: true,
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
            hasQuiz: true,
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
            hasQuiz: true,
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

    // --- HANDLERS: QUIZ ---
    const handleSelectOption = (questionIndex, option) => {
        if (isCompleted) return; // Prevent changing answers if locked
        const updatedAnswers = { ...userAnswers, [questionIndex]: option };
        setUserAnswers(updatedAnswers);
        // Save answers specific to this quarter
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
        
        // Save result specific to this quarter
        localStorage.setItem(`score_${quizId}`, correctCount.toString());
        localStorage.setItem(`completed_${quizId}`, 'true');
        
        alert(`Quiz Submitted! Final Score: ${correctCount} / ${currentQuestions.length}. This module is now locked.`);
    };

    // --- HANDLERS: FILES ---
    const handleFileView = (fileName) => {
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
            header={
                showQuiz 
                ? `Assessment: ${selectedQuarter?.title}` 
                : (selectedQuarter ? `${selectedQuarter.title} Materials` : "Practical Research Repository")
            }
        >
            <Head title="Research Files" />

            <div className="max-w-7xl mx-auto space-y-6">
                
                {/* --- HEADER --- */}
                {!showQuiz && (
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
                                            {quarter.hasQuiz && (
                                                <span className="px-3 py-1 bg-cyan-500/10 rounded-full text-[10px] font-black uppercase tracking-widest text-cyan-400 border border-cyan-500/20">
                                                    Quiz Available
                                                </span>
                                            )}
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
                            {/* Actions Bar */}
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

                                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                                    <div className="relative w-full md:w-64">
                                        <Search size={16} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500" />
                                        <input
                                            type="text"
                                            placeholder="Search documents..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full bg-slate-900/60 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                                        />
                                    </div>
                                    
                                    {/* Quiz Button (Only shows if quarter has a quiz) */}
                                    {selectedQuarter.hasQuiz && (
                                        <button 
                                            onClick={() => setShowQuiz(true)}
                                            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center whitespace-nowrap"
                                        >
                                            <CheckCircle2 size={16} className="mr-2" />
                                            {isCompleted ? `View Result (${score}/${quizzes[selectedQuarter.id].length})` : 'Take Assessment'}
                                        </button>
                                    )}
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
                            className="max-w-3xl mx-auto space-y-8 pb-40 pt-4"
                        >
                            <div className="flex flex-col md:flex-row justify-between items-center border-b border-white/5 pb-6 gap-4">
                                <button 
                                    onClick={() => setShowQuiz(false)} 
                                    className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-white flex items-center group"
                                >
                                    <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" /> 
                                    Exit Quiz
                                </button>
                                {isCompleted && (
                                    <div className="flex items-center bg-cyan-500/10 border border-cyan-500/30 px-6 py-2 rounded-2xl animate-pulse">
                                        <Trophy size={18} className="text-cyan-400 mr-3" />
                                        <span className="text-cyan-400 font-black text-sm uppercase tracking-tighter">
                                            LOCKED: {score} / {quizzes[selectedQuarter.id].length}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className={`space-y-12 ${isCompleted ? 'pointer-events-none' : ''}`}>
                                {quizzes[selectedQuarter.id]?.map((item, index) => (
                                    <div key={index} className="space-y-6">
                                        <div className="flex items-start space-x-4">
                                            <span className="text-cyan-500 font-black italic text-2xl">
                                                {index + 1 < 10 ? `0${index + 1}` : index + 1}.
                                            </span>
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