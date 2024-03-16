import LeaderboardContainer from '@/Components/LeaderboardContainer';
import Paginator from '@/Components/Paginator';
import main from '@/Components/scss/components.module.css';
import s from '@/Components/scss/leaderboard.module.css';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { IconNumber } from '@tabler/icons-react';
import { useEffect } from 'react';


export default function Leaderboard({ auth, leaderboard }) {
    useEffect(() => {
        console.log(leaderboard);

    }, []);

    return (
        <Authenticated 
            user={auth.user}
        >
            <Head title='Leaderboard'/>

            <div className={`my-12 max-w-xl md:rounded-lg mx-auto p-2 lg:p-4`}>
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

        </Authenticated>
    )
}
