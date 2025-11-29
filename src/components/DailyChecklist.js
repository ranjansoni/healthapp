'use client';

import { useState, useEffect } from 'react';
import Modal from './Modal';
import HistoryChart from './HistoryChart';
import Calendar from './Calendar';
import CardView from './CardView';
import CompleteDayModal from './CompleteDayModal';
import DaySummaryModal from './DaySummaryModal';

export default function DailyChecklist() {
    const [items, setItems] = useState([]);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [weight, setWeight] = useState('');
    const [weightNotes, setWeightNotes] = useState('');
    const [showWeightInput, setShowWeightInput] = useState(false);
    const [sleepHours, setSleepHours] = useState('');
    const [sleepScore, setSleepScore] = useState('');
    const [steps, setSteps] = useState('');
    const [floorsClimbed, setFloorsClimbed] = useState('');
    const [showCalendar, setShowCalendar] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'card'

    // Modal states
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditTimeModalOpen, setIsEditTimeModalOpen] = useState(false);
    const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
    const [isCompleteDayModalOpen, setIsCompleteDayModalOpen] = useState(false);
    const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
    const [completionData, setCompletionData] = useState(null);

    // Form/Selection states
    const [selectedItem, setSelectedItem] = useState(null);
    const [newItem, setNewItem] = useState({ time_of_day: '', description: '', category: 'Diet' });
    const [editTime, setEditTime] = useState('');
    const [historyData, setHistoryData] = useState([]);
    const [historyType, setHistoryType] = useState('item'); // 'item' or 'overall'

    useEffect(() => {
        fetchItems();
        fetchWeight();
    }, [date]);

    // Mobile detection
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Load view mode preference
    useEffect(() => {
        const savedViewMode = localStorage.getItem('viewMode');
        if (savedViewMode && isMobile) {
            setViewMode(savedViewMode);
        } else if (!isMobile) {
            setViewMode('list');
        }
    }, [isMobile]);

    // Toggle view mode
    const toggleViewMode = () => {
        const newMode = viewMode === 'list' ? 'card' : 'list';
        setViewMode(newMode);
        localStorage.setItem('viewMode', newMode);
    };

    const fetchWeight = async () => {
        try {
            const res = await fetch(`/api/weight?date=${date}`);
            const data = await res.json();
            if (data.weight_kg || data.sleep_hours || data.sleep_score || data.steps || data.floors_climbed) {
                setWeight(data.weight_kg?.toString() || '');
                setWeightNotes(data.notes || '');
                setSleepHours(data.sleep_hours?.toString() || '');
                setSleepScore(data.sleep_score?.toString() || '');
                setSteps(data.steps?.toString() || '');
                setFloorsClimbed(data.floors_climbed?.toString() || '');
            } else {
                setWeight('');
                setWeightNotes('');
                setSleepHours('');
                setSleepScore('');
                setSteps('');
                setFloorsClimbed('');
            }
        } catch (error) {
            console.error('Failed to fetch weight', error);
        }
    };

    const saveWeight = async () => {
        try {
            await fetch('/api/weight', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    date,
                    weight_kg: weight ? parseFloat(weight) : null,
                    notes: weightNotes,
                    sleep_hours: sleepHours ? parseFloat(sleepHours) : null,
                    sleep_score: sleepScore ? parseInt(sleepScore) : null,
                    steps: steps ? parseInt(steps) : null,
                    floors_climbed: floorsClimbed ? parseInt(floorsClimbed) : null
                })
            });
            setShowWeightInput(false);
        } catch (error) {
            console.error('Failed to save weight', error);
        }
    };

    const fetchItems = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/log?date=${date}`);
            const data = await res.json();
            if (Array.isArray(data)) {
                setItems(data);
            } else {
                console.error('API returned non-array data:', data);
                setItems([]);
            }
        } catch (error) {
            console.error('Failed to fetch items', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleItem = async (id, currentStatus) => {
        if (editMode) return; // Disable toggling in edit mode

        // Convert to boolean if needed, then toggle
        const currentBool = Boolean(currentStatus);
        const newStatus = !currentBool;
        const newStatusNum = newStatus ? 1 : 0;

        // Optimistic update
        setItems(items.map(item => item.id === id ? { ...item, status: newStatusNum } : item));

        try {
            await fetch('/api/log', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ date, routine_item_id: id, status: newStatusNum })
            });
        } catch (error) {
            console.error('Failed to update item', error);
            // Revert on error
            const revertStatusNum = currentBool ? 1 : 0;
            setItems(items.map(item => item.id === id ? { ...item, status: revertStatusNum } : item));
        }
    };

    const handleAddItem = async () => {
        try {
            const res = await fetch('/api/routine', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...newItem, valid_from: date })
            });
            if (res.ok) {
                setIsAddModalOpen(false);
                setNewItem({ time_of_day: '', description: '', category: 'Diet' });
                fetchItems();
            }
        } catch (error) {
            console.error('Failed to add item', error);
        }
    };

    const handleEditTime = async () => {
        if (!selectedItem) return;
        try {
            const res = await fetch('/api/routine', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: selectedItem.id, time_of_day: editTime, valid_from: date })
            });
            if (res.ok) {
                setIsEditTimeModalOpen(false);
                setSelectedItem(null);
                fetchItems();
            }
        } catch (error) {
            console.error('Failed to edit time', error);
        }
    };

    const handleDeleteItem = async (item) => {
        if (!confirm('Are you sure you want to remove this item from today onwards?')) return;
        try {
            const res = await fetch('/api/routine', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: item.id, valid_from: date })
            });
            if (res.ok) {
                fetchItems();
            }
        } catch (error) {
            console.error('Failed to delete item', error);
        }
    };

    const openHistory = async (item) => {
        setHistoryType(item ? 'item' : 'overall');
        setSelectedItem(item);
        setIsHistoryModalOpen(true);

        try {
            const url = item
                ? `/api/history?series_id=${item.series_id || item.id}` // Fallback to id if series_id missing (migration edge case)
                : '/api/history';
            const res = await fetch(url);
            const data = await res.json();
            setHistoryData(data);
        } catch (error) {
            console.error('Failed to fetch history', error);
        }
    };

    const groupedItems = items.reduce((acc, item) => {
        const time = item.time_of_day;
        if (!acc[time]) acc[time] = [];
        acc[time].push(item);
        return acc;
    }, {});

    // Helper function to convert time string to comparable number
    const timeToMinutes = (timeStr) => {
        if (!timeStr) return 0;
        const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)?/i);
        if (!match) return 0;

        let hours = parseInt(match[1]);
        const minutes = parseInt(match[2]);
        const period = match[3]?.toUpperCase();

        if (period === 'PM' && hours !== 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;

        return hours * 60 + minutes;
    };

    const orderedTimes = [...new Set(items.map(item => item.time_of_day))].sort((a, b) => {
        return timeToMinutes(a) - timeToMinutes(b);
    });

    return (
        <div className="max-w-md mx-auto bg-gray-900 min-h-screen text-white p-4 pb-20">
            <div className="flex flex-col mb-6 space-y-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                        Daily Routine
                    </h1>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => openHistory(null)}
                            className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                            title="Overall History"
                        >
                            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                            </svg>
                        </button>
                        <button
                            onClick={() => setEditMode(!editMode)}
                            className={`p-2 rounded-lg transition-colors ${editMode ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                            title="Edit Mode"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="flex justify-between items-center bg-gray-800 p-2 rounded-lg">
                    <button
                        onClick={() => {
                            const d = new Date(date);
                            d.setDate(d.getDate() - 1);
                            setDate(d.toISOString().split('T')[0]);
                        }}
                        className="p-1 hover:bg-gray-700 rounded"
                    >
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                    </button>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="bg-transparent text-white font-medium focus:outline-none"
                    />
                    <button
                        onClick={() => setShowCalendar(true)}
                        className="p-1 hover:bg-gray-700 rounded"
                        title="Calendar View"
                    >
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                    </button>
                    <button
                        onClick={() => {
                            const d = new Date(date);
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            d.setDate(d.getDate() + 1);

                            // Prevent going to future dates
                            if (d <= today) {
                                setDate(d.toISOString().split('T')[0]);
                            }
                        }}
                        disabled={date >= new Date().toISOString().split('T')[0]}
                        className={`p-1 rounded ${date >= new Date().toISOString().split('T')[0]
                            ? 'text-gray-600 cursor-not-allowed'
                            : 'hover:bg-gray-700 text-gray-400'
                            }`}
                    >
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                </div>

                {/* Weight Tracking Section */}
                <div className="bg-gray-800 p-3 rounded-lg">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path>
                            </svg>
                            <span className="text-sm text-gray-300">
                                {weight ? `Weight: ${weight} kg` : 'Log Weight'}
                            </span>
                        </div>
                        <button
                            onClick={() => setShowWeightInput(!showWeightInput)}
                            className="p-1 text-gray-400 hover:text-blue-400 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {showWeightInput ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                )}
                            </svg>
                        </button>
                    </div>

                    {showWeightInput && (
                        <div className="mt-3 space-y-2">
                            <div className="flex space-x-2">
                                <input
                                    type="number"
                                    step="0.1"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    placeholder="Weight (kg)"
                                    className="flex-1 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:border-blue-500 focus:outline-none"
                                />
                                <input
                                    type="number"
                                    step="0.5"
                                    value={sleepHours}
                                    onChange={(e) => setSleepHours(e.target.value)}
                                    placeholder="Sleep (hrs)"
                                    className="flex-1 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:border-blue-500 focus:outline-none"
                                />
                            </div>
                            <div className="flex space-x-2">
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={sleepScore}
                                    onChange={(e) => setSleepScore(e.target.value)}
                                    placeholder="Sleep Score (0-100)"
                                    className="flex-1 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:border-blue-500 focus:outline-none"
                                />
                                <button
                                    onClick={saveWeight}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium transition-colors"
                                >
                                    Save
                                </button>
                            </div>
                            <div className="flex space-x-2">
                                <input
                                    type="number"
                                    value={steps}
                                    onChange={(e) => setSteps(e.target.value)}
                                    placeholder="Steps"
                                    className="flex-1 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:border-blue-500 focus:outline-none"
                                />
                                <input
                                    type="number"
                                    value={floorsClimbed}
                                    onChange={(e) => setFloorsClimbed(e.target.value)}
                                    placeholder="Floors"
                                    className="flex-1 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:border-blue-500 focus:outline-none"
                                />
                            </div>
                            <input
                                type="text"
                                value={weightNotes}
                                onChange={(e) => setWeightNotes(e.target.value)}
                                placeholder="Notes (optional)"
                                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:border-blue-500 focus:outline-none"
                            />
                        </div>
                    )}
                </div>

                {/* View Toggle Button (Mobile Only) */}
                {isMobile && (
                    <button
                        onClick={toggleViewMode}
                        className="w-full py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 mb-2"
                    >
                        {viewMode === 'list' ? (
                            <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                                </svg>
                                <span>Card View</span>
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                                </svg>
                                <span>List View</span>
                            </>
                        )}
                    </button>
                )}

                {editMode && (
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                        <span>Add New Item</span>
                    </button>
                )}
            </div>

            {/* Items Display */}
            {loading ? (
                <div className="flex justify-center py-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : items.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No items for today</div>
            ) : isMobile && viewMode === 'card' ? (
                /* Card View (Mobile Only) */
                <CardView
                    items={items}
                    onToggleStatus={toggleItem}
                    onAddNotes={(item) => {
                        setSelectedItem(item);
                        setNotes(item.notes || '');
                        setIsNotesModalOpen(true);
                    }}
                />
            ) : (
                /* List View */
                <div className="space-y-6">
                    {orderedTimes.map(time => (
                        <div key={time} className="bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-700 relative group">
                            <div className="flex justify-between items-center mb-3">
                                <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">{time}</h2>
                            </div>

                            <div className="space-y-3">
                                {groupedItems[time].map(item => (
                                    <div
                                        key={item.id}
                                        className={`flex items-start space-x-3 p-2 rounded-lg transition-all duration-200 ${item.status ? 'bg-blue-900/20' : 'hover:bg-gray-700/50'}`}
                                    >
                                        <div
                                            onClick={() => toggleItem(item.id, item.status)}
                                            className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors cursor-pointer ${item.status ? 'bg-blue-500 border-blue-500' : 'border-gray-500'}`}
                                        >
                                            {item.status && (
                                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                                                </svg>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className={`text-sm font-medium truncate ${item.status ? 'text-gray-400 line-through' : 'text-gray-200'}`}>
                                                {item.description}
                                            </p>
                                            <span className="text-xs text-gray-500">{item.category}</span>
                                        </div>

                                        {editMode ? (
                                            <div className="flex space-x-1">
                                                <button
                                                    onClick={() => {
                                                        setSelectedItem(item);
                                                        setEditTime(item.time_of_day);
                                                        setIsEditTimeModalOpen(true);
                                                    }}
                                                    className="p-1 text-gray-400 hover:text-blue-400"
                                                    title="Change Time"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteItem(item)}
                                                    className="p-1 text-gray-400 hover:text-red-400"
                                                    title="Delete Item"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => openHistory(item)}
                                                className="p-1 text-gray-500 hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                                title="View History"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path></svg>
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Add Item Modal */}
            <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Item">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Time</label>
                        <input
                            type="text"
                            value={newItem.time_of_day}
                            onChange={e => setNewItem({ ...newItem, time_of_day: e.target.value })}
                            placeholder="e.g. 08:00 AM"
                            className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                        <input
                            type="text"
                            value={newItem.description}
                            onChange={e => setNewItem({ ...newItem, description: e.target.value })}
                            placeholder="e.g. Drink Water"
                            className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
                        <select
                            value={newItem.category}
                            onChange={e => setNewItem({ ...newItem, category: e.target.value })}
                            className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white focus:border-blue-500 focus:outline-none"
                        >
                            <option value="Diet">Diet</option>
                            <option value="Supplement">Supplement</option>
                            <option value="Exercise">Exercise</option>
                            <option value="Lifestyle">Lifestyle</option>
                        </select>
                    </div>
                    <button
                        onClick={handleAddItem}
                        className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded font-medium transition-colors"
                    >
                        Add Item
                    </button>
                </div>
            </Modal>

            {/* Edit Time Modal */}
            <Modal isOpen={isEditTimeModalOpen} onClose={() => setIsEditTimeModalOpen(false)} title="Change Time">
                <div className="space-y-4">
                    <p className="text-gray-400 text-sm">Changing time for: <span className="text-white font-medium">{selectedItem?.description}</span></p>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">New Time</label>
                        <input
                            type="text"
                            value={editTime}
                            onChange={e => setEditTime(e.target.value)}
                            placeholder="e.g. 09:00 AM"
                            className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                    <button
                        onClick={handleEditTime}
                        className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded font-medium transition-colors"
                    >
                        Update Time
                    </button>
                </div>
            </Modal>

            {/* History Modal */}
            <Modal isOpen={isHistoryModalOpen} onClose={() => setIsHistoryModalOpen(false)} title={historyType === 'item' ? 'Item History' : 'Overall Progress'}>
                <div className="h-64">
                    {historyData.length > 0 ? (
                        <HistoryChart
                            data={historyData}
                            title={historyType === 'item' ? selectedItem?.description : 'Last 30 Days'}
                            type={historyType}
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                            Loading history...
                        </div>
                    )}
                </div>
            </Modal>

            {/* Calendar Modal */}
            {showCalendar && (
                <Modal isOpen={showCalendar} onClose={() => setShowCalendar(false)} title="">
                    <Calendar
                        selectedDate={date}
                        onDateSelect={setDate}
                        onClose={() => setShowCalendar(false)}
                    />
                </Modal>
            )}

            {/* Complete Day Modal */}
            <CompleteDayModal
                isOpen={isCompleteDayModalOpen}
                onClose={() => setIsCompleteDayModalOpen(false)}
                date={date}
                onComplete={(data) => {
                    setCompletionData({
                        ...data, metrics: {
                            weight_kg: parseFloat(weight),
                            sleep_hours: parseFloat(sleepHours),
                            sleep_score: parseInt(sleepScore),
                            steps: parseInt(steps),
                            floors_climbed: floorsClimbed ? parseInt(floorsClimbed) : 0
                        }
                    });
                    setIsSummaryModalOpen(true);
                }}
            />

            {/* Day Summary Modal */}
            <DaySummaryModal
                isOpen={isSummaryModalOpen}
                onClose={() => setIsSummaryModalOpen(false)}
                date={date}
                completionData={completionData}
            />

            {/* Complete/Reset Day Button - Fixed at bottom */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900 via-gray-900 to-transparent pointer-events-none">
                <div className="max-w-md mx-auto pointer-events-auto">
                    {completionData?.isCompleted ? (
                        <div className="flex space-x-3">
                            <div className="flex-1 py-4 bg-gray-800 rounded-xl font-bold text-lg text-green-400 flex items-center justify-center border border-green-500/30">
                                <span>✓ Day Completed</span>
                            </div>
                            <button
                                onClick={async () => {
                                    if (confirm('Are you sure you want to reset this day? You will need to complete it again.')) {
                                        try {
                                            const res = await fetch(`/api/complete-day?date=${date}`, { method: 'DELETE' });
                                            if (res.ok) {
                                                // Refresh status
                                                const statusRes = await fetch(`/api/complete-day?date=${date}`);
                                                const data = await statusRes.json();
                                                setCompletionData(data);
                                            }
                                        } catch (error) {
                                            console.error('Failed to reset day', error);
                                        }
                                    }
                                }}
                                className="px-6 py-4 bg-gray-800 hover:bg-gray-700 rounded-xl font-bold text-lg text-gray-400 hover:text-white transition-colors border border-gray-700"
                            >
                                ↺ Reset
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setIsCompleteDayModalOpen(true)}
                            className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-xl font-bold text-lg text-white shadow-lg transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
                        >
                            <span>✓</span>
                            <span>Complete Day</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
