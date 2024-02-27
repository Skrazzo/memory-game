import { forwardRef, useEffect, useRef } from 'react';
import s from '@/Components/scss/components.module.css';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                `${s.text_input} rounded-md shadow-sm ` +
                className
            }
            ref={input}
        />
    );
});
