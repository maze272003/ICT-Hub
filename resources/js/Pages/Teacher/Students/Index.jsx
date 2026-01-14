import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react'; // Import 'router'
import { UserPlus, Search, Mail, Edit2, Trash2, Users } from 'lucide-react';
import { useState } from 'react';

export default function Index({ auth, students = [], filters }) {
    // State for search
    const [searchTerm, setSearchTerm] = useState(filters?.search || '');

    // Handle Search on Enter Key
    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            router.get(route('students.index'), { search: searchTerm }, {
                preserveState: true,
                replace: true,
            });
        }
    };

    // Handle Delete
    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this student?')) {
            router.delete(route('students.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Students Directory"
        >
            <Head title="Students" />

            <div className="space-y-6 py-6">
                {/* --- ACTION BAR --- */}
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative w-full md:w-96 group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                        </div>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleSearch}
                            placeholder="Search students (Press Enter)..."
                            className="block w-full pl-11 pr-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-2xl backdrop-blur-md text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/40 transition-all shadow-2xl"
                        />
                    </div>

                    <Link
                        href={route('students.create')}
                        className="w-full md:w-auto flex items-center justify-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-sm font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-cyan-500/20 transition-all transform hover:-translate-y-0.5"
                    >
                        <UserPlus size={18} className="me-2" />
                        Add New Student
                    </Link>
                </div>

                {/* --- STUDENTS TABLE --- */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative overflow-hidden bg-slate-900/40 backdrop-blur-2xl border border-white/5 shadow-2xl rounded-[2rem]">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/[0.02] border-b border-white/[0.05]">
                                <th className="px-6 py-5 text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em]">Student Details</th>
                                <th className="px-6 py-5 text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em] hidden md:table-cell">LRN</th>
                                <th className="px-6 py-5 text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em] hidden lg:table-cell">Contact</th>
                                <th className="px-6 py-5 text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.02]">
                            {students.length > 0 ? (
                                students.map((student) => (
                                    <tr key={student.id} className="group/row hover:bg-white/[0.02] transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-4">
                                                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center font-bold text-cyan-400">
                                                    {student.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-bold text-white tracking-tight">{student.name}</div>
                                                    <div className="text-[10px] text-slate-500 uppercase font-medium md:hidden">LRN: {student.lrn}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 hidden md:table-cell text-slate-300 text-sm">
                                            {student.lrn}
                                        </td>
                                        <td className="px-6 py-4 hidden lg:table-cell text-xs text-slate-400">
                                            <Mail size={12} className="inline me-2 opacity-50" />
                                            {student.email}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end space-x-2">
                                                {/* Edit Button */}
                                                <Link 
                                                    href={route('students.edit', student.id)}
                                                    className="p-2 text-slate-500 hover:text-cyan-400 transition-all"
                                                >
                                                    <Edit2 size={16} />
                                                </Link>
                                                
                                                {/* Delete Button */}
                                                <button 
                                                    onClick={() => handleDelete(student.id)}
                                                    className="p-2 text-slate-500 hover:text-red-400 transition-all"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-24 text-center">
                                        <div className="flex flex-col items-center justify-center space-y-4">
                                            <Users size={48} className="text-slate-600" />
                                            <div className="space-y-1">
                                                <h5 className="text-white font-black uppercase tracking-widest">No Students Found</h5>
                                                <p className="text-slate-500 text-xs">The student directory is currently empty.</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}