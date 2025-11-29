import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const dateStr = searchParams.get('date') || new Date().toISOString().split('T')[0];
    const date = new Date(dateStr);

    try {
        console.log('Fetching items for date:', date);
        // Fetch routine items valid for the date
        const items = await prisma.routine_items.findMany({
            where: {
                valid_from: { lte: date },
                valid_to: { gte: date }
            },
            orderBy: [
                { time_of_day: 'asc' },
                { id: 'asc' }
            ],
            include: {
                daily_logs: {
                    where: {
                        date: date
                    }
                }
            }
        });
        console.log('Fetched items count:', items.length);

        // Transform data to match previous format
        const rows = items.map(item => ({
            id: item.id,
            time_of_day: item.time_of_day,
            description: item.description,
            category: item.category,
            status: item.daily_logs.length > 0 ? (item.daily_logs[0].status ? 1 : 0) : 0,
            notes: item.daily_logs.length > 0 ? item.daily_logs[0].notes : null,
            series_id: item.series_id
        }));
        console.log('Returning rows:', rows);

        return NextResponse.json(rows);
    } catch (error) {
        console.error('Database error details:', error);
        return NextResponse.json({ error: 'Failed to fetch data', details: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const { date: dateStr, routine_item_id, status } = await request.json();

        if (!dateStr || !routine_item_id || status === undefined) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const date = new Date(dateStr);

        // Upsert daily log
        await prisma.daily_logs.upsert({
            where: {
                date_routine_item_id: {
                    date: date,
                    routine_item_id: routine_item_id
                }
            },
            update: {
                status: status
            },
            create: {
                date: date,
                routine_item_id: routine_item_id,
                status: status
            }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Failed to update log' }, { status: 500 });
    }
}
