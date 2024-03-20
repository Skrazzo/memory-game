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
import Paginator from '@/Components/Paginator';

export default function Dashboard({ auth, chart, stats, history }) {
    const [colors, setColors] = useState({});
    const sm = useMediaQuery('(max-width: 640px)');


    useEffect(() => {
        getThemeColors();

        // make interval
        const interval = setInterval(() => {
            getThemeColors();
        }, 500);


        // remove interval when component unmounts
        return () => clearInterval(interval);
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

            <div className={`my-12 max-w-6xl md:mx-4 md:rounded-lg xl:mx-auto sm:p-2 lg:p-4 z-10 relative`}>
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
                        return <DashboardHistoryContainer key={i} {...x}/>;
                    })}
                </div>

                <Paginator {...history} className='mt-6'/>

                
            </div>

            <div className={`${s.svg} ${(!document.URL.includes('?')) ? s.svg_anim : ''} overflow-hidden`} style={{
                position: 'absolute',
                left: '0',
                bottom: '-50px',
                width: '100%',
                opacity: 0.3,
                zIndex: '0',
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" className="transition duration-300 ease-in-out delay-150" viewBox="0 0 1440 390" > <path fill="#ff0080" fillOpacity="0.53" strokeWidth="0" d="M0 400V100c62.207-31.422 124.414-62.844 190-43s134.552 90.955 215 88c80.448-2.955 172.377-79.977 235-91 62.623-11.023 95.94 43.953 152 55 56.06 11.047 134.862-21.833 219-24 84.138-2.167 173.61 26.381 246 34 72.39 7.619 127.695-5.69 183-19v300H0z" className="transition-all duration-300 ease-in-out delay-150 path-0" ></path> <path fill="#ff0080" strokeWidth="0" d="M0 400V233c85.544-13.595 171.089-27.19 234-34 62.911-6.81 103.189-6.838 173-1s169.157 17.54 242 14c72.843-3.54 119.185-22.32 168-5s100.104 70.74 182 65c81.896-5.74 194.399-70.64 273-87s123.3 15.82 168 48v167H0z" className="transition-all duration-300 ease-in-out delay-150 path-1" ></path> </svg>
        </div>
        </AuthenticatedLayout>
    );
}
