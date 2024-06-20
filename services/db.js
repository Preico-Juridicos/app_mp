const mysql = require('mysql2/promise');
const config = require('../config');

let pool;

async function getConnection() {
    if (!pool) {
        pool = mysql.createPool(config.db);
    }
    return await pool.getConnection();
}

async function query(sql, params) {
    const connection = await getConnection();
    try {
        const [results,] = await connection.execute(sql, params);
        return results;
    } finally {
        connection.release(); // release the connection back to the pool
    }
}

module.exports = {
    query
};
