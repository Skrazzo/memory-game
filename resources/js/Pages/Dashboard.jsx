import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import s from '@/Components/scss/components.module.css';
//import main from '@/Components/scss/dashboard.module.css';

import { useEffect, useState } from 'react';
import Chart from '@/Components/Chart';
import NoChart from '@/Components/NoChart';
import { IconDeviceGamepad2, IconLayoutList, IconTargetArrow, IconTrophy } from '@tabler/icons-react';
import useMediaQuery from '@custom-react-hooks/use-media-query';
import DashboardHistoryContainer from '@/Components/DashboardHistoryContainer';
import { v4 } from 'uuid';
import Paginator from '@/Components/Paginator';


export default function Dashboard({ auth, chart, stats, history }) {
    const [colors, setColors] = useState({});
    const sm = useMediaQuery('(max-width: 640px)');


    useEffect(() => {
        console.log(history);
        getThemeColors();
    }, []);


    //useEffect(() => console.log(colors), [colors]);

    /**
     * Retrieves the value of the CSS custom property '--accent' from the body element
     * and sets it as the value of the 'accent' property in the 'colors' state.
     */
    function getThemeColors() {
        // Get the body element
        const element = document.body;

        // Get the computed styles of the body element
        const styles = getComputedStyle(element);

        // Create an object with the 'accent' property and assign it the value of the '--accent' custom property
        const arr = {
            accent: styles.getPropertyValue('--accent'),
            accent_darker: styles.getPropertyValue('--accent-darker'),
            form_opacity: styles.getPropertyValue('--form-background-opacity'),
            background: styles.getPropertyValue('--background'),
        };
        
        // Set the 'colors' state to a new object containing the properties of 'arr'
        setColors({...arr});
    }
    

    const stats_icon_props = {
        size: (sm) ? 36 : 44, 
        strokeWidth: 1.5,
    };

    

    return (
        <AuthenticatedLayout
            user={auth.user}
            
        >
            <Head title="Dashboard" />

            <div className={`my-12 max-w-6xl md:mx-4 md:rounded-lg xl:mx-auto sm:p-2 lg:p-4`}>
                {(chart.data.length >= 2) 
                    ? <Chart colors={colors} chart={chart}/>
                    : <NoChart />
                }
                

                <div className={`${s.form_accent} ${s.primary_text} mt-6 sm:rounded-md p-2 sm:p-4 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:place-items-center`}>
                    <div className={`flex gap-2 items-center`}>
                        <IconDeviceGamepad2 {...stats_icon_props}/>
                        <span className='sm:text-lg'><strong>{stats.games_played}</strong> played</span>
                    </div>
                    <div className={`flex gap-2 items-center`}>
                        <IconTargetArrow {...stats_icon_props}/>
                        <span className='sm:text-lg'><strong>{stats.average_points}</strong> on average</span>
                    </div>
                    <div className={`flex gap-2 items-center`}>
                        <IconTrophy {...stats_icon_props}/>
                        <span className='sm:text-lg'><strong>{(stats.user_best) ? stats.user_best : 'No PB'}</strong></span>
                    </div>
                    <div className={`flex gap-2 items-center`}>
                        <IconLayoutList {...stats_icon_props} />
                        <span className='sm:text-lg'><strong>{stats.leaderboard_place}.</strong> place</span>
                    </div>
                </div>

                <div className='mt-6 grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4'>
                    {history.data.map((x, i) => {
                        return <DashboardHistoryContainer appearAfterMS={0} key={v4()} {...x}/>;
                    })}
                </div>

                <Paginator {...history} className='mt-6'/>
            </div>
        </AuthenticatedLayout>
    );
}
