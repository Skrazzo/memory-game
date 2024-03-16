import main from '@/Components/scss/components.module.css';
import { IconCheck } from '@tabler/icons-react';

export default function ThemeContainer({ theme, setTheme, current = false }) {
    function convertName(str) {
        return str.replace(/\b\w/g, function(char) {
            return char.toUpperCase();
        }).replace(/-/g, ' ');
    }
    
    return (
        <div onClick={setTheme} name={theme} className={`grow flex justify-between items-center ${main.form_light} shadow-lg rounded overflow-hidden`}>
            <div className='grid grid-cols-3 '>
                <div className="flex w-min col-span-1 ">
                    <div className="aspect-square preview-accent"></div>
                    <div className="aspect-square preview-background"></div>
                </div>
                
                
                <span className='col-span-2 pl-6 py-1 select-none'>{convertName(theme)}</span>
            </div>
            {current && <IconCheck className="text-green-600 mx-2" size={16}/>}
        </div>
    )
}
