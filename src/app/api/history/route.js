import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const series_id = searchParams.get('series_id');

    // Generate last 30 days dates
    const dates = [];
    for (let i = 29; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        dates.push(d.toISOString().split('T')[0]);
    }

    try {
        if (series_id) {
            // Get history for a specific item series
            const result = [];

            for (const dateStr of dates) {
                const date = new Date(dateStr);

                // Find the routine item valid for this date with the given series_id
                const item = await prisma.routine_items.findFirst({
                    where: {
                        series_id: series_id,
                        valid_from: { lte: date },
                        valid_to: { gte: date }
                    }
                });

                let status = 0;
                if (item) {
                    const log = await prisma.daily_logs.findUnique({
                        where: {
                            date_routine_item_id: {
                                date: date,
                                routine_item_id: item.id
                            }
                        }
                    });
                    if (log && log.status) status = 1;
                }

                result.push({ date: dateStr, status });
            }

            return NextResponse.json(result);
        } else {
            // Overall trend
            const result = [];

            for (const dateStr of dates) {
                const date = new Date(dateStr);

                // Get all valid items for this date
                const items = await prisma.routine_items.findMany({
                    where: {
                        valid_from: { lte: date },
                        valid_to: { gte: date }
                    }
                });

                const total_items = items.length;
                let completed_items = 0;

                if (total_items > 0) {
                    const itemIds = items.map(i => i.id);
                    const logs = await prisma.daily_logs.findMany({
                        where: {
                            date: date,
                            routine_item_id: { in: itemIds },
                            status: true
                        }
                    });
                    completed_items = logs.length;
                }

                const completion_percentage = total_items > 0 ? (completed_items / total_items) * 100 : 0;
                result.push({
                    date: dateStr,
                    total_items,
                    completed_items,
                    completion_percentage
                });
            }

            return NextResponse.json(result);
        }
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Failed to fetch history' }, { status: 500 });
    }
}
