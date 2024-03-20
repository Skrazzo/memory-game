import LeaderboardContainer from '@/Components/LeaderboardContainer';
import Paginator from '@/Components/Paginator';
import main from '@/Components/scss/components.module.css';
import s from '@/Components/scss/leaderboard.module.css';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { IconNumber } from '@tabler/icons-react';
import { useEffect } from 'react';


export default function Leaderboard({ auth, leaderboard }) {


    return (
        <Authenticated 
            user={auth.user}
        >
            <Head title='Leaderboard'/>

            <div className={`my-12 max-w-xl md:rounded-lg mx-auto p-2 lg:p-4 relative z-10`}>
                <div style={{
                    minHeight: `${(58+8) * 10 - 8}px`
                }} >
                    <div className='flex flex-col gap-2'>
                        {leaderboard.data.data.map((x, i) => {

                            return <LeaderboardContainer appearAfterMS={i * 35} n={(leaderboard.data.current_page - 1) * 10 + (i + 1)} name={x.name} score={x.highest} you={(auth.user.name === x.name)}/>;
                        })}
                    </div>

                </div>

                <Paginator {...leaderboard.data} />
            </div>

            <div className={`${main.svg} ${(!document.URL.includes('?')) ? main.svg_anim : ''} overflow-hidden`} style={{
                position: 'absolute',
                left: '0',
                bottom: '-50px',
                width: '100%',
                opacity: 0.3,
                zIndex: '0',
            }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" className="transition duration-300 ease-in-out delay-150" viewBox="0 0 1440 390" > <path fill="#ff0080" fillOpacity="0.53" strokeWidth="0" d="M0 400V100c47.507 6.96 95.015 13.918 174 5s189.448-33.714 259-34c69.552-.286 98.192 23.937 151 45 52.808 21.063 129.784 38.965 203 25 73.216-13.965 142.674-59.798 213-81 70.326-21.202 141.522-17.772 215-7 73.478 10.772 149.24 28.886 225 47v300H0z" className="transition-all duration-300 ease-in-out delay-150 path-0" ></path> <path fill="#ff0080" strokeWidth="0" d="M0 400V233c78.588-11.179 157.176-22.358 226-29 68.824-6.642 127.883-8.747 196 0s145.291 28.347 212 34c66.709 5.653 122.953-2.64 189-2 66.047.64 141.897 10.21 208 8 66.103-2.21 122.458-16.203 189-20 66.542-3.797 143.271 2.602 220 9v167H0z" className="transition-all duration-300 ease-in-out delay-150 path-1" ></path> </svg>
            </div>
        </Authenticated>
    )
}
