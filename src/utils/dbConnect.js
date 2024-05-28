import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

export default async function dbConnect() {
    try {
        const client = await pool.connect();
        await client.query("SELECT NOW()");
        client.release();
        console.log("Database connected successfully");
    } catch (err) {
        console.error("Error in connection", err.stack);
    }
}
