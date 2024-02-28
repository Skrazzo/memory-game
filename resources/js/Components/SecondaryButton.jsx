import s from '@/Components/scss/components.module.css';

export default function SecondaryButton({ type = 'button', className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            type={type}
            className={
                `${s.secondary_button} inline-flex items-center px-4 py-2 rounded-md font-semibold text-xs uppercase tracking-widest shadow-sm disabled:opacity-25  ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
