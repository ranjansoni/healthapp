const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

// Manually set DATABASE_URL if it's not set but MYSQL_URI is
if (!process.env.DATABASE_URL && process.env.MYSQL_URI) {
    process.env.DATABASE_URL = process.env.MYSQL_URI;
}

const prisma = new PrismaClient();

async function main() {
    try {
        console.log('Connecting to database...');
        const items = await prisma.routine_items.findMany({
            take: 1
        });
        console.log('Successfully connected!');
        console.log('Fetched item:', items);
    } catch (error) {
        console.error('Error connecting to database:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
