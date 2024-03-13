import s from '@/Components/scss/leaderboard.module.css';
import main from '@/Components/scss/components.module.css';
import { IconNumber, IconTargetArrow } from '@tabler/icons-react';

export default function LeaderboardContainer({ n, name, score }) {
    return (
        <div className={s.leaderboard_container}>
            <span className={`${main.secondary_text} flex items-center gap-1`}><IconNumber />{n}</span>
            <span className={`${main.primary_text} grow mx-2`}>{name}</span>
            <strong className={`${main.primary_text} flex items-center gap-1`}><IconTargetArrow strokeWidth={1} size={24}/> {score}</strong>
        </div>
    )
}
