import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import s from '@/Components/scss/components.module.css';


import { useEffect, useState } from 'react';
import Chart from '@/Components/Chart';
import NoChart from '@/Components/NoChart';


export default function Dashboard({ auth, chart, stats }) {
    const [colors, setColors] = useState({});

    console.log(stats);

    useEffect(() => {
        getThemeColors();
    }, []);



    useEffect(() => console.log(colors), [colors]);

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
            
            </div>
        </AuthenticatedLayout>
    );
}
