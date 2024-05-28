import { NextApiRequest, NextApiResponse } from "next";
import dbConnect, { pool } from "@/utils/dbConnect";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const result = await pool.query('SELECT * FROM users');
                res.status(200).json(result.rows);
            } catch (error) {
                res.status(500).json({ error: "Failed to fetch users" });
            }
            break;
        case 'POST':
            try {
                const { name, email, password } = req.body;
                const result = await pool.query(
                    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
                    [name, email, password]
                );
                res.status(201).json(result.rows[0]);
            } catch (error) {
                res.status(500).json({ error: "Failed to create user" });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
