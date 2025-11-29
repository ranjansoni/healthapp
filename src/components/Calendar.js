'use client';

import { useState } from 'react';

export default function Calendar({ selectedDate, onDateSelect, onClose }) {
    const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate));

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        return { daysInMonth, startingDayOfWeek, year, month };
    };

    const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(year, month - 1, 1));
    };

    const handleNextMonth = () => {
        const nextMonth = new Date(year, month + 1, 1);
        // Allow navigation to current month
        if (nextMonth <= new Date(today.getFullYear(), today.getMonth() + 1, 0)) {
            setCurrentMonth(nextMonth);
        }
    };

    const handleDateClick = (day) => {
        const clickedDate = new Date(year, month, day);
        clickedDate.setHours(0, 0, 0, 0);

        // Prevent selecting future dates
        if (clickedDate <= today) {
            onDateSelect(clickedDate.toISOString().split('T')[0]);
            onClose();
        }
    };

    const isDateDisabled = (day) => {
        const date = new Date(year, month, day);
        date.setHours(0, 0, 0, 0);
        return date > today;
    };

    const isSelectedDate = (day) => {
        const date = new Date(year, month, day);
        const selected = new Date(selectedDate);
        return date.toDateString() === selected.toDateString();
    };

    const isToday = (day) => {
        const date = new Date(year, month, day);
        return date.toDateString() === today.toDateString();
    };

    // Check if we can go to next month
    const canGoNext = new Date(year, month + 1, 1) <= new Date(today.getFullYear(), today.getMonth() + 1, 0);

    return (
        <div className="bg-gray-800 rounded-xl p-4 shadow-xl border border-gray-700">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={handlePrevMonth}
                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                </button>
                <h3 className="text-lg font-semibold text-white">
                    {monthNames[month]} {year}
                </h3>
                <button
                    onClick={handleNextMonth}
                    disabled={!canGoNext}
                    className={`p-2 rounded-lg transition-colors ${canGoNext ? 'hover:bg-gray-700' : 'cursor-not-allowed opacity-30'
                        }`}
                >
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </button>
            </div>

            {/* Day names */}
            <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map(day => (
                    <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
                {/* Empty cells for days before month starts */}
                {Array.from({ length: startingDayOfWeek }).map((_, index) => (
                    <div key={`empty-${index}`} className="aspect-square"></div>
                ))}

                {/* Days of the month */}
                {Array.from({ length: daysInMonth }).map((_, index) => {
                    const day = index + 1;
                    const disabled = isDateDisabled(day);
                    const selected = isSelectedDate(day);
                    const isTodayDate = isToday(day);

                    return (
                        <button
                            key={day}
                            onClick={() => handleDateClick(day)}
                            disabled={disabled}
                            className={`aspect-square rounded-lg text-sm font-medium transition-colors
                                ${disabled ? 'text-gray-600 cursor-not-allowed' : 'text-gray-300 hover:bg-gray-700'}
                                ${selected ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}
                                ${isTodayDate && !selected ? 'ring-2 ring-blue-400' : ''}
                            `}
                        >
                            {day}
                        </button>
                    );
                })}
            </div>

            {/* Close button */}
            <button
                onClick={onClose}
                className="w-full mt-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium text-gray-300 transition-colors"
            >
                Close
            </button>
        </div>
    );
}
