// resources/js/Pages/Student/Dashboard.jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { LayoutDashboard, GraduationCap, BookOpen, Clock } from 'lucide-react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-black text-xl text-cyan-400 leading-tight">Student Dashboard</h2>}
        >
            <Head title="Student Dashboard" />

            <div className="py-12 bg-[#0f172a] min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Welcome Card */}
                    <div className="bg-slate-900/50 border border-slate-800 overflow-hidden shadow-2xl sm:rounded-3xl p-8 mb-6">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-cyan-500/10 rounded-2xl">
                                <GraduationCap className="text-cyan-400 w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-white">
                                    Welcome back, <span className="text-cyan-400">{auth.user.name}</span>!
                                </h3>
                                <p className="text-slate-400 text-sm">You are logged in to the Grade 10 ICT-TLE Portal.</p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats/Links */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl hover:border-cyan-500/30 transition-all">
                            <BookOpen className="text-cyan-400 mb-4" />
                            <h4 className="text-white font-bold">My Modules</h4>
                            <p className="text-slate-500 text-xs mt-2">Access your ICT learning materials.</p>
                        </div>
                        {/* Dagdag pa dito... */}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}