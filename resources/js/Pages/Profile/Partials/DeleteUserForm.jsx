import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
// Idinagdag ang Lucide icons para sa TechNest style
import { Trash2, AlertTriangle, XCircle } from 'lucide-react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };

    return (
        <section className={`relative space-y-6 bg-slate-900/40 backdrop-blur-2xl border border-white/5 p-8 rounded-[2rem] shadow-2xl overflow-hidden ${className}`}>
            {/* Ambient Background Glow (Subtle) */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-500/5 rounded-full blur-3xl"></div>

            <header className="relative z-10 flex items-start gap-4">
                <div className="p-3 bg-red-500/10 rounded-2xl border border-red-500/20 text-red-400">
                    <Trash2 size={24} />
                </div>
                <div>
                    <h2 className="text-xl font-black text-white tracking-tight italic uppercase">
                        Danger Zone: <span className="text-red-500">Delete Account</span>
                    </h2>

                    <p className="mt-2 text-sm text-slate-400 font-medium leading-relaxed max-w-xl">
                        Once your account is deleted, all of its resources and data
                        will be permanently removed. Please download any data or information 
                        that you wish to retain before proceeding.
                    </p>
                </div>
            </header>

            <div className="relative z-10">
                <DangerButton 
                    onClick={confirmUserDeletion}
                    className="bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300 rounded-xl px-6 py-2.5 font-black uppercase tracking-widest text-[10px]"
                >
                    Permanently Delete Account
                </DangerButton>
            </div>

            {/* TechNest Themed Modal */}
            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-8 bg-slate-950 border border-white/10 rounded-[2rem] relative overflow-hidden">
                    {/* Inner Modal Glow */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50"></div>

                    <div className="flex items-center gap-3 mb-6">
                        <AlertTriangle className="text-red-500" size={28} />
                        <h2 className="text-2xl font-black text-white tracking-tight uppercase italic">
                            Confirm Deletion
                        </h2>
                    </div>

                    <p className="text-sm text-slate-400 font-medium leading-relaxed mb-8">
                        This action is irreversible. Please enter your password to confirm 
                        you would like to permanently delete your account.
                    </p>

                    <div className="space-y-4">
                        <InputLabel
                            htmlFor="password"
                            value="Confirm Identity"
                            className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full bg-white/[0.03] border-white/[0.08] text-white focus:ring-red-500/20 focus:border-red-500/40 rounded-xl"
                            isFocused
                            placeholder="Enter password to confirm"
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2 text-red-400 font-bold italic text-xs"
                        />
                    </div>

                    <div className="mt-10 flex justify-end gap-4">
                        <SecondaryButton 
                            onClick={closeModal}
                            className="bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 rounded-xl px-6 py-2 text-[10px] font-black uppercase tracking-widest"
                        >
                            Nevermind, Cancel
                        </SecondaryButton>

                        <DangerButton 
                            className="bg-red-500 text-white shadow-lg shadow-red-500/20 rounded-xl px-6 py-2 text-[10px] font-black uppercase tracking-widest"
                            disabled={processing}
                        >
                            {processing ? 'Processing...' : 'Delete Permanently'}
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}