'use client';

import { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function Dashboard() {
    const [stats, setStats] = useState([]);
    const [streak, setStreak] = useState(0);
    const [totalWorkouts, setTotalWorkouts] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await fetch('/api/stats');
            const data = await res.json();

            if (data.dailyStats) {
                setStats(data.dailyStats);
                setStreak(data.streak || 0);
                setTotalWorkouts(data.totalWorkouts || 0);
            }
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: { color: 'white' }
            },
            title: {
                display: true,
                text: 'Weekly Consistency',
                color: 'white'
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                ticks: { color: 'gray' },
                grid: { color: 'rgba(255, 255, 255, 0.1)' }
            },
            x: {
                ticks: { color: 'gray' },
                grid: { display: false }
            }
        }
    };

    const data = {
        labels: stats.map(s => s.day),
        datasets: [
            {
                label: 'Completion %',
                data: stats.map(s => s.completion),
                backgroundColor: 'rgba(59, 130, 246, 0.8)',
                borderRadius: 4,
            },
        ],
    };

    return (
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4">Dashboard</h2>
            {loading ? (
                <div className="text-gray-400">Loading stats...</div>
            ) : (
                <Bar options={options} data={data} />
            )}
            <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-gray-700/50 p-4 rounded-lg">
                    <p className="text-gray-400 text-sm">Current Streak</p>
                    <p className="text-2xl font-bold text-green-400">{streak} {streak === 1 ? 'Day' : 'Days'}</p>
                </div>
                <div className="bg-gray-700/50 p-4 rounded-lg">
                    <p className="text-gray-400 text-sm">Total Workouts</p>
                    <p className="text-2xl font-bold text-blue-400">{totalWorkouts}</p>
                </div>
            </div>
        </div>
    );
}
