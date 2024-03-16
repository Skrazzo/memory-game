import s from '@/Components/scss/components.module.css';
import main from '@/Components/scss/dashboard.module.css';
import useMediaQuery from '@custom-react-hooks/use-media-query';
import { IconCircleChevronsUp, IconTargetArrow } from '@tabler/icons-react';
import { useState } from 'react';

export default function DashboardHistoryContainer({ points, level, time_diff, created_at, appearAfterMS = 100 }) {
    const [show, setShow] = useState(false);
    const sm = useMediaQuery('(max-width: 640px)');
    
    const history_icon_props = {
        size: (sm) ? 30 : 35,
        strokeWidth: 1
    };

    setTimeout(() => {
        setShow(true);
    }, appearAfterMS);
    
    return (
        <>
        {show && 
            <article className={main.history_container}>
                <div className={s.primary_text}>
                    <div>
                        <IconTargetArrow {...history_icon_props}/>
                        <strong className='sm:text-lg'>{points}</strong>
                    </div>

                    <div>
                        <IconCircleChevronsUp {...history_icon_props}/>
                        <strong className='sm:text-lg'>{level}</strong>
                    </div>
                </div>

                <span className={`${s.secondary_text} italic text-center`}>{created_at}</span>

                <div className={main.history_hover}>
                    <strong className={s.primary_text}>{time_diff}</strong>
                </div>
            </article>
        }
        </>
    );
}
