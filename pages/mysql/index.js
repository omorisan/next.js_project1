const db = require('../../components/mysql');


export default async (req, res) => {
    const result = await db.query(
        `select * from users`
    );
    res.status(200).json({result })
}