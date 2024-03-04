import { IconLayoutDistributeVertical } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import s from '@/Components/scss/game.module.css';
import GameTile from "./GameTile";



export default function Game() {
    const [level, setLevel] = useState(2);
    const [rightTiles, setRightTiles] = useState([]);
    const [cfg, setCFG] = useState({ // default cfg for first level
        layout: 3,
        right_tiles: 3
    });

    function generate_rand_tiles(x, y, count) {
        const arr = [];
        while (arr.length < count) {
            const rand_num = Math.floor(Math.random() * (y - x + 1)) + x;
            if (!arr.includes(rand_num)) {
                arr.push(rand_num);
            }
        }
        return arr;
    }

    function return_tile_place(x, y, layout = 3){
        //console.log( `X: ${x} and Y: ${y}`);
        return ((layout * y) + (1 * x)) + 1;
    }

    function generate_tiles(){
        setRightTiles(generate_rand_tiles(1, (cfg.layout * cfg.layout), cfg.right_tiles));
    }

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
    useEffect(() => console.log('rightTiles', rightTiles), [rightTiles]);
    
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
            <button onClick={() => generate_tiles()} className="m-1 bg-blue-500 p-2 rounded text-white">Gen</button>
            
            <div className={`${s.container} gap-${(cfg.layout >= 5) ? '1' : '3'}`}>
                {Array.from({ length: cfg.layout }, (x, i) => {
                    return (
                        <div key={i} className={`${s.row} gap-${(cfg.layout >= 5) ? '1' : '3'}`}>
                            {Array.from({ length: cfg.layout }, (q, j) => { 
                                return <GameTile place={return_tile_place(j, i, cfg.layout)} key={`${i}-${j}`}/>;
                            })}
                        </div>
                    );
                })}
            </div>

        </div>
    )
}
