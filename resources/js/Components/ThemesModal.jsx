import main from '@/Components/scss/components.module.css';
import { IconX } from '@tabler/icons-react';
import ThemeContainer from './ThemeContainer';
import { useEffect, useState } from 'react';
import { v4 } from 'uuid';

export default function ThemesModal({ close, dashboard }) {
    const [currentTheme, setCurrrentTheme] = useState('dark-purple');
    const themes = [
        'light-blue',
        'dark-purple',
        'dark-green',
        'dark-blue',
    ]

    function setTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        setCurrrentTheme(getTheme());
    }

    function getTheme() {
        return document.body.getAttribute('data-theme');
    }


    useEffect(() => {
        setCurrrentTheme(getTheme());
    }, []);

    return (
        <section className={`${main.form} p-4`}>
            <div className='flex items-center justify-between'>
                <p className={`${main.primary_text}`}>Themes</p>
                <IconX onClick={close} className={`${main.secondary_text} cursor-pointer hover:opacity-50`}/>
            </div>

            <div className='flex gap-2 sm:gap-6 flex-wrap mt-4'>
                {themes.map((x) => {
                    return <ThemeContainer setTheme={() => setTheme(x)} key={v4()} theme={x} current={(currentTheme === x) ? true : false}/>;
                })}
                
            </div>
        </section>
    )
}
