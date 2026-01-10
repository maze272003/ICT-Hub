import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';
// Lucide icons para sa TechNest style
import { ShieldCheck, Key, Lock, CheckCircle } from 'lucide-react';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();
        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }
                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={`relative bg-slate-900/40 backdrop-blur-2xl border border-white/5 p-8 rounded-[2rem] shadow-2xl overflow-hidden ${className}`}>
            {/* Ambient Glow */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl"></div>

            <header className="relative z-10 flex items-start gap-4 mb-8">
                <div className="p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/20 text-cyan-400">
                    <ShieldCheck size={24} />
                </div>
                <div>
                    <h2 className="text-xl font-black text-white tracking-tight uppercase italic">
                        Security: <span className="text-cyan-400">Update Password</span>
                    </h2>
                    <p className="mt-1 text-sm text-slate-400 font-medium">
                        Ensure your account is using a long, random password to stay secure.
                    </p>
                </div>
            </header>

            <form onSubmit={updatePassword} className="relative z-10 space-y-6">
                <div className="space-y-2">
                    <InputLabel htmlFor="current_password" value="Current Password" 
                        className="text-[10px] font-black uppercase tracking-widest text-slate-500" />
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                        <TextInput
                            id="current_password"
                            ref={currentPasswordInput}
                            value={data.current_password}
                            onChange={(e) => setData('current_password', e.target.value)}
                            type="password"
                            className="block w-full pl-11 bg-white/[0.03] border-white/[0.08] text-white focus:ring-cyan-500/20 focus:border-cyan-500/40 rounded-xl"
                            autoComplete="current-password"
                        />
                    </div>
                    <InputError message={errors.current_password} className="mt-2 italic text-red-400 font-bold text-xs" />
                </div>

                <div className="space-y-2">
                    <InputLabel htmlFor="password" value="New Password" 
                        className="text-[10px] font-black uppercase tracking-widest text-slate-500" />
                    <div className="relative">
                        <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                        <TextInput
                            id="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            type="password"
                            className="block w-full pl-11 bg-white/[0.03] border-white/[0.08] text-white focus:ring-cyan-500/20 focus:border-cyan-500/40 rounded-xl"
                            autoComplete="new-password"
                        />
                    </div>
                    <InputError message={errors.password} className="mt-2 italic text-red-400 font-bold text-xs" />
                </div>

                <div className="space-y-2">
                    <InputLabel htmlFor="password_confirmation" value="Confirm New Password" 
                        className="text-[10px] font-black uppercase tracking-widest text-slate-500" />
                    <TextInput
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        type="password"
                        className="mt-1 block w-full bg-white/[0.03] border-white/[0.08] text-white focus:ring-cyan-500/20 focus:border-cyan-500/40 rounded-xl"
                        autoComplete="new-password"
                    />
                    <InputError message={errors.password_confirmation} className="mt-2 italic text-red-400 font-bold text-xs" />
                </div>

                <div className="flex items-center gap-4 pt-4">
                    <PrimaryButton 
                        disabled={processing}
                        className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-2.5 rounded-xl font-black uppercase tracking-widest text-[10px] italic shadow-lg shadow-cyan-500/20"
                    >
                        {processing ? 'Syncing...' : 'Update Credentials'}
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out duration-500"
                        enterFrom="opacity-0 translate-x-4"
                        leave="transition ease-in-out duration-500"
                        leaveTo="opacity-0 -translate-x-4"
                    >
                        <div className="flex items-center gap-2 text-cyan-400 font-black italic text-xs uppercase tracking-widest">
                            <CheckCircle size={14} />
                            Success: Password Updated
                        </div>
                    </Transition>
                </div>
            </form>
        </section>
    );
}