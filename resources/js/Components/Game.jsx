import { IconHeartFilled } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import s from '@/Components/scss/game.module.css';
import main from '@/Components/scss/components.module.css';
import GameTile from "./GameTile";
import { v4 } from "uuid";
import Modal from "./Modal";
import axios from "axios";



export default function Game() {
    const [level, setLevel] = useState(0);
    const [mounted, setMounted] = useState(false);
    const [showAnim, setShowAnim] = useState(false);
    const [points, setPoints] = useState(0);
    const [gameOverModal, setGameOverModal] = useState({ resData: {}, show: false });

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
        right_tiles_places: generate_rand_tiles(9, 3),
        right_clicked: [],
        wrong_clicked: [],
        lives: 3,
    });

    function return_tile_place(x, y, layout = 3){
        return ((layout * y) + (1 * x)) + 1;
    }

    useEffect(calculate_cfg, [level]);
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
            ...cfg,
            ...newCFG,
            right_clicked: [],
            wrong_clicked: [],
            lives: 3,
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

    function has_user_won(){
        if(cfg.right_clicked.length >= cfg.right_tiles) return true;
        return false;
    }

    function has_user_lost(){
        if(cfg.lives <= 0) return true;
        return false;
    }

    function reset_game(){
        setLevel(0);
        setPoints(0);
    }

    function tileClickHandler(obj){
        if(cfg.right_clicked.includes(obj.place)) return;
        if(cfg.wrong_clicked.includes(obj.place)) return;
        
        if(obj.right) { // clicked tile is right
            setCFG({
                ...cfg,
                right_clicked: [...cfg.right_clicked, obj.place]
            });

            setPoints(points + (2 * level));
        }else{ // wrong tile is clicked
            setCFG({
                ...cfg,
                wrong_clicked: [...cfg.wrong_clicked, obj.place],
                lives: cfg.lives - 1
            });

            setPoints(points - (1 * level));
        }
    }


    useEffect(() => {
        if(has_user_won()){
            level_up();
        }

        if(has_user_lost()){
            reset_game();

            axios.post(route('gameover'), {
                level: level,
                points: points
            }).then((res) => {
                if(res.data.success){ // successfully saved data to the database
                    let data = res.data.response;
                    console.log(data);
                }
                
            }).catch((err) => {
                console.error(err);
            });
        }

        //console.log('cfg', cfg);
    }, [cfg]);
    

    return (
        <div>
            

            <div className="text-center py-4">
                <p className="text-xl">Level <strong className={`${main.accent}`}>{level}</strong> - <strong className={`${main.accent}`}>{points}</strong> points</p>
                <div className={`${main.accent} flex gap-2 text-center justify-center`}>
                    {Array.from({ length: 3 }, (x, i) => {
                        if(i >= cfg.lives){
                            return <IconHeartFilled key={v4()} className="opacity-40" size={44}/>;
                        }
                        return <IconHeartFilled key={v4()} size={44}/>;
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
                                
                                return <GameTile 
                                    clicked={(cfg.right_clicked.includes(tile_place) || cfg.wrong_clicked.includes(tile_place))}
                                    onClick={tileClickHandler} 
                                    place={tile_place} 
                                    showAnim={showAnim} 
                                    right={(cfg.right_tiles_places.includes(tile_place)) ? true : false} 
                                    key={`${i}-${j}`}
                                />;
                            })}
                        </div>
                    );
                })}
            </div>

        </div>
    )
}
