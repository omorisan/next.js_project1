const mysql = require('serverless-mysql'); //エスケープ
require('date-utils'); //日時簡単取得


const db = mysql({
    config: {
        host: process.env.MYSQL_HOST,
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD
    }
})

//クエリログ書き出し
const queryLogWrite = (query, values) => {
    const fs = require("fs");　//ファイル書き出しモジュール
    let now = new Date();
    let excuteQuery = '\n' + now.toFormat('YYYY/MM/DD DDD HH:MI:SS') + query;
    values.forEach(data => {
        excuteQuery = excuteQuery.replace('?', data)
    })
    //書き込み
    fs.appendFile("log/query.log", excuteQuery, (err) => {
        if (err) throw err;
        //正常処理
    });
}

exports.query = async SQL => {
    try {
        //ログ書き出し
        queryLogWrite(SQL.query, SQL.values);

        const results = await db.query(SQL)
        await db.end()
        return results
    } catch (error) {
        return { error }
    }
}