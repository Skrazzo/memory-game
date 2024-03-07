import { useEffect } from "react"
import main from '@/Components/scss/components.module.css';
import game from '@/Components/scss/game.module.css';
import { IconCircleChevronsUp, IconDeviceGamepad, IconSkull, IconTrophy } from "@tabler/icons-react";


export default function GameOverModal({ resData }) {
    useEffect(() => console.log(resData), [resData]);
    
    return (
        <div className={`${main.background} min-h-96 relative p-4`}>
            <div className={`${main.accent} absolute text-2xl italic font-semibold`}># 5</div>
            <IconSkull size={100} strokeWidth={0.75} className={`${main.accent} mx-auto`}/>
            <p className={`${main.accent} text-center text-3xl font-black tracking-wide`}>GAME OVER</p>
            
            <div className="flex justify-center mt-4 mb-6">
                <button className={`${game.game_over_button} relative z-10`} onClick={() => console.log('asd')}>play again</button>
            </div>
            
            <div className="relative z-10 mx-24 grid grid-cols-2 gap-6">
                <div className={`${game.game_score_container}`}>
                    <div className="flex flex-col gap-2 justify-center p-3">
                        <div className="flex items-center gap-1 text-lg"><IconTrophy size={34} strokeWidth={1.5} className={`${main.accent}`} /> <span className={`${main.secondary_text}`}>{resData.current_game.points}</span></div>
                        <div className="flex items-center gap-1 text-lg"><IconCircleChevronsUp size={34} strokeWidth={1.5} className={`${main.accent}`} /> <span className={`${main.secondary_text}`}>{resData.current_game.level}</span></div>
                    </div>

                    <div className="relative grow flex items-center justify-end mx-2">
                        <IconDeviceGamepad size={54} className={`${main.background_color} z-10 relative`}/>
                        
                        <svg style={{
                            transform: 'translate(-5px, -25px) rotate(-90deg)', scale: '4'
                        }} id="svg" viewBox="0 0 1440 690" xmlns="http://www.w3.org/2000/svg" className="absolute transition duration-300 ease-in-out delay-150"><defs><linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%"><stop offset="5%" stopColor="#F78DA7"></stop><stop offset="95%" stopColor="#8ED1FC"></stop></linearGradient></defs><path d="M 0,700 L 0,0 C 38.370144717727314,57.98156379575427 76.74028943545463,115.96312759150854 110,183 C 143.25971056454537,250.03687240849146 171.40898697590873,326.1290534297201 206,336 C 240.59101302409127,345.8709465702799 281.6237626609104,289.52065868961114 319,285 C 356.3762373390896,280.47934131038886 390.09596238044946,327.78831181183523 419,290 C 447.90403761955054,252.21168818816477 471.99238781729173,129.326094063048 508,135 C 544.0076121827083,140.673905936952 591.9344863503833,274.9073119359728 633,301 C 674.0655136496167,327.0926880640272 708.2696667811749,245.0446581930608 733,259 C 757.7303332188251,272.9553418069392 772.9868465249172,382.91405529178394 807,386 C 841.0131534750828,389.08594470821606 893.7829471191561,285.2991206398033 931,249 C 968.2170528808439,212.70087936019675 989.8813649984581,243.889462149003 1018,254 C 1046.1186350015419,264.110537850997 1080.6915928870112,253.14303076418477 1117,219 C 1153.3084071129888,184.85696923581523 1191.352263453497,127.53841479425793 1230,178 C 1268.647736546503,228.46158520574207 1307.899353299001,386.7033100587835 1343,375 C 1378.100646700999,363.2966899412165 1409.0503233504996,181.64834497060826 1440,0 L 1440,700 L 0,700 Z" stroke="none" strokeWidth="0" fill="var(--accent)" fillOpacity="1" className="transition-all duration-300 ease-in-out delay-150 path-0"></path></svg>
                    </div>
                </div>

                <div className={`${game.game_score_container}`}>
                    <div className="flex flex-col gap-2 justify-center p-3">
                        <div className="flex items-center gap-1 text-lg"><IconTrophy size={34} strokeWidth={1.5} className={`${main.accent}`} /> <span className={`${main.secondary_text}`}>{resData.best.points}</span></div>
                        <div className="flex items-center gap-1 text-lg"><IconCircleChevronsUp size={34} strokeWidth={1.5} className={`${main.accent}`} /> <span className={`${main.secondary_text}`}>{resData.best.level}</span></div>
                    </div>

                    <div className="relative grow flex items-center justify-end mx-2">
                        <IconTrophy size={54} className={`${main.background_color} z-10 relative`}/>
                        
                        <svg style={{
                            transform: 'translate(0px, 25px) rotate(-90deg)', scale: '4'
                        }} id="svg" viewBox="0 0 1440 690" xmlns="http://www.w3.org/2000/svg" className="absolute transition duration-300 ease-in-out delay-150"><defs><linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%"><stop offset="5%" stopColor="#F78DA7"></stop><stop offset="95%" stopColor="#8ED1FC"></stop></linearGradient></defs><path d="M 0,700 L 0,0 C 38.370144717727314,57.98156379575427 76.74028943545463,115.96312759150854 110,183 C 143.25971056454537,250.03687240849146 171.40898697590873,326.1290534297201 206,336 C 240.59101302409127,345.8709465702799 281.6237626609104,289.52065868961114 319,285 C 356.3762373390896,280.47934131038886 390.09596238044946,327.78831181183523 419,290 C 447.90403761955054,252.21168818816477 471.99238781729173,129.326094063048 508,135 C 544.0076121827083,140.673905936952 591.9344863503833,274.9073119359728 633,301 C 674.0655136496167,327.0926880640272 708.2696667811749,245.0446581930608 733,259 C 757.7303332188251,272.9553418069392 772.9868465249172,382.91405529178394 807,386 C 841.0131534750828,389.08594470821606 893.7829471191561,285.2991206398033 931,249 C 968.2170528808439,212.70087936019675 989.8813649984581,243.889462149003 1018,254 C 1046.1186350015419,264.110537850997 1080.6915928870112,253.14303076418477 1117,219 C 1153.3084071129888,184.85696923581523 1191.352263453497,127.53841479425793 1230,178 C 1268.647736546503,228.46158520574207 1307.899353299001,386.7033100587835 1343,375 C 1378.100646700999,363.2966899412165 1409.0503233504996,181.64834497060826 1440,0 L 1440,700 L 0,700 Z" stroke="none" strokeWidth="0" fill="var(--accent)" fillOpacity="1" className="transition-all duration-300 ease-in-out delay-150 path-0"></path></svg>
                    </div>
                </div>
                
            </div>
            
            <div className={`${main.svg} absolute bottom-0 left-0 w-full z-0`}>
                <svg width="100%" height="100%" id="svg" viewBox="0 0 1440 490" xmlns="http://www.w3.org/2000/svg" className="transition duration-300 ease-in-out delay-150"><path d="M 0,500 L 0,275 C 92.07142857142858,274.875 184.14285714285717,274.75 302,278 C 419.85714285714283,281.25 563.4999999999999,287.875 698,252 C 832.5000000000001,216.125 957.8571428571429,137.75 1080,97 C 1202.142857142857,56.25000000000001 1321.0714285714284,53.125 1440,50 L 1440,500 L 0,500 Z" stroke="none" strokeWidth="0" fill="#abb8c3" fillOpacity="0.53" className="transition-all duration-300 ease-in-out delay-150 path-0"></path><path d="M 0,500 L 0,441 C 147.60714285714283,436.19642857142856 295.21428571428567,431.39285714285717 406,411 C 516.7857142857143,390.60714285714283 590.75,354.625 701,335 C 811.25,315.375 957.7857142857142,312.10714285714283 1087,295 C 1216.2142857142858,277.89285714285717 1328.107142857143,246.94642857142858 1440,216 L 1440,500 L 0,500 Z" stroke="none" strokeWidth="0" fill="#abb8c3" fillOpacity="1" className="transition-all duration-300 ease-in-out delay-150 path-1"></path></svg>
            </div>
        </div>
    )
}
