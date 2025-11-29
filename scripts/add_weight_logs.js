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
        console.log('Creating weight_logs table...');

        await connection.execute(`
      CREATE TABLE IF NOT EXISTS weight_logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        date DATE NOT NULL UNIQUE,
        weight_kg DECIMAL(5,2) NOT NULL,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

        console.log('✓ weight_logs table created successfully');

    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    } finally {
        await connection.end();
    }
}

migrate();
