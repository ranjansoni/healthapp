const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

// Load database connection from .env.local
const envPath = path.resolve(__dirname, '../.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const dbUri = envContent.match(/MYSQL_URI="?(.+?)"?\s*$/m)?.[1];

async function migrate() {
    console.log('🔄 Adding daily_completion table...\n');

    const connection = await mysql.createConnection(dbUri);

    try {
        // Create daily_completion table
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS daily_completion (
                id INT AUTO_INCREMENT PRIMARY KEY,
                date DATE NOT NULL UNIQUE,
                completed_at DATETIME NOT NULL,
                completion_percentage DECIMAL(5,2) NOT NULL,
                total_items INT NOT NULL,
                completed_items INT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                INDEX idx_date (date)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        `);

        console.log('✅ Created daily_completion table');

        // Check if table was created
        const [tables] = await connection.execute(
            "SHOW TABLES LIKE 'daily_completion'"
        );

        if (tables.length > 0) {
            console.log('✅ Table verified successfully\n');
        } else {
            throw new Error('Table creation failed');
        }

    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    } finally {
        await connection.end();
    }

    console.log('🎉 Migration completed successfully!');
}

migrate();
