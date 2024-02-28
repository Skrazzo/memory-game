import { Link } from '@inertiajs/react';
import s from '@/Components/scss/components.module.css';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? `${s.nav_border_active} ${s.primary_text}  `
                    : `${s.nav_border} `) +
                className
            }
        >
            {children}
        </Link>
    );
}
