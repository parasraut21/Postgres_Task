import { NextApiRequest, NextApiResponse } from "next";
import dbConnect, { pool } from "@/utils/dbConnect";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const result = await pool.query('SELECT * FROM wallet_addresses');
                res.status(200).json(result.rows);
            } catch (error) {
                res.status(500).json({ error: "Failed to fetch wallet addresses" });
            }
            break;
        case 'POST':
            try {
                const { user_id, address } = req.body;
                const result = await pool.query(
                    'INSERT INTO wallet_addresses (user_id, address) VALUES ($1, $2) RETURNING *',
                    [user_id, address]
                );
                res.status(201).json(result.rows[0]);
            } catch (error) {
                res.status(500).json({ error: "Failed to create wallet address" });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
