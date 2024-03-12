import { Chart as ChartJS } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

export default function Chart({ colors, chart }) {
    function convertHex(hexCode, opacity = 1){
        var hex = hexCode.replace('#', '');
    
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
    
        var r = parseInt(hex.substring(0,2), 16),
            g = parseInt(hex.substring(2,4), 16),
            b = parseInt(hex.substring(4,6), 16);
    
        /* Backward compatibility for whole number based opacity values. */
        if (opacity > 1 && opacity <= 100) {
            opacity = opacity / 100;   
        }
        
        return 'rgba('+r+','+g+','+b+','+opacity+')';
    }
    
    return (
        <Line
            style={{
                height: '150px',
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
                                (colors.accent) ? convertHex(colors.accent, 0.7) : '#FFFFFF',
                                (colors.accent) ? convertHex(colors.accent, 0.3) : '#FFFFFF',
                                (colors.accent) ? convertHex(colors.accent, 0.05) : '#FFFFFF',
                                (colors.accent) ? convertHex(colors.accent, 0) : '#FFFFFF',
                            ];

                            if(!context.chart.chartArea) {
                                return;
                            }

                            const { ctx, data, chartArea: {top, bottom} } = context.chart; 
                            const gradientBg = ctx.createLinearGradient(0, top, 0, bottom); 
                            gradientBg.addColorStop(0.3, bgColor[0])
                            gradientBg.addColorStop(0.6, bgColor[1])
                            gradientBg.addColorStop(0.9, bgColor[2])
                            gradientBg.addColorStop(1, bgColor[3])
                            
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
                        min: Math.min(...chart.data) - 100,
                    }

                    
                }
                
            }}
        />
    )
}
