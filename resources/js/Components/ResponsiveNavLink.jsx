// resources/js/Components/ResponsiveNavLink.jsx
import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex w-full items-start border-l-4 py-3 pe-4 ps-3 text-base font-bold transition duration-300 ease-in-out focus:outline-none ${
                active
                    ? 'border-cyan-400 bg-cyan-500/10 text-cyan-400' // Cyan glow kapag active
                    : 'border-transparent text-slate-400 hover:bg-white/5 hover:text-cyan-300 hover:border-slate-700'
            } ${className}`}
        >
            {children}
        </Link>
    );
}