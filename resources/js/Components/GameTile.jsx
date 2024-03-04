import s from '@/Components/scss/game.module.css';

export default function GameTile({ right = false, onClick = () => console.log(right), place }) {
    return (
        <div className={`${s.tile}`} onClick={onClick}>{place}</div>
    )
}
