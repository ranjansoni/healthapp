const mysql = require('mysql2/promise');
const path = require('path');
const fs = require('fs');

// Manually load .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf8');
    envConfig.split('\n').forEach(line => {
        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) {
            const key = match[1].trim();
            const value = match[2].trim().replace(/^["']|["']$/g, ''); // Remove quotes if present
            process.env[key] = value;
        }
    });
}

async function migrate() {
    if (!process.env.MYSQL_URI) {
        console.error('MYSQL_URI is not defined in .env.local');
        process.exit(1);
    }

    const connection = await mysql.createConnection({
        uri: process.env.MYSQL_URI,
        multipleStatements: true
    });

    try {
        console.log('Starting migration...');

        // 1. Add new columns if they don't exist

        const [columns] = await connection.query(`
      SELECT COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = DATABASE() 
      AND TABLE_NAME = 'routine_items'
    `);

        const columnNames = columns.map(c => c.COLUMN_NAME);

        if (!columnNames.includes('valid_from')) {
            console.log('Adding valid_from column...');
            await connection.query(`ALTER TABLE routine_items ADD COLUMN valid_from DATE DEFAULT '2023-01-01'`);
        }

        if (!columnNames.includes('valid_to')) {
            console.log('Adding valid_to column...');
            await connection.query(`ALTER TABLE routine_items ADD COLUMN valid_to DATE DEFAULT '9999-12-31'`);
        }

        if (!columnNames.includes('series_id')) {
            console.log('Adding series_id column...');
            await connection.query(`ALTER TABLE routine_items ADD COLUMN series_id VARCHAR(36)`);

            // Populate series_id for existing items
            console.log('Populating series_id for existing items...');

            const [rows] = await connection.query('SELECT id FROM routine_items WHERE series_id IS NULL');
            for (const row of rows) {
                // Simple unique string based on ID + random
                const seriesId = `item_${row.id}_${Math.random().toString(36).substr(2, 9)}`;
                await connection.query('UPDATE routine_items SET series_id = ? WHERE id = ?', [seriesId, row.id]);
            }
        }

        console.log('Migration completed successfully.');
    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        await connection.end();
    }
}

migrate();
