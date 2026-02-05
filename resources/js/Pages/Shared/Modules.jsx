import React, { useState, useEffect, useMemo } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { 
  BookOpen, Search, ChevronRight, ArrowLeft, 
  Download, FileText, Eye, Archive, 
  CheckCircle2, XCircle, Trophy, RotateCcw, Lock, FolderOpen,
  PieChart, Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Modules({ auth }) {
    const [selectedModule, setSelectedModule] = useState(null);
    const [selectedQuarter, setSelectedQuarter] = useState(null);
    const [showQuiz, setShowQuiz] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const [userAnswers, setUserAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [isCompleted, setIsCompleted] = useState(false);

    // --- COMPUTED PROPERTIES ---
    const currentKey = useMemo(() => {
        if (selectedModule && selectedQuarter) {
            return `${selectedModule.code}_${selectedQuarter.id}`;
        }
        return null;
    }, [selectedModule, selectedQuarter]);

    // --- EFFECTS ---
    useEffect(() => {
        if (!currentKey) return;

        setUserAnswers({});
        setScore(null);
        setIsCompleted(false);

        const completionStatus = localStorage.getItem(`quiz_completed_${currentKey}`);
        if (completionStatus === 'true') {
            setIsCompleted(true);
        }

        const savedAnswers = localStorage.getItem(`quiz_answers_${currentKey}`);
        if (savedAnswers) setUserAnswers(JSON.parse(savedAnswers));

        const savedScore = localStorage.getItem(`quiz_score_${currentKey}`);
        if (savedScore) setScore(parseInt(savedScore));

        // Scroll to top when quiz opens
        if(showQuiz) window.scrollTo(0,0);

    }, [currentKey, showQuiz]);

    // --- HANDLERS ---
    const handleSelectOption = (questionIndex, option) => {
        if (isCompleted) return; 

        const updatedAnswers = { ...userAnswers, [questionIndex]: option };
        setUserAnswers(updatedAnswers);
        localStorage.setItem(`quiz_answers_${currentKey}`, JSON.stringify(updatedAnswers));
    };

    const handleSubmitQuiz = () => {
        if (isCompleted) return;

        const currentQuestions = quizzes[currentKey] || [];
        
        // Validation: Check if all questions are answered
        if (Object.keys(userAnswers).length < currentQuestions.length) {
            if(!window.confirm("You haven't answered all questions. Submit anyway?")) return;
        }

        let correctCount = 0;
        currentQuestions.forEach((item, index) => {
            if (userAnswers[index] === item.a) correctCount++;
        });

        setScore(correctCount);
        setIsCompleted(true);
        localStorage.setItem(`quiz_score_${currentKey}`, correctCount.toString());
        localStorage.setItem(`quiz_completed_${currentKey}`, 'true');
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleRetake = () => {
        if (window.confirm("Retake quiz? Current answers will be cleared, but your previous score history is preserved.")) {
            setIsCompleted(false);
            setUserAnswers({});
            localStorage.removeItem(`quiz_answers_${currentKey}`);
            localStorage.setItem(`quiz_completed_${currentKey}`, 'false');
            window.scrollTo(0,0);
        }
    };

    const handleFileView = (file) => {
        const fileUrl = `${window.location.origin}/files/${selectedModule?.code}/${selectedQuarter?.id}/${file.name}`;
        window.open(fileUrl, '_blank');
    };

    const handleDownload = (fileName) => {
        setLoading(true);
        const link = document.createElement('a');
        link.href = `/files/${selectedModule?.code}/${selectedQuarter?.id}/${fileName}`;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => setLoading(false), 800); 
    };

    const handleBulkDownload = () => {
        setLoading(true);
        alert("Preparing download...");
        currentFiles.forEach(file => {
             const link = document.createElement('a');
             link.href = `/files/${selectedModule?.code}/${selectedQuarter?.id}/${file.name}`;
             link.download = file.name;
             link.style.display = 'none';
             document.body.appendChild(link);
             link.click();
             document.body.removeChild(link);
        });
        setLoading(false);
    };

    // --- DATA ---
    const modules = [
        { id: 1, title: 'Practical Research 1', code: 'pr', status: 'Available' },
        { id: 2, title: 'Computer Hardware Servicing', code: 'module', status: 'Available' },
        { id: 3, title: 'Network Configuration', code: 'NET', status: 'Available' },
    ];

    const quarters = [
        { id: 'q1', title: 'Quarter 1', topic: 'Fundamentals & Basics' },
        { id: 'q2', title: 'Quarter 2', topic: 'Advanced Configuration' },
        { id: 'q3', title: 'Quarter 3', topic: 'Maintenance & Diagnostics' },
        { id: 'q4', title: 'Quarter 4', topic: 'Final Project & Review' },
    ];

    const filesDatabase = {
        'pr_q1': [
            { name: '1pr.pdf', type: 'pdf' }, { name: '2pr.pdf', type: 'pdf' },
            { name: '3pr.pdf', type: 'pdf' }, { name: '4pr.pdf', type: 'pdf' },
            { name: '5pr.pdf', type: 'pdf' }, { name: '6pr.pdf', type: 'pdf' },
            { name: '7pr.pdf', type: 'pdf' }, { name: 'https_www.can.txt', type: 'txt' },
            { name: 'Research-Characteristics.pptx', type: 'pptx' },
            { name: 'week-2-what-is-an-information-system.pptx', type: 'pptx' },
        ],
        'pr_q2': [
            { name: 'Qualitative_Research_Designs.pdf', type: 'pdf' },
            { name: 'Sampling_Methods.pptx', type: 'pptx' },
        ],
        'module_q1': [ { name: 'CSS-10-Week-1-1.pdf', type: 'pdf' } ],
        'module_q2': [ { name: 'CSS-10-Week-2-1.pdf', type: 'pdf' } ],
        'module_q3': [ { name: 'CSS-10-Week-3-1.pdf', type: 'pdf' } ],
        'module_q4': [ { name: 'CSS-10-Week-4-1.pdf', type: 'pdf' } ],
        'NET_q1': [
            { name: 'Computer-Security-Network.pdf', type: 'pdf' },
            { name: 'Intro_to_Networking.pdf', type: 'pdf' },
            { name: 'OSI_Model.pptx', type: 'pptx' },
        ],
    };

    const quizzes = {
        'pr_q1': [
            { q: "What is the first step in the research process?", a: "Identifying the problem", options: ["Collecting data", "Identifying the problem", "Analyzing data", "Conclusion"] },
            { q: "Which type of research deals with numbers?", a: "Quantitative", options: ["Qualitative", "Quantitative", "Narrative", "Ethnographic"] },
            { q: "What is a systematic investigation?", a: "Research", options: ["Guessing", "Research", "Assumption", "Hypothesis"] },
            { q: "What is an educated guess called?", a: "Hypothesis", options: ["Theory", "Hypothesis", "Law", "Fact"] },
            { q: "Which section lists the sources used?", a: "References", options: ["Abstract", "Introduction", "Methodology", "References"] },
            { q: "What protects the rights of research participants?", a: "Ethics", options: ["Logic", "Ethics", "Statistics", "Grammar"] },
            { q: "Which variable is manipulated by the researcher?", a: "Independent", options: ["Dependent", "Independent", "Extraneous", "Confounding"] },
            { q: "What is the summary of the study called?", a: "Abstract", options: ["Title", "Abstract", "Appendix", "Discussion"] },
            { q: "Which method involves face-to-face questioning?", a: "Interview", options: ["Survey", "Observation", "Interview", "Experiment"] },
            { q: "What does RRL stand for?", a: "Review of Related Literature", options: ["Read Research Logic", "Review of Related Literature", "Research Rules List", "Related Review Logs"] }
        ],
        'pr_q2': [
            { q: "Which research design studies the lived experiences of people?", a: "Phenomenology", options: ["Case Study", "Phenomenology", "Ethnography", "Grounded Theory"] },
            { q: "Which sampling method relies on referrals?", a: "Snowball", options: ["Random", "Snowball", "Quota", "Convenience"] },
            { q: "What is the primary instrument in qualitative research?", a: "The Researcher", options: ["Questionnaire", "Calculator", "The Researcher", "Software"] },
            { q: "Which type of data is non-numerical?", a: "Qualitative", options: ["Quantitative", "Qualitative", "Statistical", "Binary"] },
            { q: "What is the study of a culture or group?", a: "Ethnography", options: ["Phenomenology", "Ethnography", "Biography", "Case Study"] },
            { q: "Which is a method of data collection?", a: "Focus Group Discussion", options: ["Graphing", "Focus Group Discussion", "Calculating", "Formatting"] },
            { q: "What refers to the consistency of the results?", a: "Reliability", options: ["Validity", "Reliability", "Ethics", "Novelty"] },
            { q: "What refers to the accuracy of the results?", a: "Validity", options: ["Reliability", "Validity", "Efficiency", "Speed"] },
            { q: "Which part of research explains the 'Why'?", a: "Introduction", options: ["References", "Introduction", "Results", "Abstract"] },
            { q: "What is used to cite sources in the text?", a: "In-text Citation", options: ["Bibliography", "Index", "In-text Citation", "Footnote"] }
        ],
        'module_q1': [
            { q: "What does CPU stand for?", a: "Central Processing Unit", options: ["Central Processing Unit", "Central Power Unit", "Computer Processing Unit", "Control Power Unit"] },
            { q: "Which component stores data temporarily?", a: "RAM", options: ["HDD", "SSD", "RAM", "ROM"] },
            { q: "What is the main circuit board of a computer?", a: "Motherboard", options: ["Motherboard", "Graphics Card", "Power Supply", "Hard Drive"] },
            { q: "Which tool is used to tighten screws?", a: "Philips Screwdriver", options: ["Pliers", "Philips Screwdriver", "Wire Cutter", "Anti-static Strap"] },
            { q: "What protects computer components from static electricity?", a: "Anti-static Wrist Strap", options: ["Gloves", "Rubber Mat", "Anti-static Wrist Strap", "Goggles"] },
            { q: "What provides power to the computer components?", a: "PSU", options: ["UPS", "PSU", "CPU", "GPU"] },
            { q: "Which storage device has no moving parts?", a: "SSD", options: ["HDD", "Floppy Disk", "SSD", "CD-ROM"] },
            { q: "What performs the graphical processing?", a: "GPU", options: ["CPU", "GPU", "RAM", "BIOS"] },
            { q: "Which port is commonly used for keyboards and mice?", a: "USB", options: ["VGA", "HDMI", "USB", "Ethernet"] },
            { q: "What software initializes the hardware during startup?", a: "BIOS", options: ["OS", "BIOS", "Driver", "Application"] }
        ],
        'module_q2': [
            { q: "What is the first step in disassembling a PC?", a: "Unplug power", options: ["Remove RAM", "Unplug power", "Open case", "Remove HDD"] },
            { q: "Which file system is default for Windows 10?", a: "NTFS", options: ["FAT32", "NTFS", "exFAT", "HFS+"] },
            { q: "What key is often pressed to enter BIOS?", a: "Delete or F2", options: ["Spacebar", "Enter", "Delete or F2", "Alt + F4"] },
            { q: "What is thermal paste used for?", a: "Heat transfer", options: ["Adhesive", "Heat transfer", "Insulation", "Cleaning"] },
            { q: "Which expansion slot is used for Graphics Cards?", a: "PCIe x16", options: ["PCI", "PCIe x1", "PCIe x16", "AGP"] },
            { q: "What does POST stand for?", a: "Power On Self Test", options: ["Power On System Test", "Pre OS System Test", "Power On Self Test", "Program On Start Test"] },
            { q: "Which Windows utility manages disk partitions?", a: "Disk Management", options: ["Task Manager", "Device Manager", "Disk Management", "Control Panel"] },
            { q: "What connects the front panel buttons to the motherboard?", a: "System Panel Headers", options: ["USB Headers", "Audio Headers", "System Panel Headers", "Fan Headers"] },
            { q: "Which type of RAM is used in Laptops?", a: "SO-DIMM", options: ["DIMM", "SO-DIMM", "DDR3", "GDDR5"] },
            { q: "What does BSOD stand for?", a: "Blue Screen of Death", options: ["Black Screen of Death", "Blue Screen of Death", "Bad System OS Dump", "Binary System Over Dose"] }
        ],
        'module_q3': [
            { q: "What is the primary function of disk defragmentation?", a: "Optimize file access", options: ["Delete viruses", "Optimize file access", "Increase RAM", "Clear cache"] },
            { q: "Which tool is used to test network connectivity?", a: "Ping", options: ["Ping", "Format", "ScanDisk", "Defrag"] },
            { q: "What does preventive maintenance help avoid?", a: "Hardware failure", options: ["Software updates", "Hardware failure", "User login", "Internet speed"] },
            { q: "How often should you clean the inside of a computer?", a: "Every 6-12 months", options: ["Daily", "Weekly", "Every 6-12 months", "Never"] },
            { q: "What is used to clean dust from a keyboard?", a: "Compressed Air", options: ["Water", "Compressed Air", "Vacuum", "Oil"] },
            { q: "Which software protects against malware?", a: "Antivirus", options: ["Firewall", "Antivirus", "Driver", "BIOS"] },
            { q: "What happens when a computer overheats?", a: "It shuts down", options: ["It runs faster", "It shuts down", "It updates", "It connects to WiFi"] },
            { q: "Which component is most likely to fail due to heat?", a: "CPU", options: ["Case", "CPU", "Keyboard", "Mouse"] },
            { q: "What indicates a failing hard drive?", a: "Clicking noise", options: ["Beeping", "Clicking noise", "Blue screen", "Fast boot"] },
            { q: "What is a backup?", a: "Copy of data", options: ["Deleting files", "Copy of data", "Formatting disk", "Installing OS"] }
        ],
        'module_q4': [
            { q: "What is the final phase of a project?", a: "Closure", options: ["Planning", "Execution", "Closure", "Initiation"] },
            { q: "Which document outlines the project scope?", a: "Project Charter", options: ["Invoice", "Project Charter", "Receipt", "Email"] },
            { q: "What is a milestone?", a: "Significant event", options: ["Minor task", "Significant event", "Daily report", "Meeting"] },
            { q: "Who is responsible for the project success?", a: "Project Manager", options: ["Client", "Project Manager", "Vendor", "Intern"] },
            { q: "What is scope creep?", a: "Uncontrolled changes", options: ["Finished on time", "Uncontrolled changes", "Under budget", "Team building"] },
            { q: "Which tool is used for scheduling?", a: "Gantt Chart", options: ["Pie Chart", "Gantt Chart", "Bar Graph", "Scatter Plot"] },
            { q: "What is a stakeholder?", a: "Interested party", options: ["Shareholder only", "Interested party", "Competitor", "Supplier"] },
            { q: "What is risk management?", a: "Identifying threats", options: ["Ignoring problems", "Identifying threats", "Celebrating success", "Hiring staff"] },
            { q: "What is the budget?", a: "Estimated costs", options: ["Actual profit", "Estimated costs", "Revenue", "Salary"] },
            { q: "What is a deliverable?", a: "Product or result", options: ["Meeting minutes", "Product or result", "Email thread", "Phone call"] }
        ],
        'NET_q1': [
            { q: "What does LAN stand for?", a: "Local Area Network", options: ["Local Area Network", "Large Area Network", "Local Access Node", "Long Access Net"] },
            { q: "Which device connects multiple devices on a LAN?", a: "Switch", options: ["Switch", "Monitor", "Printer", "Hard Drive"] },
            { q: "What is the standard connector for Ethernet cables?", a: "RJ45", options: ["RJ11", "RJ45", "USB", "HDMI"] },
            { q: "Which IP address class is 192.168.1.1?", a: "Class C", options: ["Class A", "Class B", "Class C", "Class D"] },
            { q: "What does WAN stand for?", a: "Wide Area Network", options: ["Wide Area Network", "Wireless Access Node", "Web Area Net", "World Access Network"] },
            { q: "Which protocol is used for web browsing?", a: "HTTP", options: ["FTP", "HTTP", "SMTP", "SNMP"] },
            { q: "What is the maximum length of a Cat5e cable segment?", a: "100 meters", options: ["50 meters", "100 meters", "200 meters", "500 meters"] },
            { q: "Which command checks connectivity to a host?", a: "Ping", options: ["Ping", "Ipconfig", "Netstat", "Tracert"] },
            { q: "What device connects different networks together?", a: "Router", options: ["Switch", "Router", "Hub", "Repeater"] },
            { q: "What does DNS translate domain names into?", a: "IP Addresses", options: ["MAC Addresses", "IP Addresses", "Binary Code", "Hexadecimal"] }
        ]
    };

    const currentFiles = filesDatabase[currentKey] || [];
    const currentQuestions = quizzes[currentKey] || [];

    // Calculate Progress
    const answeredCount = Object.keys(userAnswers).length;
    const totalQuestions = currentQuestions.length;
    const progressPercentage = totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={showQuiz ? null : (selectedQuarter ? `${selectedQuarter.title}` : (selectedModule ? selectedModule.title : "Learning Modules"))}
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

                    {/* --- VIEW 2: QUARTER LIST --- */}
                    {selectedModule && !selectedQuarter && (
                        <motion.div key="quarters" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                            <button onClick={() => setSelectedModule(null)} className="text-xs font-black uppercase tracking-widest text-cyan-400 flex items-center hover:text-white transition-colors">
                                <ArrowLeft size={16} className="mr-2" /> Back to Modules
                            </button>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {quarters.map((q) => (
                                    <div key={q.id} className="bg-white/5 border border-white/10 rounded-[2rem] p-6 hover:border-cyan-500/30 transition-all flex flex-col group cursor-pointer" onClick={() => setSelectedQuarter(q)}>
                                        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 font-black text-xs mb-6">{q.id.toUpperCase()}</div>
                                        <h4 className="text-white font-black text-xl italic uppercase mb-2">{q.title}</h4>
                                        <p className="text-slate-500 text-xs mb-8 leading-relaxed">{q.topic}</p>
                                        <div className="mt-auto w-full py-3 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all bg-white/5 text-slate-400 group-hover:bg-cyan-500 group-hover:text-slate-950 flex justify-center items-center">
                                            Open Quarter
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* --- VIEW 3: FILES & RESOURCE DASHBOARD --- */}
                    {selectedQuarter && !showQuiz && (
                        <motion.div key="files" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 pb-10">
                            <button onClick={() => setSelectedQuarter(null)} className="text-xs font-black uppercase tracking-widest text-cyan-400 flex items-center hover:text-white transition-colors group">
                                <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Quarters
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Bulk Download Card */}
                                <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 p-8 rounded-[2.5rem] flex flex-col items-center text-center">
                                    <div className="p-5 bg-cyan-500 rounded-2xl mb-6 shadow-lg shadow-cyan-500/20"><Archive className="text-slate-950 w-8 h-8" /></div>
                                    <h3 className="text-xl font-black text-white uppercase italic mb-2">Bulk Download</h3>
                                    <button 
                                        onClick={handleBulkDownload} 
                                        disabled={currentFiles.length === 0 || loading} 
                                        className="w-full bg-cyan-500 text-slate-950 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-cyan-400 flex items-center justify-center active:scale-95 transition-all disabled:opacity-50 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed"
                                    >
                                        <Download size={18} className="mr-2" /> {currentFiles.length === 0 ? 'No Files Available' : (loading ? 'Downloading...' : 'Download All')}
                                    </button>
                                </div>

                                {/* Quiz Entry Card */}
                                <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] flex flex-col items-center text-center">
                                    <div className="p-5 bg-cyan-500/10 rounded-2xl mb-6">
                                        {isCompleted ? <Trophy className="text-cyan-400 w-8 h-8" /> : <CheckCircle2 className="text-cyan-400 w-8 h-8" />}
                                    </div>
                                    <h3 className="text-xl font-black text-white uppercase italic mb-2">Module Quiz</h3>
                                    <div className="text-slate-400 text-xs mb-4">
                                        {currentQuestions.length > 0 ? (score !== null ? `Previous Score: ${score} / ${currentQuestions.length}` : 'No attempt yet') : 'Not Available'}
                                    </div>
                                    <button 
                                        onClick={() => setShowQuiz(true)} 
                                        disabled={currentQuestions.length === 0}
                                        className={`w-full py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all active:scale-95 ${currentQuestions.length === 0 ? 'bg-white/5 text-slate-600 cursor-not-allowed' : 'bg-white/10 text-white hover:bg-cyan-500 hover:text-slate-950'}`}
                                    >
                                        {currentQuestions.length === 0 ? 'No Assessment Available' : (isCompleted ? 'View Result / Retake' : 'Begin Assessment')}
                                    </button>
                                </div>
                            </div>
                            
                            {/* File List */}
                            <div className="pt-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h4 className="text-white font-black uppercase tracking-[0.3em] text-[10px] flex items-center"><ChevronRight className="text-cyan-400 mr-2" size={16} /> Resources</h4>
                                    <div className="relative">
                                        <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" />
                                        <input
                                            type="text"
                                            placeholder="Search files..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 w-64"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-3">
                                    {currentFiles.length === 0 ? (
                                        <div className="p-8 border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-slate-500">
                                            <FolderOpen size={32} className="mb-2 opacity-50" />
                                            <span className="text-sm font-medium">No files uploaded for this quarter yet.</span>
                                        </div>
                                    ) : (
                                        currentFiles.filter(file => file.name.toLowerCase().includes(searchTerm.toLowerCase())).map((file, idx) => (
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
                                        ))
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* --- VIEW 4: QUIZ INTERFACE (ENHANCED UI) --- */}
                    {showQuiz && (
                        <motion.div key="quiz" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="max-w-4xl mx-auto space-y-8 pb-40">
                            
                            {/* Sticky Header with Progress */}
                            <div className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 py-4 -mx-4 px-4 md:px-0 md:mx-0 rounded-b-2xl">
                                <div className="flex justify-between items-center mb-4">
                                    <button onClick={() => setShowQuiz(false)} className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-white flex items-center group transition-colors">
                                        <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" /> 
                                        {isCompleted ? "Exit Results" : "Exit Assessment"}
                                    </button>
                                    
                                    <div className="flex items-center space-x-4">
                                        {!isCompleted ? (
                                            <div className="flex items-center text-xs font-mono text-cyan-400">
                                                <Activity size={14} className="mr-2 animate-pulse" />
                                                IN PROGRESS
                                            </div>
                                        ) : (
                                            <div className="flex items-center bg-cyan-500/10 border border-cyan-500/30 px-4 py-1 rounded-full">
                                                <Trophy size={14} className="text-cyan-400 mr-2" />
                                                <span className="text-cyan-400 font-black text-xs uppercase tracking-tighter">
                                                    Score: {score} / {currentQuestions.length}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progressPercentage}%` }}
                                        className={`h-full ${isCompleted ? 'bg-green-500' : 'bg-cyan-500'}`}
                                    />
                                </div>
                                <div className="flex justify-between mt-2 text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                                    <span>Progress</span>
                                    <span>{answeredCount} / {totalQuestions} Answered</span>
                                </div>
                            </div>

                            {/* Questions Container */}
                            <div className="space-y-8">
                                {currentQuestions.map((item, index) => (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        key={index} 
                                        className={`p-6 md:p-8 rounded-[2rem] border transition-all ${
                                            isCompleted 
                                                ? (userAnswers[index] === item.a 
                                                    ? 'bg-green-500/5 border-green-500/30' 
                                                    : (userAnswers[index] && userAnswers[index] !== item.a) 
                                                        ? 'bg-red-500/5 border-red-500/30'
                                                        : 'bg-slate-900/50 border-white/5')
                                                : 'bg-slate-900/50 border-white/5 hover:border-white/10'
                                        }`}
                                    >
                                        {/* Question Header */}
                                        <div className="flex items-start gap-4 mb-6">
                                            <span className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg ${
                                                isCompleted 
                                                    ? (userAnswers[index] === item.a ? 'bg-green-500/20 text-green-400' : 'bg-slate-800 text-slate-500') 
                                                    : 'bg-cyan-500/10 text-cyan-400'
                                            }`}>
                                                {index + 1}
                                            </span>
                                            <p className="text-base md:text-lg text-white font-medium leading-relaxed pt-1">
                                                {item.q}
                                            </p>
                                        </div>

                                        {/* Options Grid */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-0 md:pl-14">
                                            {item.options.map((opt, oIdx) => {
                                                // Determine UI State for this option
                                                const isSelected = userAnswers[index] === opt;
                                                const isCorrect = opt === item.a;
                                                const isWrong = isSelected && !isCorrect;

                                                let buttonClass = "bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:border-white/10 hover:text-white";
                                                
                                                if (isCompleted) {
                                                    if (isCorrect) buttonClass = "bg-green-500/20 border-green-500 text-green-300 shadow-[0_0_15px_rgba(34,197,94,0.2)]";
                                                    else if (isWrong) buttonClass = "bg-red-500/20 border-red-500 text-red-300 opacity-70";
                                                    else buttonClass = "bg-transparent border-transparent text-slate-600 opacity-40";
                                                } else {
                                                    if (isSelected) buttonClass = "bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)] ring-1 ring-cyan-500";
                                                }

                                                return (
                                                    <button 
                                                        key={oIdx} 
                                                        onClick={() => handleSelectOption(index, opt)} 
                                                        disabled={isCompleted}
                                                        className={`relative w-full text-left p-4 rounded-xl border transition-all duration-200 text-sm font-medium flex items-center justify-between group ${buttonClass}`}
                                                    >
                                                        <span className="pr-4">{opt}</span>
                                                        
                                                        {/* Status Icons */}
                                                        {isCompleted && isCorrect && <CheckCircle2 size={18} className="text-green-400 flex-shrink-0" />}
                                                        {isCompleted && isWrong && <XCircle size={18} className="text-red-400 flex-shrink-0" />}
                                                        {!isCompleted && isSelected && <div className="w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />}
                                                        {!isCompleted && !isSelected && <div className="w-4 h-4 rounded-full border border-slate-600 group-hover:border-slate-400" />}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Floating Footer */}
                            <div className="fixed bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-slate-950 via-slate-950/95 to-transparent flex flex-col md:flex-row gap-4 justify-center items-center z-50 pointer-events-none">
                                <div className="pointer-events-auto">
                                    {!isCompleted ? (
                                        <button 
                                            onClick={handleSubmitQuiz} 
                                            className="group bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-12 py-4 rounded-2xl font-black uppercase text-xs tracking-widest italic shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_50px_rgba(6,182,212,0.6)] active:scale-95 transition-all flex items-center"
                                        >
                                            Submit Assessment
                                            <ChevronRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    ) : (
                                        <div className="flex gap-4">
                                            <div className="bg-slate-900 border border-slate-800 px-8 py-4 rounded-2xl text-slate-400 font-bold uppercase text-[10px] tracking-widest flex items-center shadow-2xl">
                                                <PieChart size={14} className="mr-3 text-green-500" /> 
                                                Result: {Math.round((score / currentQuestions.length) * 100)}%
                                            </div>
                                            <button 
                                                onClick={handleRetake}
                                                className="bg-white text-slate-950 px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-200 flex items-center transition-all active:scale-95 shadow-xl"
                                            >
                                                <RotateCcw size={14} className="mr-3" /> Retake
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </AuthenticatedLayout>
    );
}