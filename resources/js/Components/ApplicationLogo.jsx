import s from '@/Components/scss/components.module.css';

export default function ApplicationLogo(props) {
    return (
        <svg  xmlns="http://www.w3.org/2000/svg" className={`${s.accent} icon icon-tabler icon-tabler-stack-2`} width="50" height="50" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 4l-8 4l8 4l8 -4l-8 -4" /><path d="M4 12l8 4l8 -4" /><path d="M4 16l8 4l8 -4" /></svg>
    );
}
