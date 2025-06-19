import express from "express";
import { Pool } from "pg";
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config() //loading env vars from .env

const app = express()

const port = process.env.PORT || 5000

app.use(cors()) //enable cors
app.use(express.json()) 

// PostgreSQL Pool
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'),
});

// testing db connection

pool.connect((err, client, done) => {
    if (err) {
        console.error('Database Connection Error - FULL DETAILS:');
        console.error('Error message:', err.message);
        console.error('Error stack:', err.stack);
        console.error('Connection config:', {
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            // Not logging password for security
        });
        return;
    }
    console.log("Database successfully connected");
    if (client) {
        client.release();
    }
});

// GET /expense endpoint: Fetch all expenses from DB

app.get('/expenses', async (req, res) => {
    try {
        // return all expenses ordered by date descending if not then id descending
        const result = await pool.query('SELECT * FROM expenses ORDER BY date DESC, id DESC')
        res.status(200) //set status code to 200 meaning OK
        res.json(result.rows)

    } catch (err: any) {
        console.error("error occured when fetching all", err.message)
        res.status(500).send("Server Error")

    }
})
// POST /expenses endpoint: Insert new expense

app.post('/expenses', async (req, res) => {
    try {
        const { description, amount } = req.body
        // insert new expense into the database, the values are passed as an array to prevent SQL injection 
        const result = await pool.query('INSERT INTO expenses (description, amount) VALUES ($1, $2) RETURNING *', [description, amount])
        res.status(201) //set status code to 201 meaning Created
        res.json(result.rows[0]) //return the newly created expense
    } catch (err: any) {
        console.error("error occured when adding new expense", err.message)
        res.status(500).send("Server Error")
    }
})

// Add process event listeners for debugging
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception - FULL ERROR DETAILS:');
    console.error('Error message:', err.message);
    console.error('Error stack:', err.stack);
    console.error('Error details:', JSON.stringify(err, null, 2));
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection - FULL DETAILS:');
    console.error('Promise:', promise);
    console.error('Reason:', reason);
    if (reason instanceof Error) {
        console.error('Error stack:', reason.stack);
    }
    process.exit(1);
});

process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT signal received: closing HTTP server');
    process.exit(0);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log('Environment variables loaded:', {
        PORT: process.env.PORT,
        DB_HOST: process.env.DB_HOST,
        DB_NAME: process.env.DB_NAME,
        DB_PORT: process.env.DB_PORT,
        DB_USER: process.env.DB_USER,
        // Not logging DB_PASSWORD for security
    });
    console.log('Server should stay running. Press Ctrl+C to stop.');
});
