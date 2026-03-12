// import mysql from 'mysql2/promise';
// import 'dotenv/config';

// const db = await mysql.createConnection({
//     'host': process.env.DB_HOST || 'localhost',
//     'user': process.env.DB_USER || 'root',
//     'password': process.env.DB_PASSWORD || '',
//     'database': process.env.DB_NAME || 'mything',
//     'waitForConnections': true,
//     'port': process.env.DB_PORT || 3306,
//     'dateStrings': true,
// });


// db.connect(err => {
//     if (err) {
//         console.log('Database connection failed, please try again later');
//     }
//     else {
//         console.log('Database connection is successfull.');
//     }
// });

// export default db;

import pkg from 'pg';
import 'dotenv/config';

const { Pool } = pkg;

const db = new Pool({
    host: process.env.PG_HOST || 'localhost',
    user: process.env.PG_USER || 'rohiththummanapally',
    password: process.env.PG_PASSWORD || '',
    database: process.env.PG_DB || 'mything',
    port: process.env.PG_PORT || 5432,
    ssl: {
        rejectUnauthorized: false
    }
});

db.on('connect', () => {
    console.log('PostgreSQL connected');
});

db.on('error', (err) => {
    console.error('PostgreSQL connection error', err);
});

export default db;