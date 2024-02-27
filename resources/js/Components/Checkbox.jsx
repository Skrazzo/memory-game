import s from '@/Components/scss/components.module.css';

export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                `rounded shadow-sm  ${s.checkbox}` +
                className
            }
        />
    );
}
