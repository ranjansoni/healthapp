'use client';

import { useState, useEffect } from 'react';
import Modal from './Modal';

export default function CompleteDayModal({ isOpen, onClose, date, onComplete }) {
    const [loading, setLoading] = useState(true);
    const [canComplete, setCanComplete] = useState(false);
    const [stats, setStats] = useState(null);
    const [missingMetrics, setMissingMetrics] = useState([]);

    // Health metrics state
    const [weight, setWeight] = useState('');
    const [sleepHours, setSleepHours] = useState(7.5);
    const [sleepScore, setSleepScore] = useState(8);
    const [steps, setSteps] = useState('');
    const [floorsClimbed, setFloorsClimbed] = useState('');

    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (isOpen) {
            fetchCompletionStatus();
        }
    }, [isOpen, date]);

    const fetchCompletionStatus = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/complete-day?date=${date}`);
            const data = await res.json();

            setStats(data.stats);
            setMissingMetrics(data.missingMetrics || []);
            setCanComplete(data.canComplete);

            // If already has metrics, pre-fill them
            const weightRes = await fetch(`/api/weight?date=${date}`);
            const weightData = await weightRes.json();

            if (weightData.weight_kg) setWeight(weightData.weight_kg.toString());
            if (weightData.sleep_hours) setSleepHours(weightData.sleep_hours);
            if (weightData.sleep_score) setSleepScore(weightData.sleep_score);
            if (weightData.steps) setSteps(weightData.steps.toString());
            if (weightData.floors_climbed) setFloorsClimbed(weightData.floors_climbed.toString());

        } catch (error) {
            console.error('Failed to fetch completion status', error);
        } finally {
            setLoading(false);
        }
    };

    const handleComplete = async () => {
        setSubmitting(true);
        try {
            const res = await fetch('/api/complete-day', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    date,
                    metrics: {
                        weight_kg: parseFloat(weight),
                        sleep_hours: sleepHours,
                        sleep_score: sleepScore,
                        steps: parseInt(steps),
                        floors_climbed: floorsClimbed ? parseInt(floorsClimbed) : 0
                    }
                })
            });

            const data = await res.json();

            if (data.success) {
                onComplete(data);
                onClose();
            } else {
                alert(data.error || 'Failed to complete day');
            }
        } catch (error) {
            console.error('Failed to complete day', error);
            alert('Failed to complete day');
        } finally {
            setSubmitting(false);
        }
    };

    const isFormValid = () => {
        return weight && sleepHours && sleepScore && steps;
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Complete Your Day">
            <div className="space-y-6">
                {loading ? (
                    <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                    </div>
                ) : (
                    <>
                        {/* Completion Stats */}
                        <div className="bg-gray-800 rounded-lg p-4 text-center">
                            <div className="text-3xl font-bold text-blue-400">
                                {stats?.completed}/{stats?.total}
                            </div>
                            <div className="text-sm text-gray-400 mt-1">
                                Routine Items ({stats?.percentage}%)
                            </div>
                        </div>

                        {/* Health Metrics Form */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-white flex items-center">
                                <span className="mr-2">📊</span>
                                Daily Health Metrics
                            </h3>

                            {/* Weight */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Weight (kg) {missingMetrics.includes('weight') && <span className="text-red-400">*</span>}
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    placeholder="72.5"
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white text-lg focus:border-blue-500 focus:outline-none"
                                />
                            </div>

                            {/* Sleep Hours */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Sleep Hours {missingMetrics.includes('sleep_hours') && <span className="text-red-400">*</span>}
                                    <span className="float-right text-blue-400 text-lg font-bold">{sleepHours} hrs</span>
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="12"
                                    step="0.5"
                                    value={sleepHours}
                                    onChange={(e) => setSleepHours(parseFloat(e.target.value))}
                                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>0h</span>
                                    <span className="text-gray-400">Aim for 7-9 hours</span>
                                    <span>12h</span>
                                </div>
                            </div>

                            {/* Sleep Score */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Sleep Quality {missingMetrics.includes('sleep_score') && <span className="text-red-400">*</span>}
                                    <span className="float-right text-blue-400 text-lg font-bold">{sleepScore}/10</span>
                                </label>
                                <input
                                    type="range"
                                    min="1"
                                    max="10"
                                    step="1"
                                    value={sleepScore}
                                    onChange={(e) => setSleepScore(parseInt(e.target.value))}
                                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>😴 Poor</span>
                                    <span>😊 Excellent</span>
                                </div>
                            </div>

                            {/* Steps */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Steps {missingMetrics.includes('steps') && <span className="text-red-400">*</span>}
                                </label>
                                <input
                                    type="number"
                                    value={steps}
                                    onChange={(e) => setSteps(e.target.value)}
                                    placeholder="8,500"
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white text-lg focus:border-blue-500 focus:outline-none"
                                />
                            </div>

                            {/* Floors Climbed */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Floors Climbed (optional)
                                </label>
                                <input
                                    type="number"
                                    value={floorsClimbed}
                                    onChange={(e) => setFloorsClimbed(e.target.value)}
                                    placeholder="15"
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white text-lg focus:border-blue-500 focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Complete Button */}
                        <button
                            onClick={handleComplete}
                            disabled={!isFormValid() || submitting}
                            className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${isFormValid() && !submitting
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
                                    : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            {submitting ? (
                                <span className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                                    Completing...
                                </span>
                            ) : (
                                '✓ Complete Day'
                            )}
                        </button>

                        {!isFormValid() && (
                            <p className="text-sm text-red-400 text-center">
                                Please fill in all required fields (*)
                            </p>
                        )}
                    </>
                )}
            </div>
        </Modal>
    );
}
