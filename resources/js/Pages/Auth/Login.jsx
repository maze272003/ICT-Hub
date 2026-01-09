import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Mail, Lock, Cpu, ArrowLeft, Sparkles, AlertCircle } from 'lucide-react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 font-sans selection:bg-cyan-500/30">
            <Head title="Log in" />

            {/* Back to Home Navigation */}
            <div className="absolute top-6 left-6">
                <Link 
                    href="/" 
                    className="flex items-center text-slate-500 hover:text-cyan-400 transition-all group"
                >
                    <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-semibold tracking-wide uppercase">Portal Home</span>
                </Link>
            </div>

            <div className="w-full max-w-md">
                {/* Custom Card Container */}
                <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                    {/* Background Decorative Glow */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl"></div>
                    
                    {/* Header Section */}
                    <div className="relative text-center mb-10">
                        <div className="inline-flex p-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-lg shadow-cyan-500/20 mb-6 transform -rotate-3">
                            <Cpu className="text-white w-8 h-8" />
                        </div>
                        <h1 className="text-3xl font-black text-white tracking-tight mb-2">
                            Tech<span className="text-cyan-400">Nest</span> Login
                        </h1>
                        <p className="text-slate-400 text-sm font-medium">
                            ICT-TLE Specialized Learning Portal
                        </p>
                    </div>

                    {status && (
                        <div className="mb-6 p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-sm font-medium text-cyan-400 text-center animate-pulse">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-5 relative">
                        {/* Email Address */}
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">
                                Institutional Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full bg-slate-950/50 border border-slate-700 text-white rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 transition-all placeholder:text-slate-700"
                                    placeholder="student@fmnhs.edu.ph"
                                    autoComplete="username"
                                    required
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-2 text-xs font-bold text-red-400 flex items-center">
                                    <AlertCircle size={14} className="mr-1" /> {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex justify-between items-center mb-2 ml-1">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                                    Password
                                </label>
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-[10px] font-black text-cyan-500 uppercase tracking-tighter hover:text-cyan-300 transition-colors"
                                    >
                                        Forgot?
                                    </Link>
                                )}
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full bg-slate-950/50 border border-slate-700 text-white rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 transition-all placeholder:text-slate-700"
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                    required
                                />
                            </div>
                            {errors.password && (
                                <p className="mt-2 text-xs font-bold text-red-400 flex items-center">
                                    <AlertCircle size={14} className="mr-1" /> {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center ml-1">
                            <input
                                id="remember_me"
                                type="checkbox"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-cyan-500/20 focus:ring-offset-0"
                            />
                            <label htmlFor="remember_me" className="ms-3 text-xs font-semibold text-slate-500 cursor-pointer select-none">
                                Keep me logged in
                            </label>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black uppercase tracking-widest py-4 rounded-xl shadow-lg shadow-cyan-500/20 transition-all transform hover:-translate-y-1 active:scale-[0.98] disabled:opacity-50 disabled:translate-y-0 flex items-center justify-center"
                            >
                                {processing ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <Sparkles size={18} className="mr-2" />
                                        Launch Portal
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Footer Attribution */}
                <p className="mt-8 text-center text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em]">
                    FMNHS ICT Research Project © 2026
                </p>
            </div>
        </div>
    );
}