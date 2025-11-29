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
        console.log('Adding activity tracking columns to weight_logs table...');

        // Add steps column
        try {
            await connection.execute(`
        ALTER TABLE weight_logs 
        ADD COLUMN steps INT NULL COMMENT 'Daily step count'
      `);
            console.log('✓ Added steps column');
        } catch (error) {
            if (error.code === 'ER_DUP_FIELDNAME') {
                console.log('- steps column already exists');
            } else {
                throw error;
            }
        }

        // Add floors_climbed column
        try {
            await connection.execute(`
        ALTER TABLE weight_logs 
        ADD COLUMN floors_climbed INT NULL COMMENT 'Floors climbed count'
      `);
            console.log('✓ Added floors_climbed column');
        } catch (error) {
            if (error.code === 'ER_DUP_FIELDNAME') {
                console.log('- floors_climbed column already exists');
            } else {
                throw error;
            }
        }

        console.log('✓ Activity tracking migration completed successfully');

    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    } finally {
        await connection.end();
    }
}

migrate();
