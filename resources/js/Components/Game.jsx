import { IconLayoutDistributeVertical } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import s from '@/Components/scss/game.module.css';
import GameTile from "./GameTile";



export default function Game() {
    const [level, setLevel] = useState(1);
    const [rightTiles, setRightTiles] = useState([]);
    const [cfg, setCFG] = useState({ // default cfg for first level
        layout: 3,
        right_tiles: 3
    });

    function calculate_cfg(){
        if(level < 1){
            setLevel(1);
            return ;
        }

        setCFG({
            layout: 3 + Math.floor(level / 2),
            right_tiles: 2 + level
        });
        
    }
    useEffect(calculate_cfg, [level]);
    useEffect(() => console.log('cfg', cfg), [cfg]);
    
    // (1 * i) + (1 * j) + 1
    /*
      # [] []
     [] [] []
     [] [] []
    (1 * 0) + (1 * 0) + 1

     []  # []
     [] [] []
     [] [] []
     (1 * 0) + (1 * 1)  + 1

     [] [] []
      # [] []
     [] [] []
     (1 * 1) + (1 * 0) + 1
    */
    return (
        <div>
            <button onClick={() => setLevel(level - 1)} className="m-1 bg-blue-500 p-2 rounded">lower</button>
            <button onClick={() => setLevel(level + 1)} className="m-1 bg-blue-500 p-2 rounded">up</button>
            <div className={`${s.container} gap-${(cfg.layout >= 5) ? '1' : '3'}`}>
                {Array.from({ length: cfg.layout }, (x, i) => {
                    return (
                        <div key={i} className={`${s.row} gap-${(cfg.layout >= 5) ? '1' : '3'}`}>
                            {Array.from({ length: cfg.layout }, (q, j) => { 
                                return <GameTile key={`${i}-${j}`}/>;
                            })}
                        </div>
                    );
                })}
            </div>

        </div>
    )
}
