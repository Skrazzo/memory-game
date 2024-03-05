import s from '@/Components/scss/game.module.css';
import { useEffect, useState } from 'react';

export default function GameTile({ clicked, place ,right = false, onClick = () => console.log(right), showAnim = false}) {
   
    return (
        <div 
            className={`
                ${s.tile} 
                ${(showAnim && right) ? s.right_anim : ''} 
                ${(clicked) ? (right) ? s.right_clicked : s.wrong_clicked : ''}
            `} 
            onClick={() => onClick({place: place, right: right})}
        ></div>
    )
}
