'use client';

import { useState, useEffect } from 'react';
import Modal from './Modal';

export default function DaySummaryModal({ isOpen, onClose, date, completionData }) {
    const [yesterdayData, setYesterdayData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isOpen && date) {
            fetchYesterdayData();
        }
    }, [isOpen, date]);

    const fetchYesterdayData = async () => {
        setLoading(true);
        try {
            const yesterday = new Date(date);
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];

            const res = await fetch(`/api/weight?date=${yesterdayStr}`);
            const data = await res.json();
            setYesterdayData(data);
        } catch (error) {
            console.error('Failed to fetch yesterday data', error);
        } finally {
            setLoading(false);
        }
    };

    const getChange = (current, previous) => {
        if (!previous) return null;
        const diff = current - previous;
        return {
            value: Math.abs(diff).toFixed(diff % 1 === 0 ? 0 : 1),
            isIncrease: diff > 0,
            isDecrease: diff < 0
        };
    };

    const renderChange = (change, unit = '', invertColors = false) => {
        if (!change || (change.value === '0' || change.value === '0.0')) {
            return <span className="text-gray-500">—</span>;
        }

        const isGood = invertColors ? change.isDecrease : change.isIncrease;
        const color = isGood ? 'text-green-400' : 'text-red-400';
        const arrow = change.isIncrease ? '↑' : '↓';

        return (
            <span className={color}>
                {arrow} {change.value}{unit}
            </span>
        );
    };

    if (!completionData) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="">
            <div className="space-y-6 text-center">
                {/* Success Header */}
                <div>
                    <div className="text-6xl mb-4">🎉</div>
                    <h2 className="text-2xl font-bold text-white mb-2">Day Completed!</h2>
                    <p className="text-gray-400">Great job staying consistent</p>
                </div>

                {/* Completion Percentage */}
                <div className="relative inline-flex items-center justify-center">
                    <svg className="w-32 h-32 transform -rotate-90">
                        <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="none"
                            className="text-gray-700"
                        />
                        <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="none"
                            strokeDasharray={`${2 * Math.PI * 56}`}
                            strokeDashoffset={`${2 * Math.PI * 56 * (1 - completionData.stats.percentage / 100)}`}
                            className="text-blue-500 transition-all duration-1000"
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute text-center">
                        <div className="text-3xl font-bold text-white">{completionData.stats.percentage}%</div>
                        <div className="text-xs text-gray-400">Complete</div>
                    </div>
                </div>

                {/* Today vs Yesterday */}
                {!loading && yesterdayData && (
                    <div className="bg-gray-800 rounded-lg p-4">
                        <h3 className="text-sm font-semibold text-gray-400 mb-3">📊 Today vs Yesterday</h3>
                        <div className="space-y-2 text-left">
                            {/* Weight */}
                            <div className="flex justify-between items-center">
                                <span className="text-gray-300">Weight:</span>
                                <div className="text-right">
                                    <span className="text-white font-medium mr-2">
                                        {completionData.metrics?.weight_kg || '—'} kg
                                    </span>
                                    {yesterdayData.weight_kg && completionData.metrics?.weight_kg && (
                                        renderChange(
                                            getChange(completionData.metrics.weight_kg, yesterdayData.weight_kg),
                                            ' kg',
                                            true // Weight decrease is good
                                        )
                                    )}
                                </div>
                            </div>

                            {/* Sleep */}
                            <div className="flex justify-between items-center">
                                <span className="text-gray-300">Sleep:</span>
                                <div className="text-right">
                                    <span className="text-white font-medium mr-2">
                                        {completionData.metrics?.sleep_hours || '—'} hrs
                                    </span>
                                    {yesterdayData.sleep_hours && completionData.metrics?.sleep_hours && (
                                        renderChange(
                                            getChange(completionData.metrics.sleep_hours, yesterdayData.sleep_hours),
                                            ' hr'
                                        )
                                    )}
                                </div>
                            </div>

                            {/* Steps */}
                            <div className="flex justify-between items-center">
                                <span className="text-gray-300">Steps:</span>
                                <div className="text-right">
                                    <span className="text-white font-medium mr-2">
                                        {completionData.metrics?.steps?.toLocaleString() || '—'}
                                    </span>
                                    {yesterdayData.steps && completionData.metrics?.steps && (
                                        renderChange(
                                            getChange(completionData.metrics.steps, yesterdayData.steps),
                                            ''
                                        )
                                    )}
                                </div>
                            </div>

                            {/* Floors */}
                            {(completionData.metrics?.floors_climbed || yesterdayData.floors_climbed) && (
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-300">Floors:</span>
                                    <div className="text-right">
                                        <span className="text-white font-medium mr-2">
                                            {completionData.metrics?.floors_climbed || '—'}
                                        </span>
                                        {yesterdayData.floors_climbed && completionData.metrics?.floors_climbed && (
                                            renderChange(
                                                getChange(completionData.metrics.floors_climbed, yesterdayData.floors_climbed),
                                                ''
                                            )
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Streak */}
                <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-4">
                    <div className="text-4xl mb-2">🔥</div>
                    <div className="text-2xl font-bold text-white">{completionData.streak} Day Streak!</div>
                    <div className="text-sm text-orange-100 mt-1">Keep it going!</div>
                </div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="w-full py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-colors"
                >
                    Close
                </button>
            </div>
        </Modal>
    );
}
