const { Client } = require('pg');
require('dotenv').config();

async function test() {
    console.log("DATABASE_URL:", process.env.DATABASE_URL);
    const clients = [
        new Client({ connectionString: process.env.DATABASE_URL }),
        new Client({ host: '127.0.0.1', port: 5432, user: 'postgres', password: 'root', database: 'postgres' }),
        new Client({ host: 'localhost', port: 5432, user: 'postgres', password: 'root', database: 'postgres' })
    ];

    for (let i = 0; i < clients.length; i++) {
        console.log(`\nTesting client ${i+1}...`);
        try {
            await clients[i].connect();
            console.log(`Client ${i+1} connected successfully!`);
            const res = await clients[i].query('SELECT version()');
            console.log('Version:', res.rows[0].version);
            await clients[i].end();
        } catch (err) {
            console.error(`Client ${i+1} failed:`, err.message);
        }
    }
}

test();
