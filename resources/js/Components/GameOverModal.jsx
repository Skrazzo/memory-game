import { useEffect } from "react"
import main from '@/Components/scss/components.module.css';
import game from '@/Components/scss/game.module.css';
import { IconSkull } from "@tabler/icons-react";


export default function GameOverModal({ resData }) {
    useEffect(() => console.log(resData), [resData]);
    
    return (
        <div className={`${main.background} min-h-96 relative p-4`}>
            <div className={`${main.accent} absolute text-2xl italic font-semibold`}># 5</div>
            <IconSkull size={100} strokeWidth={0.75} className={`${main.accent} mx-auto`}/>
            <p className={`${main.accent} text-center text-3xl font-black tracking-wide`}>GAME OVER</p>
            
            <div className="flex justify-center my-4">
                <button className={`${game.game_over_button} relative z-10`} onClick={() => console.log('asd')}>play again</button>
            </div>
            
            <div className="relative z-10 border min-h-32 mx-24 grid grid-cols-2 gap-4">
                <div className="border"></div>
                <div className="border"></div>
            </div>
            
            <div className={`${main.svg} absolute bottom-0 left-0 w-full z-0`}>
                <svg width="100%" height="100%" id="svg" viewBox="0 0 1440 490" xmlns="http://www.w3.org/2000/svg" className="transition duration-300 ease-in-out delay-150"><path d="M 0,500 L 0,275 C 92.07142857142858,274.875 184.14285714285717,274.75 302,278 C 419.85714285714283,281.25 563.4999999999999,287.875 698,252 C 832.5000000000001,216.125 957.8571428571429,137.75 1080,97 C 1202.142857142857,56.25000000000001 1321.0714285714284,53.125 1440,50 L 1440,500 L 0,500 Z" stroke="none" strokeWidth="0" fill="#abb8c3" fillOpacity="0.53" className="transition-all duration-300 ease-in-out delay-150 path-0"></path><path d="M 0,500 L 0,441 C 147.60714285714283,436.19642857142856 295.21428571428567,431.39285714285717 406,411 C 516.7857142857143,390.60714285714283 590.75,354.625 701,335 C 811.25,315.375 957.7857142857142,312.10714285714283 1087,295 C 1216.2142857142858,277.89285714285717 1328.107142857143,246.94642857142858 1440,216 L 1440,500 L 0,500 Z" stroke="none" strokeWidth="0" fill="#abb8c3" fillOpacity="1" className="transition-all duration-300 ease-in-out delay-150 path-1"></path></svg>
            </div>
        </div>
    )
}
