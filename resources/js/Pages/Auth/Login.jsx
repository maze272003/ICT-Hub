import { useEffect, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
// Removed Cpu from import since we are replacing it with an image
import { User, Lock, ArrowLeft, Sparkles, AlertCircle, Mail, Hash, Eye, EyeOff } from 'lucide-react';

export default function Login({ status, canResetPassword }) {
    // State para sa pag-switch ng Login Method (Email vs LRN)
    const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'lrn'
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        login: '', 
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    // Function kapag nagpalit ng Tab (Lilinisin ang errors at input)
    const toggleMethod = (method) => {
        setLoginMethod(method);
        setData('login', ''); // Clear input field
        clearErrors(); // Remove validation errors
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 font-sans selection:bg-cyan-500/30 relative overflow-hidden">
            <Head title="Log in" />

            {/* Ambient Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="absolute top-6 left-6">
                <Link href="/" className="flex items-center text-slate-500 hover:text-cyan-400 transition-all group">
                    <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-black tracking-widest uppercase italic">Portal Home</span>
                </Link>
            </div>

            <div className="w-full max-w-md relative z-10">
                <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden">
                    
                    <div className="relative text-center mb-8">
                        {/* --- CHANGED: Replaced Blue Box with Large Image Only --- */}
                        <div className="flex justify-center mb-6">
                            <img 
                                src="/images/fmnhs.png" 
                                alt="FMNHS Logo" 
                                className="w-24 h-24 md:w-32 md:h-32 object-contain transform hover:scale-105 transition-transform duration-500" 
                            />
                        </div>
                        {/* ------------------------------------------------------- */}
                        
                        <h1 className="text-3xl font-black text-white tracking-tight italic uppercase">
                            Tech<span className="text-cyan-400">Nest</span> Login
                        </h1>
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">
                            ICT-TLE specialized portal
                        </p>
                    </div>

                    {status && (
                        <div className="mb-6 p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs font-black text-cyan-400 text-center uppercase tracking-widest italic animate-pulse">
                            {status}
                        </div>
                    )}

                    {/* --- TAB SWITCHER --- */}
                    <div className="grid grid-cols-2 gap-2 mb-8 p-1 bg-slate-950/50 rounded-xl border border-white/5">
                        <button
                            type="button"
                            onClick={() => toggleMethod('email')}
                            className={`flex items-center justify-center py-2.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
                                loginMethod === 'email' 
                                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' 
                                : 'text-slate-500 hover:text-slate-300'
                            }`}
                        >
                            <Mail size={14} className="mr-2" /> Email
                        </button>
                        <button
                            type="button"
                            onClick={() => toggleMethod('lrn')}
                            className={`flex items-center justify-center py-2.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
                                loginMethod === 'lrn' 
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                                : 'text-slate-500 hover:text-slate-300'
                            }`}
                        >
                            <Hash size={14} className="mr-2" /> LRN
                        </button>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        
                        {/* DYNAMIC INPUT FIELD BASED ON TAB */}
                        <div>
                            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 ml-1">
                                {loginMethod === 'email' ? 'Email Address' : 'Student LRN'}
                            </label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors">
                                    {loginMethod === 'email' ? <User size={18} /> : <Hash size={18} />}
                                </div>
                                <input
                                    type={loginMethod === 'email' ? 'email' : 'text'}
                                    inputMode={loginMethod === 'lrn' ? 'numeric' : 'text'}
                                    value={data.login}
                                    onChange={(e) => setData('login', e.target.value)}
                                    className="w-full bg-slate-950/50 border border-white/5 text-white rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-cyan-500/40 focus:ring-4 focus:ring-cyan-500/5 transition-all placeholder:text-slate-700 font-medium"
                                    placeholder={loginMethod === 'email' ? 'student@school.edu.ph' : 'Enter 12-Digit LRN'}
                                    required
                                />
                            </div>
                            {errors.login && (
                                <p className="mt-2 text-[10px] font-black text-red-400 flex items-center uppercase tracking-widest italic">
                                    <AlertCircle size={14} className="mr-1" /> {errors.login}
                                </p>
                            )}
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2 ml-1">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                                    Password
                                </label>
                                {canResetPassword && (
                                    <Link href={route('password.request')} className="text-[9px] font-black text-cyan-500 uppercase tracking-tighter hover:text-cyan-300 transition-colors italic">
                                        Forgot?
                                    </Link>
                                )}
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full bg-slate-950/50 border border-white/5 text-white rounded-xl py-4 pl-12 pr-12 focus:outline-none focus:border-cyan-500/40 focus:ring-4 focus:ring-cyan-500/5 transition-all placeholder:text-slate-700"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-400 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-2 text-[10px] font-black text-red-400 flex items-center uppercase tracking-widest italic">
                                    <AlertCircle size={14} className="mr-1" /> {errors.password}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center ml-1">
                            <input
                                id="remember_me"
                                type="checkbox"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="w-4 h-4 rounded border-white/10 bg-slate-950 text-cyan-500 focus:ring-cyan-500/20 focus:ring-offset-0 transition-all cursor-pointer"
                            />
                            <label htmlFor="remember_me" className="ms-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest cursor-pointer select-none">
                                Keep session active
                            </label>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white font-black uppercase tracking-[0.2em] py-4 rounded-xl shadow-2xl shadow-cyan-500/20 transition-all transform hover:-translate-y-1 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center italic text-xs"
                            >
                                {processing ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <Sparkles size={16} className="mr-2" />
                                        {loginMethod === 'email' ? 'Login via Email' : 'Login via LRN'}
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                <p className="mt-8 text-center text-slate-600 text-[9px] font-bold uppercase tracking-[0.4em]">
                    FMNHS ICT Research Project • 2026
                </p>
            </div>
        </div>
    );
}