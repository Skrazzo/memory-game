import s from '@/Components/scss/leaderboard.module.css';
import main from '@/Components/scss/components.module.css';
import { IconNumber, IconTargetArrow, IconTrophy, IconTrophyFilled } from '@tabler/icons-react';
import { useState } from 'react';

export default function LeaderboardContainer({ appearAfterMS = 100, n, name, score, you = false}) {
    const [show, setShow] = useState(false);

    setTimeout(() => setShow(true), appearAfterMS);
    
    return (
        <>
        {show && 
            <div className={`${s.leaderboard_container} ${(you) ? s.leaderboard_you : ''}`}>
                <span className={`${main.secondary_text} flex items-center gap-1`}>
                    {(n === 1) 
                        ? <IconTrophy className={s.trophy} size={26}/> 
                        : <><IconNumber size={14}/><span className='text-md'>{n}</span></>
                    }
                </span>
                <span className={`${main.primary_text} grow mx-2`}>{name}</span>
                <strong className={`${main.primary_text} flex items-center gap-1`}><IconTargetArrow strokeWidth={1} size={24}/> {score}</strong>
            </div>
        }
        </>
    )
}
