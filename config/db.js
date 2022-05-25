const mysql = require('mysql2/promise');
const dotenv = require('../config/index');

let pool = mysql.createPool({
    host: dotenv.DB.HOST,
    user: dotenv.DB.USER,
    password: dotenv.DB.PASSWORD,
    database: dotenv.DB.DATABASE,
    connectionLimit: 10
});

const getConnection = async () => {
    const conn = await pool.getConnection(async conn => conn);
    return conn;
}

module.exports = getConnection;