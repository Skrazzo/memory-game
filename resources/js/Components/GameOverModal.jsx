import { useEffect } from "react"
import main from '@/Components/scss/components.module.css';


export default function GameOverModal({ resData }) {
    useEffect(() => console.log(resData), [resData]);
    
    return (
        <div className={`${main.form} min-h-96 relative`}>
            
            <div className={`${main.svg} absolute bottom-0 w-full`}>
                <svg width="100%" height="100%" id="svg" viewBox="0 0 1440 490" xmlns="http://www.w3.org/2000/svg" class="transition duration-300 ease-in-out delay-150"><path d="M 0,500 L 0,275 C 92.07142857142858,274.875 184.14285714285717,274.75 302,278 C 419.85714285714283,281.25 563.4999999999999,287.875 698,252 C 832.5000000000001,216.125 957.8571428571429,137.75 1080,97 C 1202.142857142857,56.25000000000001 1321.0714285714284,53.125 1440,50 L 1440,500 L 0,500 Z" stroke="none" stroke-width="0" fill="#abb8c3" fill-opacity="0.53" class="transition-all duration-300 ease-in-out delay-150 path-0"></path><path d="M 0,500 L 0,441 C 147.60714285714283,436.19642857142856 295.21428571428567,431.39285714285717 406,411 C 516.7857142857143,390.60714285714283 590.75,354.625 701,335 C 811.25,315.375 957.7857142857142,312.10714285714283 1087,295 C 1216.2142857142858,277.89285714285717 1328.107142857143,246.94642857142858 1440,216 L 1440,500 L 0,500 Z" stroke="none" stroke-width="0" fill="#abb8c3" fill-opacity="1" class="transition-all duration-300 ease-in-out delay-150 path-1"></path></svg>
            </div>
        </div>
    )
}
