import { IconLayoutDistributeVertical } from "@tabler/icons-react";
import { useState } from "react";
import s from '@/Components/scss/game.module.css';
import GameTile from "./GameTile";



export default function Game() {
    const [level, setLevel] = useState(1);
    const [layout, setLayout] = useState(10);
    
    
    return (
        <div>
            <button onClick={() => setLayout(layout - 1)} className="m-1 bg-blue-500 p-2 rounded">lower</button>
            <button onClick={() => setLayout(layout + 1)} className="m-1 bg-blue-500 p-2 rounded">up</button>
            <div className={`${s.container} gap-${(layout >= 5) ? '1' : '2'}`}>
                {Array.from({ length: layout }, (x, i) => {
                    return (
                        <div key={i} className={`${s.row} gap-${(layout >= 5) ? '1' : '2'}`}>
                            {Array.from({ length: layout }, (q, j) => {
                                
                                return <GameTile key={`${i}-${j}`}/>;
                            })}
                        </div>
                    );
                })}
            </div>

        </div>
    )
}
