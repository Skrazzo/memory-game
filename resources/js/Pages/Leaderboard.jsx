import LeaderboardContainer from '@/Components/LeaderboardContainer';
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

            <div className={`my-12 max-w-6xl md:mx-4 md:rounded-lg xl:mx-auto p-2 lg:p-4`}>
                <LeaderboardContainer n={1} name={'Leons Aleksandrovs'} score={69420}/>

            </div>

        </Authenticated>
    )
}
