// components/Dropdown.jsx
import { Transition } from '@headlessui/react';
import { Link } from '@inertiajs/react';
import { createContext, useContext, useState } from 'react';

const DropDownContext = createContext();

const Dropdown = ({ children }) => {
    const [open, setOpen] = useState(false);
    const toggleOpen = () => setOpen((previousState) => !previousState);

    return (
        <DropDownContext.Provider value={{ open, setOpen, toggleOpen }}>
            <div className="relative">{children}</div>
        </DropDownContext.Provider>
    );
};

const Trigger = ({ children }) => {
    const { open, setOpen, toggleOpen } = useContext(DropDownContext);
    return (
        <>
            <div onClick={toggleOpen} className="cursor-pointer">{children}</div>
            {open && <div className="fixed inset-0 z-40" onClick={() => setOpen(false)}></div>}
        </>
    );
};

const Content = ({
    align = 'right',
    width = '48',
    // BINAGO: Mula puti, ginawa nating Dark Slate para sa TechNest
    contentClasses = 'py-1 bg-slate-900 border border-slate-800 shadow-2xl',
    children,
}) => {
    const { open, setOpen } = useContext(DropDownContext);
    let alignmentClasses = align === 'left' ? 'origin-top-left left-0' : 'origin-top-right right-0';
    let widthClasses = width === '48' ? 'w-48' : '';

    return (
        <Transition
            show={open}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
        >
            <div className={`absolute z-50 mt-2 rounded-xl ${alignmentClasses} ${widthClasses}`} onClick={() => setOpen(false)}>
                <div className={`rounded-xl ring-1 ring-cyan-500/20 ${contentClasses}`}>
                    {children}
                </div>
            </div>
        </Transition>
    );
};

const DropdownLink = ({ className = '', children, ...props }) => {
    return (
        <Link
            {...props}
            className={
                // BINAGO: Hover effect na Cyan at text na Slate-300
                'block w-full px-4 py-2 text-start text-sm leading-5 text-slate-300 transition duration-150 ease-in-out hover:bg-cyan-500/10 hover:text-cyan-400 focus:outline-none ' +
                className
            }
        >
            {children}
        </Link>
    );
};

Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Link = DropdownLink;

export default Dropdown;