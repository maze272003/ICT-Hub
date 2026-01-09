import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
// I-import ang icons para sa branding consistency
import { Cpu, User, LogOut, LayoutDashboard, Menu, X, ChevronDown } from 'lucide-react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-[#0f172a] selection:bg-cyan-500/30">
            {/* --- NAVIGATION BAR --- */}
            <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            {/* Logo Section */}
                            <div className="flex shrink-0 items-center">
                                <Link href="/" className="flex items-center space-x-2 group">
                                    <div className="p-1.5 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg shadow-lg group-hover:rotate-3 transition-transform">
                                        <Cpu className="text-white w-5 h-5" />
                                    </div>
                                    <span className="text-xl font-black tracking-tighter text-white">
                                        Tech<span className="text-cyan-400">Nest</span>
                                    </span>
                                </Link>
                            </div>

                            {/* Desktop Navigation Links */}
                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                    className="text-slate-400 hover:text-cyan-400 font-bold uppercase tracking-widest text-[10px]"
                                >
                                    <LayoutDashboard size={14} className="me-2" />
                                    Dashboard
                                </NavLink>
                            </div>
                        </div>

                        {/* User Dropdown Section */}
                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-2 text-sm font-bold leading-4 text-slate-300 transition duration-150 ease-in-out hover:text-cyan-400 hover:border-cyan-500/50 focus:outline-none"
                                            >
                                                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center me-2">
                                                    <User size={14} className="text-white" />
                                                </div>
                                                {user.name}
                                                <ChevronDown size={14} className="ms-2 text-slate-500" />
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content contentClasses="py-1 bg-slate-900 border border-slate-800 shadow-2xl">
                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                            className="flex items-center text-slate-400 hover:bg-slate-800 hover:text-cyan-400 font-semibold"
                                        >
                                            <User size={14} className="me-2" /> Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="flex items-center text-slate-400 hover:bg-red-500/10 hover:text-red-400 font-semibold"
                                        >
                                            <LogOut size={14} className="me-2" /> Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((prev) => !prev)}
                                className="inline-flex items-center justify-center rounded-lg p-2 text-slate-500 transition duration-150 ease-in-out hover:bg-slate-800 hover:text-cyan-400 focus:outline-none"
                            >
                                {showingNavigationDropdown ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation Dropdown */}
                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden bg-slate-900 border-b border-slate-800'}>
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                            className="text-slate-400"
                        >
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-slate-800 pb-1 pt-4">
                        <div className="px-4 flex items-center">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center me-3">
                                <User size={20} className="text-white" />
                            </div>
                            <div>
                                <div className="text-base font-black text-white">{user.name}</div>
                                <div className="text-sm font-medium text-slate-500">{user.email}</div>
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')} className="text-slate-400">Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button" className="text-red-400">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {/* --- HEADER SECTION --- */}
            {header && (
                <header className="bg-slate-900/30 border-b border-slate-800/50">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <div className="flex items-center">
                            <div className="h-8 w-1 bg-cyan-500 rounded-full me-4"></div>
                            <h2 className="text-xl font-black tracking-tight text-white uppercase italic">
                                {header}
                            </h2>
                        </div>
                    </div>
                </header>
            )}

            {/* --- MAIN CONTENT --- */}
            <main className="relative">
                {/* Background Decorative Blur */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none"></div>
                
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 relative z-10">
                    {children}
                </div>
            </main>

            {/* --- FOOTER ATTR --- */}
            <footer className="py-8 text-center border-t border-slate-800/50 mt-auto">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-600">
                    TechNest Dashboard • FMNHS Grade 10 ICT
                </p>
            </footer>
        </div>
    );
}