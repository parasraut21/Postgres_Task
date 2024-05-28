import { NextApiRequest, NextApiResponse } from "next";
import dbConnect, { pool } from "@/utils/dbConnect";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const { id } = req.query;

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
                if (result.rows.length === 0) {
                    res.status(404).json({ error: "User not found" });
                } else {
                    res.status(200).json(result.rows[0]);
                }
            } catch (error) {
                res.status(500).json({ error: "Failed to fetch user" });
            }
            break;
        case 'PUT':
            try {
                const { name, email, password } = req.body;
                const result = await pool.query(
                    'UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *',
                    [name, email, password, id]
                );
                res.status(200).json(result.rows[0]);
            } catch (error) {
                res.status(500).json({ error: "Failed to update user" });
            }
            break;
        case 'DELETE':
            try {
                await pool.query('DELETE FROM users WHERE id = $1', [id]);
                res.status(204).end();
            } catch (error) {
                res.status(500).json({ error: "Failed to delete user" });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
