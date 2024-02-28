import { Link } from '@inertiajs/react';
import s from '@/Components/scss/components.module.css';

export default function ResponsiveNavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={`w-full flex items-start ps-3 pe-4 py-2 border-l-4 ${
                active
                    ? `${s.nav_border_active_mobile}`
                    : `${s.nav_border_mobile}`
            } text-base font-medium focus:outline-none transition duration-150 ease-in-out ${className}`}
        >
            {children}
        </Link>
    );
}
