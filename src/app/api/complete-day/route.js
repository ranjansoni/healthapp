import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const dbConfig = {
    uri: process.env.DATABASE_URL || process.env.MYSQL_URI
};

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date') || new Date().toISOString().split('T')[0];

    try {
        const connection = await mysql.createConnection(dbConfig.uri);

        // Check if day is completed
        const [completionRows] = await connection.execute(
            'SELECT * FROM daily_completion WHERE date = ?',
            [date]
        );

        // Get completion stats for the day
        const [routineItems] = await connection.execute(
            'SELECT COUNT(*) as total FROM routine_items'
        );

        const [completedItems] = await connection.execute(
            `SELECT COUNT(*) as completed 
             FROM daily_logs 
             WHERE date = ? AND status = 1`,
            [date]
        );

        // Check if required metrics are logged
        const [weightLogs] = await connection.execute(
            'SELECT weight_kg, sleep_hours, sleep_score, steps, floors_climbed FROM weight_logs WHERE date = ?',
            [date]
        );

        const metrics = weightLogs[0] || {};
        const missingMetrics = [];

        if (!metrics.weight_kg) missingMetrics.push('weight');
        if (!metrics.sleep_hours) missingMetrics.push('sleep_hours');
        if (!metrics.sleep_score) missingMetrics.push('sleep_score');
        if (!metrics.steps) missingMetrics.push('steps');

        const total = routineItems[0].total;
        const completed = completedItems[0].completed;
        const percentage = total > 0 ? (completed / total * 100).toFixed(2) : 0;

        await connection.end();

        return NextResponse.json({
            isCompleted: completionRows.length > 0,
            completion: completionRows[0] || null,
            stats: {
                total,
                completed,
                percentage: parseFloat(percentage)
            },
            missingMetrics,
            canComplete: missingMetrics.length === 0
        });

    } catch (error) {
        console.error('Error fetching completion status:', error);
        return NextResponse.json({ error: 'Failed to fetch completion status' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const { date, metrics } = await request.json();
        const connection = await mysql.createConnection(dbConfig.uri);

        // Validate required metrics
        if (!metrics.weight_kg || !metrics.sleep_hours || !metrics.sleep_score || !metrics.steps) {
            await connection.end();
            return NextResponse.json({
                error: 'Missing required metrics',
                required: ['weight_kg', 'sleep_hours', 'sleep_score', 'steps']
            }, { status: 400 });
        }

        // Save metrics to weight_logs
        await connection.execute(
            `INSERT INTO weight_logs (date, weight_kg, sleep_hours, sleep_score, steps, floors_climbed)
             VALUES (?, ?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE 
                weight_kg = VALUES(weight_kg),
                sleep_hours = VALUES(sleep_hours),
                sleep_score = VALUES(sleep_score),
                steps = VALUES(steps),
                floors_climbed = VALUES(floors_climbed)`,
            [date, metrics.weight_kg, metrics.sleep_hours, metrics.sleep_score, metrics.steps, metrics.floors_climbed || 0]
        );

        // Get completion stats
        const [routineItems] = await connection.execute(
            'SELECT COUNT(*) as total FROM routine_items'
        );

        const [completedItems] = await connection.execute(
            `SELECT COUNT(*) as completed 
             FROM daily_logs 
             WHERE date = ? AND status = 1`,
            [date]
        );

        const total = routineItems[0].total;
        const completed = completedItems[0].completed;
        const percentage = total > 0 ? (completed / total * 100).toFixed(2) : 0;

        // Mark day as complete
        await connection.execute(
            `INSERT INTO daily_completion (date, completed_at, completion_percentage, total_items, completed_items)
             VALUES (?, NOW(), ?, ?, ?)
             ON DUPLICATE KEY UPDATE 
                completed_at = NOW(),
                completion_percentage = VALUES(completion_percentage),
                total_items = VALUES(total_items),
                completed_items = VALUES(completed_items)`,
            [date, percentage, total, completed]
        );

        // Calculate streak
        const [streakResult] = await connection.execute(`
            SELECT COUNT(*) as streak
            FROM (
                SELECT date,
                       @streak := IF(@prev_date = DATE_SUB(date, INTERVAL 1 DAY), @streak + 1, 1) as current_streak,
                       @prev_date := date
                FROM daily_completion
                CROSS JOIN (SELECT @streak := 0, @prev_date := NULL) vars
                WHERE date <= ?
                ORDER BY date DESC
            ) as streak_calc
            WHERE current_streak = (SELECT MAX(current_streak) FROM (
                SELECT @s := IF(@p = DATE_SUB(date, INTERVAL 1 DAY), @s + 1, 1) as current_streak,
                       @p := date
                FROM daily_completion
                CROSS JOIN (SELECT @s := 0, @p := NULL) v
                WHERE date <= ?
                ORDER BY date DESC
            ) as max_streak)
        `, [date, date]);

        const streak = streakResult[0]?.streak || 1;

        await connection.end();

        return NextResponse.json({
            success: true,
            stats: {
                total,
                completed,
                percentage: parseFloat(percentage)
            },
            streak
        });

    } catch (error) {
        console.error('Error completing day:', error);
        return NextResponse.json({ error: 'Failed to complete day' }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const date = searchParams.get('date');

        if (!date) {
            return NextResponse.json({ error: 'Date is required' }, { status: 400 });
        }

        const connection = await mysql.createConnection(dbConfig.uri);

        // Delete completion record
        await connection.execute(
            'DELETE FROM daily_completion WHERE date = ?',
            [date]
        );

        await connection.end();

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Error resetting day:', error);
        return NextResponse.json({ error: 'Failed to reset day' }, { status: 500 });
    }
}
