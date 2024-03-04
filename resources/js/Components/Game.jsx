import { IconHeart, IconHeartFilled, IconLayoutDistributeVertical } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import s from '@/Components/scss/game.module.css';
import main from '@/Components/scss/components.module.css';
import GameTile from "./GameTile";



export default function Game() {
    const [level, setLevel] = useState(0);
    const [mounted, setMounted] = useState(false);
    const [showAnim, setShowAnim] = useState(false);
    const [points, setPoints] = useState(0);
    const [lives, setLives] = useState(2);

    // function to generate random right tile positions
    function generate_rand_tiles(x, count) {
        const numbers = [];
        while (numbers.length < count) {
            const randNum = Math.floor(Math.random() * x) + 1;
            if (!numbers.includes(randNum)) {
                numbers.push(randNum);
            }
        }
        return numbers;
    }

    const [cfg, setCFG] = useState({ // default cfg for first level
        layout: 3,
        right_tiles: 3,
        right_tiles_places: generate_rand_tiles(9, 3)
    });

    function return_tile_place(x, y, layout = 3){
        return ((layout * y) + (1 * x)) + 1;
    }

    function generate_tiles(){
        setRightTiles(generate_rand_tiles((cfg.layout * cfg.layout), cfg.right_tiles));
    }

    function calculate_cfg(){
        if(!mounted) {
            level_up();
            setMounted(true);
            return ;
        }

        if(level < 1){
            setLevel(1);
            return ;
        }

        const newCFG = {
            layout: 3 + Math.floor(level / 3),
            right_tiles: 2 + level,
        };

        setCFG({
            ...newCFG,
            right_tiles_places: generate_rand_tiles((newCFG.layout * newCFG.layout), newCFG.right_tiles),
        });

        setTimeout(() => {
            setShowAnim(true);
            setTimeout(() => setShowAnim(false), 1500);
        }, 500);
        
    }

    function level_up(){
        setLevel(level + 1);
    }

    useEffect(calculate_cfg, [level]);
    useEffect(() => console.log('cfg', cfg), [cfg]);
    

    return (
        <div>
            <div className="text-center py-4">
                <p className="text-xl">Level <strong className={`${main.accent}`}>{level}</strong> - <strong className={`${main.accent}`}>{points}</strong> points</p>
                <div className={`${main.accent} flex gap-2 text-center justify-center`}>
                    {Array.from({ length: 3 }, (x, i) => {
                        if(i >= lives){
                            return <IconHeartFilled className="opacity-40" size={44}/>;
                        }
                        return <IconHeartFilled size={44}/>;
                    })}
                </div>

            </div>
            
            <div className={`${s.container} gap-${(cfg.layout >= 5) ? '1' : '3'}`}>
                {Array.from({ length: cfg.layout }, (x, i) => {
                    return (
                        <div key={i} className={`${s.row} gap-${(cfg.layout >= 5) ? '1' : '3'}`}>
                            {Array.from({ length: cfg.layout }, (q, j) => {
                                // Calculation for a game tile
                                const tile_place = return_tile_place(j, i, cfg.layout);

                                return <GameTile showAnim={showAnim} right={(cfg.right_tiles_places.includes(tile_place)) ? true : false} key={`${i}-${j}`}/>;
                            })}
                        </div>
                    );
                })}
            </div>

        </div>
    )
}
