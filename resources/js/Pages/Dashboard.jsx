import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import s from '@/Components/scss/components.module.css';

import { Chart as ChartJS } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';


export default function Dashboard({ auth, chart }) {
    const [colors, setColors] = useState({});

    console.log(chart);

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
        };

        // Set the 'colors' state to a new object containing the properties of 'arr'
        setColors({...arr});
    }
    
    return (
        <AuthenticatedLayout
            user={auth.user}
            
        >
            <Head title="Dashboard" />

            <div className={`${s.form} my-12 max-w-6xl md:mx-4 md:rounded-lg xl:mx-auto `}>
            <Line
                style={{
                    height: '200px',
                    width: '100%',
                }}
                datasetIdKey='id'
                data={{
                    labels: chart.labels,
                    datasets: [
                        {
                            data: chart.data,
                            backgroundColor: `${colors.accent}`,
                            borderColor: `${colors.accent}`,
                        },
                    ],
                    
                }}
                options={{
                    elements: {
                        line: {
                            tension: 0.3,
                        },
                    },
                    plugins: {
                        legend: {
                            display: false,
                        }
                    },
                    maintainAspectRatio: false,
                    pointRadius: 2,
                    pointBackgroundColor: `${colors.accent_darker}`,
                    scales: {
                        x: {
                            grid: {
                                color: 'black',
                            },
                            display: false,
                        },
                        y: {
                            display: false,
                        }
                    }
                    
                }}
            />
            </div>
        </AuthenticatedLayout>
    );
}
