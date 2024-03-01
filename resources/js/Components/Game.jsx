import { IconLayoutDistributeVertical } from "@tabler/icons-react";
import { useState } from "react";
import s from '@/Components/scss/game.module.css';
import GameTile from "./GameTile";


export default function Game() {
    const [level, setLevel] = useState(1);
    const [layout, setLayout] = useState({x: 10, y: 10});

    
    return (
        <div className={`${s.container}`}>
            
            {Array.from({ length: layout.y }, () => {
                return (
                    <div className={`${s.row}`}>
                        {Array.from({ length: layout.x }, () => {
                            return <GameTile />;
                        })}
                    </div>
                );
            })}
        </div>
    )
}
