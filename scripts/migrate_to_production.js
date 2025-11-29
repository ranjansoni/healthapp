const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

// Load local database connection
const envPath = path.resolve(__dirname, '../.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const localUri = envContent.match(/MYSQL_URI="?(.+?)"?\s*$/m)?.[1];

// Production database connection
const prodUri = "mysql://admin:Demo$%23123@bennett-websites.cpwtalwthzlk.us-east-1.rds.amazonaws.com:3306/dietplan";

async function migrate() {
    console.log('🔄 Starting data migration...\n');

    // Connect to both databases
    const localConn = await mysql.createConnection(localUri);
    const prodConn = await mysql.createConnection(prodUri);

    try {
        // Get all daily logs from local
        const [localLogs] = await localConn.execute(
            'SELECT date, routine_item_id, status, notes FROM daily_logs ORDER BY date'
        );
        console.log(`📊 Found ${localLogs.length} daily log entries in local database`);

        // Get all weight logs from local
        const [localWeights] = await localConn.execute(
            'SELECT date, weight_kg, notes, sleep_hours, sleep_score, steps, floors_climbed FROM weight_logs ORDER BY date'
        );
        console.log(`⚖️  Found ${localWeights.length} weight log entries in local database\n`);

        // Migrate daily logs
        let logsInserted = 0;
        for (const log of localLogs) {
            try {
                await prodConn.execute(
                    `INSERT INTO daily_logs (date, routine_item_id, status, notes) 
           VALUES (?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE status = VALUES(status), notes = VALUES(notes)`,
                    [log.date, log.routine_item_id, log.status, log.notes]
                );
                logsInserted++;
            } catch (err) {
                console.log(`⚠️  Skipped log for item ${log.routine_item_id} on ${log.date}: ${err.message}`);
            }
        }
        console.log(`✅ Migrated ${logsInserted} daily log entries`);

        // Migrate weight logs
        let weightsInserted = 0;
        for (const weight of localWeights) {
            try {
                await prodConn.execute(
                    `INSERT INTO weight_logs (date, weight_kg, notes, sleep_hours, sleep_score, steps, floors_climbed) 
           VALUES (?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE 
             weight_kg = VALUES(weight_kg),
             notes = VALUES(notes),
             sleep_hours = VALUES(sleep_hours),
             sleep_score = VALUES(sleep_score),
             steps = VALUES(steps),
             floors_climbed = VALUES(floors_climbed)`,
                    [weight.date, weight.weight_kg, weight.notes, weight.sleep_hours, weight.sleep_score, weight.steps, weight.floors_climbed]
                );
                weightsInserted++;
            } catch (err) {
                console.log(`⚠️  Skipped weight log for ${weight.date}: ${err.message}`);
            }
        }
        console.log(`✅ Migrated ${weightsInserted} weight log entries`);

        console.log('\n🎉 Migration completed successfully!');

    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    } finally {
        await localConn.end();
        await prodConn.end();
    }
}

migrate();
