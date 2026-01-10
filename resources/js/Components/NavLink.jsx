// components/NavLink.jsx
import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-bold leading-5 transition duration-300 ease-in-out focus:outline-none tracking-wide ' +
                (active
                    ? 'border-cyan-400 text-cyan-400 focus:border-cyan-300'
                    : 'border-transparent text-slate-400 hover:text-cyan-300 hover:border-cyan-500/50 focus:text-slate-200 focus:border-slate-700') +
                ' ' + className
            }
        >
            {children}
        </Link>
    );
}