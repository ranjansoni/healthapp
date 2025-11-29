const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

// Manually load .env.local
const envPath = path.resolve(__dirname, '../.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const mysqlUri = envContent.match(/MYSQL_URI="?(.+?)"?\s*$/m)?.[1];

if (!mysqlUri) {
    console.error('MYSQL_URI not found in .env.local');
    process.exit(1);
}

async function migrate() {
    const connection = await mysql.createConnection(mysqlUri);

    try {
        console.log('Adding sleep tracking columns to weight_logs table...');

        // Add sleep_hours column
        try {
            await connection.execute(`
        ALTER TABLE weight_logs 
        ADD COLUMN sleep_hours DECIMAL(3,1) NULL COMMENT 'Actual sleep hours'
      `);
            console.log('✓ Added sleep_hours column');
        } catch (error) {
            if (error.code === 'ER_DUP_FIELDNAME') {
                console.log('- sleep_hours column already exists');
            } else {
                throw error;
            }
        }

        // Add sleep_score column
        try {
            await connection.execute(`
        ALTER TABLE weight_logs 
        ADD COLUMN sleep_score INT NULL COMMENT 'Sleep quality score (0-100)'
      `);
            console.log('✓ Added sleep_score column');
        } catch (error) {
            if (error.code === 'ER_DUP_FIELDNAME') {
                console.log('- sleep_score column already exists');
            } else {
                throw error;
            }
        }

        console.log('✓ Sleep tracking migration completed successfully');

    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    } finally {
        await connection.end();
    }
}

migrate();
