'use client';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export default function HistoryChart({ data, title, type = 'item' }) {
    // data is expected to be an array of { date, status/completion_percentage }

    const chartData = {
        labels: data.map(d => {
            const date = new Date(d.date);
            return `${date.getMonth() + 1}/${date.getDate()}`;
        }),
        datasets: [
            {
                label: type === 'item' ? 'Completion Status' : 'Completion %',
                data: data.map(d => type === 'item' ? d.status : d.completion_percentage),
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                tension: 0.3,
                fill: true,
                pointRadius: 3,
                pointHoverRadius: 5,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: !!title,
                text: title,
                color: '#fff'
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: type === 'item' ? 1.1 : 100, // slightly over 1 for boolean to show clearly
                ticks: {
                    color: '#9ca3af',
                    callback: function (value) {
                        if (type === 'item') {
                            if (value === 0) return 'Missed';
                            if (value === 1) return 'Done';
                            return '';
                        }
                        return value + '%';
                    }
                },
                grid: {
                    color: '#374151'
                }
            },
            x: {
                ticks: {
                    color: '#9ca3af'
                },
                grid: {
                    display: false
                }
            }
        },
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
        }
    };

    return <Line options={options} data={chartData} />;
}
