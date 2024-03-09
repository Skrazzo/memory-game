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
                            fill: true,
                            data: chart.data,
                            backgroundColor: (context) => { 
                                const bgColor = [
                                    (colors.accent) ? colors.accent : '#FFFFFF',
                                    (colors.accent_darker) ? colors.accent_darker : '#FFFFFF',
                                    (colors.background) ? colors.background : '#FFFFFF',
                                ];

                                console.log(bgColor);
                            
                                if(!context.chart.chartArea) {
                                    return;
                                }

                                const { ctx, data, chartArea: {top, bottom} } = context.chart; 
                                const gradientBg = ctx.createLinearGradient(0, top, 0, bottom); 
                                gradientBg.addColorStop(0.3, bgColor[0])
                                gradientBg.addColorStop(0.9, bgColor[1])
                                gradientBg.addColorStop(1, bgColor[2])
                                
                                return gradientBg;
                            },
                            borderColor: `${colors.accent_darker}`,
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
                        },
                        
                    },
                    maintainAspectRatio: false,
                    pointRadius: 2,
                    pointBackgroundColor: `${colors.accent_darker}`,
                    scales: {
                        x: {
                            display: false,
                        },
                        y: {
                            display: false,
                            min: 900,
                        }
                    }
                    
                }}
            />
            </div>
        </AuthenticatedLayout>
    );
}
