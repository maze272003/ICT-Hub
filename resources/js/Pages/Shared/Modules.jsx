import React, { useState, useEffect, useMemo } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { 
  BookOpen, Search, ChevronRight, ArrowLeft, 
  Download, FileText, Eye, Archive, 
  CheckCircle2, Trophy, RotateCcw, Lock, FolderOpen
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

    const currentKey = useMemo(() => {
        if (selectedModule && selectedQuarter) {
            return `${selectedModule.code}_${selectedQuarter.id}`;
        }
        return null;
    }, [selectedModule, selectedQuarter]);

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

    }, [currentKey]);

    const handleSelectOption = (questionIndex, option) => {
        if (isCompleted) return; 

        const updatedAnswers = { ...userAnswers, [questionIndex]: option };
        setUserAnswers(updatedAnswers);
        localStorage.setItem(`quiz_answers_${currentKey}`, JSON.stringify(updatedAnswers));
    };

    const handleSubmitQuiz = () => {
        if (isCompleted) return;

        const currentQuestions = quizzes[currentKey] || [];
        let correctCount = 0;
        currentQuestions.forEach((item, index) => {
            if (userAnswers[index] === item.a) correctCount++;
        });

        setScore(correctCount);
        setIsCompleted(true);
        localStorage.setItem(`quiz_score_${currentKey}`, correctCount.toString());
        localStorage.setItem(`quiz_completed_${currentKey}`, 'true');
        
        alert(`Quiz Submitted! Score: ${correctCount} / ${currentQuestions.length}`);
    };

    const handleRetake = () => {
        if (window.confirm("Retake quiz? Current answers will be cleared, but your previous score is saved.")) {
            setIsCompleted(false);
            setUserAnswers({});
            localStorage.removeItem(`quiz_answers_${currentKey}`);
            localStorage.setItem(`quiz_completed_${currentKey}`, 'false');
        }
    };

    const handleFileView = (file) => {
        const fileUrl = `${window.location.origin}/files/${selectedModule?.code}/${selectedQuarter?.id}/${file.name}`;
        window.open(fileUrl, '_blank');
    };

    const handleDownload = (fileName) => {
        setLoading(true);
        setTimeout(() => setLoading(false), 1000); 
    };

    const handleBulkDownload = () => {
        setLoading(true);
        setTimeout(() => setLoading(false), 1000);
    };

    const modules = [
        { id: 1, title: 'Practical Research 1', code: 'PR1', status: 'Available' },
        { id: 2, title: 'Computer Hardware Servicing', code: 'CHS', status: 'Available' },
        { id: 3, title: 'Network Configuration', code: 'NET', status: 'Available' },
    ];

    const quarters = [
        { id: 'q1', title: 'Quarter 1', topic: 'Fundamentals & Basics' },
        { id: 'q2', title: 'Quarter 2', topic: 'Advanced Configuration' },
        { id: 'q3', title: 'Quarter 3', topic: 'Maintenance & Diagnostics' },
        { id: 'q4', title: 'Quarter 4', topic: 'Final Project & Review' },
    ];

    const filesDatabase = {
        'PR1_q1': [
            { name: '1pr.pdf', type: 'pdf' }, { name: '2pr.pdf', type: 'pdf' },
            { name: '3pr.pdf', type: 'pdf' }, { name: '4pr.pdf', type: 'pdf' },
            { name: '5pr.pdf', type: 'pdf' }, { name: '6pr.pdf', type: 'pdf' },
            { name: '7pr.pdf', type: 'pdf' }, { name: 'https_www.can.txt', type: 'txt' },
            { name: 'Research-Characteristics.pptx', type: 'pptx' },
            { name: 'week-2-what-is-an-information-system.pptx', type: 'pptx' },
        ],
        'PR1_q2': [
            { name: 'Qualitative_Research_Designs.pdf', type: 'pdf' },
            { name: 'Sampling_Methods.pptx', type: 'pptx' },
        ],
        'NET_q1': [
            { name: 'Intro_to_Networking.pdf', type: 'pdf' },
            { name: 'OSI_Model.pptx', type: 'pptx' },
        ],
        'NET_q2': [
            { name: 'Subnetting_Guide.pdf', type: 'pdf' },
            { name: 'Router_Configuration.txt', type: 'txt' },
            { name: 'Cisco_Packet_Tracer_Lab.pptx', type: 'pptx' },
        ],
        'CHS_q1': [
            { name: 'Hardware_Tools_Safety.pdf', type: 'pdf' },
        ],
        'CHS_q2': [
            { name: 'Windows_Installation_Step_by_Step.pptx', type: 'pptx' },
            { name: 'BIOS_Setup.pdf', type: 'pdf' },
        ]
    };

    const quizzes = {
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
        ],
        'NET_q2': [
            { q: "Which command is used to display IP configuration in Windows?", a: "ipconfig", options: ["ifconfig", "ipconfig", "show ip", "net config"] },
            { q: "What is the subnet mask for a /24 network?", a: "255.255.255.0", options: ["255.0.0.0", "255.255.0.0", "255.255.255.0", "255.255.255.255"] },
            { q: "What protocol automates IP address assignment?", a: "DHCP", options: ["DNS", "DHCP", "FTP", "ARP"] },
            { q: "Which layer of the OSI model does a router operate on?", a: "Network", options: ["Physical", "Data Link", "Network", "Transport"] },
            { q: "What does wireless SSID stand for?", a: "Service Set Identifier", options: ["Secure Socket ID", "Service Set Identifier", "System Security ID", "Standard Set ID"] },
            { q: "Which cable type has the highest bandwidth?", a: "Fiber Optic", options: ["Coaxial", "Cat5e", "Cat6", "Fiber Optic"] },
            { q: "What is the loopback IP address?", a: "127.0.0.1", options: ["192.168.1.1", "10.0.0.1", "127.0.0.1", "0.0.0.0"] },
            { q: "Which command traces the path to a destination?", a: "tracert", options: ["ping", "tracert", "netstat", "nslookup"] },
            { q: "What port number is used by HTTP?", a: "80", options: ["21", "25", "80", "443"] },
            { q: "Which wireless standard is Wi-Fi 6?", a: "802.11ax", options: ["802.11n", "802.11ac", "802.11ax", "802.11g"] }
        ],
        'CHS_q1': [
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
        'CHS_q2': [
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
        'PR1_q1': [
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
        'PR1_q2': [
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
        ]
    };

    const currentFiles = filesDatabase[currentKey] || [];
    const currentQuestions = quizzes[currentKey] || [];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={showQuiz ? `Assessment: ${selectedModule?.code} - ${selectedQuarter?.title}` : (selectedQuarter ? `${selectedQuarter.title}` : (selectedModule ? selectedModule.title : "Learning Modules"))}
        >
            <Head title="TechNest | Learning" />

            <div className="max-w-7xl mx-auto space-y-6">
                <AnimatePresence mode="wait">
                    
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

                    {selectedQuarter && !showQuiz && (
                        <motion.div key="files" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 pb-10">
                            <button onClick={() => setSelectedQuarter(null)} className="text-xs font-black uppercase tracking-widest text-cyan-400 flex items-center hover:text-white transition-colors group">
                                <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Quarters
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                                <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] flex flex-col items-center text-center">
                                    <div className="p-5 bg-cyan-500/10 rounded-2xl mb-6"><CheckCircle2 className="text-cyan-400 w-8 h-8" /></div>
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

                    {showQuiz && (
                        <motion.div key="quiz" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-3xl mx-auto space-y-8 pb-40">
                            <div className="flex flex-col md:flex-row justify-between items-center border-b border-white/5 pb-6 gap-4">
                                <button onClick={() => setShowQuiz(false)} className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-white flex items-center group">
                                    <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Exit Quiz
                                </button>
                                {isCompleted && (
                                    <div className="flex items-center bg-cyan-500/10 border border-cyan-500/30 px-6 py-2 rounded-2xl">
                                        <Trophy size={18} className="text-cyan-400 mr-3" />
                                        <span className="text-cyan-400 font-black text-sm uppercase tracking-tighter">
                                            Score: {score} / {currentQuestions.length}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-12">
                                {currentQuestions.map((item, index) => (
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
                                                        isCompleted 
                                                            ? (
                                                                opt === item.a 
                                                                    ? 'bg-green-500/20 border-green-500 text-green-400' 
                                                                    : userAnswers[index] === opt 
                                                                        ? 'bg-red-500/20 border-red-500 text-red-400' 
                                                                        : 'bg-white/5 border-white/5 text-slate-600 opacity-50'
                                                            )
                                                            : (
                                                                userAnswers[index] === opt 
                                                                    ? 'bg-cyan-500 border-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/30 scale-[1.02]' 
                                                                    : 'bg-white/5 border-white/5 text-slate-400 hover:border-cyan-500/50'
                                                            )
                                                    }`}
                                                >
                                                    {opt}
                                                    {isCompleted && opt === item.a && <span className="float-right font-bold">✓ Correct</span>}
                                                    {isCompleted && userAnswers[index] === opt && opt !== item.a && <span className="float-right font-bold">✗ Your Answer</span>}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="fixed bottom-0 left-0 right-0 p-8 bg-slate-950/90 backdrop-blur-xl border-t border-white/5 flex flex-col md:flex-row gap-4 justify-center items-center z-50">
                                {!isCompleted ? (
                                    <button 
                                        onClick={handleSubmitQuiz} 
                                        className="bg-cyan-500 text-slate-950 px-16 py-4 rounded-2xl font-black uppercase text-xs tracking-widest italic shadow-2xl shadow-cyan-500/30 active:scale-95 transition-all"
                                    >
                                        Submit Assessment
                                    </button>
                                ) : (
                                    <div className="flex gap-4">
                                        <div className="bg-green-500/10 border border-green-500/30 px-8 py-4 rounded-2xl text-green-400 font-black uppercase text-[10px] tracking-widest flex items-center">
                                            <CheckCircle2 size={14} className="mr-3" /> Result Shown
                                        </div>
                                        <button 
                                            onClick={handleRetake}
                                            className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-white/20 flex items-center transition-all active:scale-95"
                                        >
                                            <RotateCcw size={14} className="mr-3" /> Retake Quiz
                                        </button>
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