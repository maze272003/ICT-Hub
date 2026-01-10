import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
// TechNest Icons
import { User, Mail, CheckCircle, Info } from 'lucide-react';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <section className={`relative bg-slate-900/40 backdrop-blur-2xl border border-white/5 p-8 rounded-[2rem] shadow-2xl overflow-hidden ${className}`}>
            {/* Ambient Background Glow */}
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl"></div>

            <header className="relative z-10 flex items-start gap-4 mb-8">
                <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20 text-blue-400">
                    <User size={24} />
                </div>
                <div>
                    <h2 className="text-xl font-black text-white tracking-tight uppercase italic">
                        Identity: <span className="text-blue-400">Profile Information</span>
                    </h2>
                    <p className="mt-1 text-sm text-slate-400 font-medium leading-relaxed">
                        Update your account's profile information and email address.
                    </p>
                </div>
            </header>

            <form onSubmit={submit} className="relative z-10 space-y-6">
                <div className="space-y-2">
                    <InputLabel htmlFor="name" value="Full Name" 
                        className="text-[10px] font-black uppercase tracking-widest text-slate-500" />
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                        <TextInput
                            id="name"
                            className="block w-full pl-11 bg-white/[0.03] border-white/[0.08] text-white focus:ring-blue-500/20 focus:border-blue-500/40 rounded-xl"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            isFocused
                            autoComplete="name"
                        />
                    </div>
                    <InputError className="mt-2 italic text-red-400 font-bold text-xs" message={errors.name} />
                </div>

                <div className="space-y-2">
                    <InputLabel htmlFor="email" value="Email Address" 
                        className="text-[10px] font-black uppercase tracking-widest text-slate-500" />
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                        <TextInput
                            id="email"
                            type="email"
                            className="block w-full pl-11 bg-white/[0.03] border-white/[0.08] text-white focus:ring-blue-500/20 focus:border-blue-500/40 rounded-xl"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            autoComplete="username"
                        />
                    </div>
                    <InputError className="mt-2 italic text-red-400 font-bold text-xs" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-start gap-3">
                        <Info className="text-slate-500 shrink-0" size={18} />
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-tight">
                                Verification Required
                            </p>
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="text-[10px] font-black uppercase tracking-tighter text-cyan-400 hover:text-cyan-300 mt-1"
                            >
                                Re-send verification email
                            </Link>
                            {status === 'verification-link-sent' && (
                                <div className="mt-2 text-[10px] font-black text-green-400 italic">
                                    Done: New link dispatched to your inbox.
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div className="flex items-center gap-4 pt-4">
                    <PrimaryButton 
                        disabled={processing}
                        className="bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-2.5 rounded-xl font-black uppercase tracking-widest text-[10px] italic"
                    >
                        {processing ? 'Saving...' : 'Save Changes'}
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in duration-500"
                        enterFrom="opacity-0 translate-x-4"
                        leave="transition ease-out duration-500"
                        leaveTo="opacity-0 -translate-x-4"
                    >
                        <div className="flex items-center gap-2 text-blue-400 font-black italic text-xs uppercase tracking-widest">
                            <CheckCircle size={14} />
                            Success: Info Updated
                        </div>
                    </Transition>
                </div>
            </form>
        </section>
    );
}