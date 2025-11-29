'use client';

import { useState, useRef, useEffect } from 'react';

export default function CardView({ items, onToggleStatus, onAddNotes }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [swipeDirection, setSwipeDirection] = useState(null);
    const cardRef = useRef(null);

    // Sort items by time - convert to 24-hour format for proper sorting
    const parseTime = (timeStr) => {
        if (!timeStr) return 0;
        const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
        if (!match) return 0;

        let hours = parseInt(match[1]);
        const minutes = parseInt(match[2]);
        const period = match[3].toUpperCase();

        if (period === 'PM' && hours !== 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;

        return hours * 60 + minutes; // Return total minutes for easy comparison
    };

    const sortedItems = [...items].sort((a, b) => {
        return parseTime(a.time_of_day) - parseTime(b.time_of_day);
    });

    // Minimum swipe distance (in px)
    const minSwipeDistance = 50;

    const currentItem = sortedItems[currentIndex];
    const totalItems = sortedItems.length;

    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe && currentIndex < totalItems - 1) {
            // Swipe left - next item
            setSwipeDirection('left');
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentIndex(prev => prev + 1);
                setSwipeDirection(null);
                setIsAnimating(false);
            }, 200);
        } else if (isRightSwipe && currentIndex > 0) {
            // Swipe right - previous item
            setSwipeDirection('right');
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentIndex(prev => prev - 1);
                setSwipeDirection(null);
                setIsAnimating(false);
            }, 200);
        }
    };

    const goToNext = () => {
        if (currentIndex < totalItems - 1 && !isAnimating) {
            setSwipeDirection('left');
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentIndex(prev => prev + 1);
                setSwipeDirection(null);
                setIsAnimating(false);
            }, 200);
        }
    };

    const goToPrevious = () => {
        if (currentIndex > 0 && !isAnimating) {
            setSwipeDirection('right');
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentIndex(prev => prev - 1);
                setSwipeDirection(null);
                setIsAnimating(false);
            }, 200);
        }
    };

    const handleToggle = () => {
        if (currentItem) {
            // Pass current status as boolean (toggleItem expects boolean)
            onToggleStatus(currentItem.id, currentItem.status === 1);

            // Auto-scroll to next item after marking complete (not when un-completing)
            if (currentItem.status !== 1 && currentIndex < totalItems - 1) {
                setTimeout(() => {
                    goToNext();
                }, 400); // Small delay for visual feedback
            }
        }
    };

    if (!currentItem) {
        return (
            <div className="flex items-center justify-center h-64 text-gray-500">
                No items for today
            </div>
        );
    }

    const getCategoryColor = (category) => {
        const colors = {
            'Diet': 'bg-green-500',
            'Exercise': 'bg-blue-500',
            'Supplement': 'bg-purple-500',
            'Lifestyle': 'bg-orange-500'
        };
        return colors[category] || 'bg-gray-500';
    };

    return (
        <div className="relative w-full max-w-md mx-auto px-4">
            {/* Progress Indicator */}
            <div className="text-center mb-4">
                <span className="text-sm text-gray-400">
                    {currentIndex + 1} of {totalItems}
                </span>
                <div className="w-full bg-gray-700 h-1 rounded-full mt-2">
                    <div
                        className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                        style={{ width: `${((currentIndex + 1) / totalItems) * 100}%` }}
                    />
                </div>
            </div>

            {/* Card Container */}
            <div className="relative overflow-hidden">
                <div
                    ref={cardRef}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                    className={`bg-gray-800 rounded-2xl p-6 shadow-2xl transition-all duration-200 ${swipeDirection === 'left' ? 'translate-x-[-100%] opacity-0' :
                        swipeDirection === 'right' ? 'translate-x-[100%] opacity-0' :
                            'translate-x-0 opacity-100'
                        }`}
                    style={{ minHeight: '320px' }}
                >
                    {/* Category Badge */}
                    <div className="flex justify-between items-start mb-4">
                        <span className={`${getCategoryColor(currentItem.category)} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
                            {currentItem.category}
                        </span>
                        <span className="text-gray-400 text-sm">{currentItem.time_of_day}</span>
                    </div>

                    {/* Item Description */}
                    <h3 className="text-2xl font-bold text-white mb-6 text-center">
                        {currentItem.description}
                    </h3>

                    {/* Status Toggle - Large Checkbox */}
                    <div className="flex justify-center my-8">
                        <button
                            onClick={handleToggle}
                            className={`w-24 h-24 rounded-full border-4 flex items-center justify-center transition-all duration-200 ${currentItem.status === 1
                                ? 'bg-green-500 border-green-400 scale-100'
                                : 'bg-gray-700 border-gray-600 hover:border-gray-500 scale-95'
                                }`}
                        >
                            {currentItem.status === 1 && (
                                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                                </svg>
                            )}
                        </button>
                    </div>

                    <p className="text-center text-sm text-gray-400 mb-4">
                        {currentItem.status === 1 ? 'Completed ✓' : 'Tap to mark complete'}
                    </p>

                    {/* Notes */}
                    {currentItem.notes && (
                        <div className="mt-4 p-3 bg-gray-700 rounded-lg">
                            <p className="text-sm text-gray-300">{currentItem.notes}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation Arrows */}
            <div className="flex justify-between items-center mt-6">
                <button
                    onClick={goToPrevious}
                    disabled={currentIndex === 0 || isAnimating}
                    className={`p-3 rounded-full transition-all ${currentIndex === 0 || isAnimating
                        ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                        : 'bg-gray-700 text-white hover:bg-gray-600'
                        }`}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                </button>

                <div className="text-center">
                    <p className="text-xs text-gray-500">Swipe to navigate</p>
                </div>

                <button
                    onClick={goToNext}
                    disabled={currentIndex === totalItems - 1 || isAnimating}
                    className={`p-3 rounded-full transition-all ${currentIndex === totalItems - 1 || isAnimating
                        ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                        : 'bg-gray-700 text-white hover:bg-gray-600'
                        }`}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </button>
            </div>

            {/* Swipe Hint (show only on first item) */}
            {currentIndex === 0 && (
                <div className="text-center mt-4 animate-pulse">
                    <p className="text-xs text-gray-500">👈 Swipe left or right 👉</p>
                </div>
            )}
        </div>
    );
}
