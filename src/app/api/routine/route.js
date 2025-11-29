import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
    try {
        const { time_of_day, description, category, valid_from } = await request.json();

        if (!time_of_day || !description || !category || !valid_from) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Generate a new series_id
        const series_id = `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const validFromDate = new Date(valid_from);

        await prisma.routine_items.create({
            data: {
                series_id,
                time_of_day,
                description,
                category,
                valid_from: validFromDate,
                valid_to: new Date('9999-12-31')
            }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Failed to add item' }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        const { id, time_of_day, valid_from } = await request.json();

        if (!id || !time_of_day || !valid_from) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const currentItem = await prisma.routine_items.findUnique({
            where: { id }
        });

        if (!currentItem) {
            return NextResponse.json({ error: 'Item not found' }, { status: 404 });
        }

        // 1. Expire the current item the day before valid_from
        const expiryDate = new Date(valid_from);
        expiryDate.setDate(expiryDate.getDate() - 1);

        await prisma.routine_items.update({
            where: { id },
            data: { valid_to: expiryDate }
        });

        // 2. Create a new item with the new time
        await prisma.routine_items.create({
            data: {
                series_id: currentItem.series_id,
                time_of_day: time_of_day,
                description: currentItem.description,
                category: currentItem.category,
                valid_from: new Date(valid_from),
                valid_to: new Date('9999-12-31')
            }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const { id, valid_from } = await request.json();

        if (!id || !valid_from) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const expiryDate = new Date(valid_from);
        expiryDate.setDate(expiryDate.getDate() - 1);

        await prisma.routine_items.update({
            where: { id },
            data: { valid_to: expiryDate }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Failed to remove item' }, { status: 500 });
    }
}
