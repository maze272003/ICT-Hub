import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Save, ArrowLeft } from 'lucide-react';

export default function Edit({ auth, student }) {
    const { data, setData, put, processing, errors } = useForm({
        name: student.name,
        email: student.email,
        lrn: student.lrn || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('students.update', student.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Edit Student"
        >
            <Head title="Edit Student" />

            <div className="py-12">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/5 shadow-2xl rounded-[2rem] p-8">
                        
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-xl font-black text-white uppercase tracking-widest">Update Details</h2>
                            <Link href={route('students.index')} className="text-slate-400 hover:text-white transition-colors">
                                <ArrowLeft />
                            </Link>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            {/* Name */}
                            <div>
                                <label className="block text-xs font-bold text-cyan-400 uppercase tracking-widest mb-2">Full Name</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                                />
                                {errors.name && <div className="text-red-400 text-xs mt-1">{errors.name}</div>}
                            </div>

                            {/* LRN */}
                            <div>
                                <label className="block text-xs font-bold text-cyan-400 uppercase tracking-widest mb-2">LRN</label>
                                <input
                                    type="text"
                                    value={data.lrn}
                                    onChange={e => setData('lrn', e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                                />
                                {errors.lrn && <div className="text-red-400 text-xs mt-1">{errors.lrn}</div>}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-xs font-bold text-cyan-400 uppercase tracking-widest mb-2">Email Address</label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                                />
                                {errors.email && <div className="text-red-400 text-xs mt-1">{errors.email}</div>}
                            </div>

                            <div className="pt-4">
                                <button
                                    disabled={processing}
                                    className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-sm font-black uppercase tracking-widest rounded-xl shadow-lg shadow-cyan-500/20 transition-all transform hover:-translate-y-0.5 disabled:opacity-50"
                                >
                                    <Save size={18} className="me-2" />
                                    Update Student
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}