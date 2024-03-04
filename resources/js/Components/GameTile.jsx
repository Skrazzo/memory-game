import s from '@/Components/scss/game.module.css';
import { useEffect, useState } from 'react';

export default function GameTile({ right = false, onClick = () => console.log(right), showAnim = false}) {
   
    return (
        <div className={`${s.tile} ${(showAnim && right) ? s.right_anim : ''}`} onClick={onClick}> </div>
    )
}
