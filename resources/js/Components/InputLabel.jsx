import s from '@/Components/scss/components.module.css';

export default function InputLabel({ value, className = '', children, ...props }) {
    return (
        <label {...props} className={`block font-medium text-sm ${s.primary_text} ` + className}>
            {value ? value : children}
        </label>
    );
}
