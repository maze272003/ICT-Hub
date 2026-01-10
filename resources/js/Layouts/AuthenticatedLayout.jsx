import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { 
    Cpu, User, LogOut, LayoutDashboard, 
    Menu, X, ChevronDown, Bell, Users,
    Layers, Search 
} from 'lucide-react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    // Bagong state para sa mobile dashboard sub-menu
    const [showingMobileSubmenu, setShowingMobileSubmenu] = useState(false);

    return (
        <div className="flex flex-col min-h-screen bg-[#020617] text-slate-300 selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-x-hidden font-sans">
            
            {/* --- AMBIENT LAYER --- */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse opacity-50"></div>
                <div className="absolute bottom-[-5%] right-[-5%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] opacity-50"></div>
                <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
            </div>

            {/* --- NAVIGATION BAR --- */}
            <nav className="sticky top-0 z-50 bg-slate-950/40 backdrop-blur-xl border-b border-white/[0.05] shadow-2xl">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between items-center">
                        <div className="flex items-center">
                            {/* Logo Section */}
                            <div className="flex shrink-0 items-center">
                                <Link href="/" className="flex items-center space-x-3 group">
                                    <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-all">
                                        <Cpu className="text-white w-5 h-5" />
                                    </div>
                                    <span className="text-xl font-black tracking-tighter text-white">
                                        Tech<span className="text-cyan-400">Nest</span>
                                    </span>
                                </Link>
                            </div>

                            {/* Desktop Navigation Links */}
                            <div className="hidden space-x-1 sm:-my-px sm:ms-10 sm:flex">
                                {route().current('dashboard.*') && !route().current('dashboard') ? (
                                    <div className="inline-flex items-center">
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <button className="inline-flex items-center px-1 pt-1 border-b-2 border-cyan-400 text-sm font-black leading-5 text-cyan-400 focus:outline-none transition duration-150 ease-in-out h-16 uppercase italic tracking-wider">
                                                    <LayoutDashboard size={14} className="me-2" />
                                                    {route().current('dashboard.modules') ? 'Modules' : 'Research'}
                                                    <ChevronDown size={12} className="ms-2 opacity-60" />
                                                </button>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content contentClasses="py-2 bg-slate-900/95 backdrop-blur-3xl border border-white/[0.1] shadow-2xl rounded-2xl">
                                                <Dropdown.Link href={route('dashboard')} className="flex items-center px-4 py-2.5 hover:bg-cyan-500/10 hover:text-cyan-400">
                                                    <LayoutDashboard size={14} className="me-2" /> Main Dashboard
                                                </Dropdown.Link>
                                                <div className="h-px bg-white/[0.05] my-1 mx-2"></div>
                                                {route().current('dashboard.modules') ? (
                                                    <Dropdown.Link href={route('dashboard.research')} className="flex items-center px-4 py-2.5 hover:bg-blue-500/10 hover:text-blue-400">
                                                        <Search size={14} className="me-2" /> Practical Research
                                                    </Dropdown.Link>
                                                ) : (
                                                    <Dropdown.Link href={route('dashboard.modules')} className="flex items-center px-4 py-2.5 hover:bg-cyan-500/10 hover:text-cyan-400">
                                                        <Layers size={14} className="me-2" /> My Modules
                                                    </Dropdown.Link>
                                                )}
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </div>
                                ) : (
                                    <NavLink href={route('dashboard')} active={route().current('dashboard')} className="px-4">
                                        <LayoutDashboard size={14} className="me-2" />
                                        Dashboard
                                    </NavLink>
                                )}

                                {user.role === 'teacher' && (
                                    <NavLink href={route('students.index')} active={route().current('students.*')} className="px-4">
                                        <Users size={14} className="me-2" />
                                        Students
                                    </NavLink>
                                )}
                            </div>
                        </div>

                        {/* Mobile Toggle Button */}
                        <div className="flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                                className="p-2 bg-white/5 rounded-xl border border-white/10 text-slate-400 hover:text-cyan-400 transition-all shadow-lg"
                            >
                                {showingNavigationDropdown ? <X size={20} /> : <Menu size={20} />}
                            </button>
                        </div>

                        {/* Right Section Icons (Desktop) */}
                        <div className="hidden sm:flex sm:items-center sm:ms-6 space-x-4">
                            <button className="p-2 text-slate-500 hover:text-cyan-400 transition-colors">
                                <Bell size={18} />
                            </button>
                            <div className="relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button className="group flex items-center px-3 py-1.5 bg-white/[0.03] border border-white/[0.08] rounded-xl backdrop-blur-md text-sm font-bold text-slate-200 hover:bg-white/[0.08] hover:border-cyan-500/50 transition-all duration-300 shadow-sm">
                                            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center me-2">
                                                <User size={14} className="text-cyan-400" />
                                            </div>
                                            <span className="hidden lg:inline">{user.name}</span>
                                            <ChevronDown size={14} className="ms-2 opacity-40 group-hover:opacity-100 transition-opacity" />
                                        </button>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content contentClasses="py-2 bg-slate-900/95 backdrop-blur-3xl border border-white/[0.1] shadow-2xl rounded-2xl">
                                        <Dropdown.Link href={route('profile.edit')} className="flex items-center px-4 py-2.5 hover:bg-cyan-500/10 hover:text-cyan-400">
                                            <User size={14} className="me-2" /> Profile Settings
                                        </Dropdown.Link>
                                        <div className="h-px bg-white/[0.05] my-1 mx-2"></div>
                                        <Dropdown.Link href={route('logout')} method="post" as="button" className="flex items-center px-4 py-2.5 text-red-400 hover:bg-red-500/10 transition-all w-full text-left font-semibold">
                                            <LogOut size={14} className="me-2" /> Sign Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- MOBILE NAVIGATION MENU --- */}
                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden bg-slate-950/90 backdrop-blur-2xl border-b border-white/[0.05] shadow-2xl'}>
                    <div className="pt-2 pb-3 space-y-1">
                        {/* SMART MOBILE TOGGLE LOGIC */}
                        {route().current('dashboard.*') && !route().current('dashboard') ? (
                            <div className="space-y-1">
                                <button
                                    onClick={() => setShowingMobileSubmenu(!showingMobileSubmenu)}
                                    className="flex w-full items-center justify-between ps-3 pe-4 py-2 border-l-4 border-cyan-400 text-base font-black text-cyan-400 bg-cyan-500/5 italic transition-all"
                                >
                                    <div className="flex items-center">
                                        <LayoutDashboard size={16} className="me-3" />
                                        {route().current('dashboard.modules') ? 'Modules' : 'Research'}
                                    </div>
                                    <ChevronDown size={16} className={`transition-transform duration-300 ${showingMobileSubmenu ? 'rotate-180' : ''}`} />
                                </button>
                                
                                {showingMobileSubmenu && (
                                    <div className="bg-slate-900/50 animate-in slide-in-from-top-2 duration-300">
                                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                                            <LayoutDashboard size={16} className="me-3" /> Main Dashboard
                                        </ResponsiveNavLink>
                                        <ResponsiveNavLink href={route('dashboard.modules')} active={route().current('dashboard.modules')}>
                                            <Layers size={16} className="me-3" /> Modules
                                        </ResponsiveNavLink>
                                        <ResponsiveNavLink href={route('dashboard.research')} active={route().current('dashboard.research')}>
                                            <Search size={16} className="me-3" /> Research
                                        </ResponsiveNavLink>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                                <LayoutDashboard size={16} className="me-3" /> Dashboard
                            </ResponsiveNavLink>
                        )}
                        
                        {user.role === 'teacher' && (
                            <ResponsiveNavLink href={route('students.index')} active={route().current('students.*')}>
                                <Users size={16} className="me-3" /> Students
                            </ResponsiveNavLink>
                        )}
                    </div>

                    {/* Profile & Logout Section (Mobile) */}
                    <div className="border-t border-white/[0.05] pb-2 pt-4">
                        <div className="px-4 flex items-center mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center me-3">
                                <User size={20} className="text-white" />
                            </div>
                            <div>
                                <div className="text-sm font-black text-white">{user.name}</div>
                                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{user.email}</div>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>
                                <User size={16} className="me-3" /> Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button" className="text-red-400 font-bold">
                                <LogOut size={16} className="me-3" /> Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {/* --- HEADER SECTION --- */}
            {header && (
                <header className="relative z-10 pt-10 pb-6">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center group">
                            <div className="h-10 w-1.5 bg-gradient-to-b from-cyan-400 to-blue-600 rounded-full me-6 shadow-[0_0_20px_rgba(6,182,212,0.6)]"></div>
                            <div>
                                <h2 className="text-2xl font-black tracking-wider text-white uppercase italic">
                                    {header}
                                </h2>
                                <div className="flex items-center mt-1 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
                                    <span>FMNHS</span>
                                    <span className="mx-2 opacity-30">•</span>
                                    <span>ICT Portal</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            )}

            {/* --- MAIN CONTENT AREA --- */}
            <main className="relative z-10 flex-grow italic">
                <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>

            {/* --- FOOTER --- */}
            <footer className="relative z-10 py-10 mt-auto border-t border-white/[0.02] bg-slate-950/20 text-center">
                <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-slate-600">
                    TechNest Dashboard Framework • {new Date().getFullYear()}
                </p>
            </footer>
        </div>
    );
}