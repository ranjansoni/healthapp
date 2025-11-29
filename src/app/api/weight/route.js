import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const dateStr = searchParams.get('date') || new Date().toISOString().split('T')[0];
    const date = new Date(dateStr);

    try {
        const weightLog = await prisma.weight_logs.findUnique({
            where: { date }
        });

        return NextResponse.json(weightLog || {});
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Failed to fetch weight' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const { date: dateStr, weight_kg, notes, sleep_hours, sleep_score, steps, floors_climbed } = await request.json();

        if (!dateStr) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const date = new Date(dateStr);

        // Upsert weight log with sleep data
        const weightLog = await prisma.weight_logs.upsert({
            where: { date },
            update: {
                ...(weight_kg !== undefined && { weight_kg: parseFloat(weight_kg) }),
                ...(notes !== undefined && { notes: notes || null }),
                ...(sleep_hours !== undefined && { sleep_hours: sleep_hours ? parseFloat(sleep_hours) : null }),
                ...(sleep_score !== undefined && { sleep_score: sleep_score ? parseInt(sleep_score) : null }),
                ...(steps !== undefined && { steps: steps ? parseInt(steps) : null }),
                ...(floors_climbed !== undefined && { floors_climbed: floors_climbed ? parseInt(floors_climbed) : null })
            },
            create: {
                date,
                weight_kg: weight_kg ? parseFloat(weight_kg) : null,
                notes: notes || null,
                sleep_hours: sleep_hours ? parseFloat(sleep_hours) : null,
                sleep_score: sleep_score ? parseInt(sleep_score) : null,
                steps: steps ? parseInt(steps) : null,
                floors_climbed: floors_climbed ? parseInt(floors_climbed) : null
            }
        });

        return NextResponse.json({ success: true, data: weightLog });
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
    }
}
