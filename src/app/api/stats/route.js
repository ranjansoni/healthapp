import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        // Get last 7 days of data
        const today = new Date();
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 6);

        // Fetch all logs from last 7 days
        const logs = await prisma.daily_logs.findMany({
            where: {
                date: {
                    gte: sevenDaysAgo,
                    lte: today
                },
                status: true
            },
            include: {
                routine_items: true
            }
        });

        // Calculate daily completion percentages
        const dailyStats = [];
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        for (let i = 0; i < 7; i++) {
            const date = new Date(sevenDaysAgo);
            date.setDate(sevenDaysAgo.getDate() + i);
            const dateStr = date.toISOString().split('T')[0];

            // Get total items valid for this date
            const totalItems = await prisma.routine_items.count({
                where: {
                    valid_from: { lte: date },
                    valid_to: { gte: date }
                }
            });

            // Get completed items for this date
            const completedItems = await prisma.daily_logs.count({
                where: {
                    date: date,
                    status: true
                }
            });

            const completion = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

            dailyStats.push({
                day: dayNames[date.getDay()],
                date: dateStr,
                completion,
                completed: completedItems,
                total: totalItems
            });
        }

        // Calculate current streak
        let streak = 0;
        const sortedStats = [...dailyStats].reverse(); // Start from today
        for (const stat of sortedStats) {
            if (stat.completion >= 80) { // Consider 80%+ as a successful day
                streak++;
            } else {
                break;
            }
        }

        // Count total completed workouts (Exercise category)
        const totalWorkouts = await prisma.daily_logs.count({
            where: {
                status: true,
                routine_items: {
                    category: 'Exercise'
                }
            }
        });

        return NextResponse.json({
            dailyStats,
            streak,
            totalWorkouts
        });
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
    }
}
