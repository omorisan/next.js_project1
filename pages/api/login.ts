
import type { NextApiRequest, NextApiResponse } from 'next'
const db = require('../../lib/mysql')
const escape = require('sql-template-strings')

type PostData = {
    email: string;
    password: string;
}

type QueryResult = {
    loginResult: boolean
}


export default async (req: NextApiRequest, res: NextApiResponse<QueryResult>) => {
    const postData: PostData = req.body;
    const queryResult = await db.query(escape`
    SELECT
        COUNT (USER_ID) AS count
    FROM
        USERLIST
    WHERE
        EMAIL = ${postData.email}
        AND PASSWORD = ${postData.password}
    `)

    res.status(200).json({ loginResult: 0 < queryResult[0].count ? true : false });
}
