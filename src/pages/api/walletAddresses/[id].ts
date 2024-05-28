import { NextApiRequest, NextApiResponse } from "next";
import dbConnect, { pool } from "@/utils/dbConnect";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const { id } = req.query;

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const result = await pool.query('SELECT * FROM wallet_addresses WHERE id = $1', [id]);
                if (result.rows.length === 0) {
                    res.status(404).json({ error: "Wallet address not found" });
                } else {
                    res.status(200).json(result.rows[0]);
                }
            } catch (error) {
                res.status(500).json({ error: "Failed to fetch wallet address" });
            }
            break;
        case 'PUT':
            try {
                const { user_id, address } = req.body;
                const result = await pool.query(
                    'UPDATE wallet_addresses SET user_id = $1, address = $2 WHERE id = $3 RETURNING *',
                    [user_id, address, id]
                );
                res.status(200).json(result.rows[0]);
            } catch (error) {
                res.status(500).json({ error: "Failed to update wallet address" });
            }
            break;
        case 'DELETE':
            try {
                await pool.query('DELETE FROM wallet_addresses WHERE id = $1', [id]);
                res.status(204).end();
            } catch (error) {
                res.status(500).json({ error: "Failed to delete wallet address" });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
