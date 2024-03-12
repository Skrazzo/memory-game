import s from '@/Components/scss/components.module.css';
import { IconGraph } from '@tabler/icons-react';


export default function NoChart() {
    return (
        <div className={`${s.form_opacity} p-4 rounded`}>
            <h1 className={`${s.accent} text-3xl font-black flex items-center gap-2`}><IconGraph size={44} strokeWidth={1}/> Average score history</h1>
            <p className={`${s.primary_text} my-2 pl-14 text-lg`}>You need to play at least 4 games for history graph to appear</p>
        </div>
    )
}
