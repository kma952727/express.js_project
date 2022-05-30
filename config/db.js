const mysql = require('mysql2/promise');
const dotenv = require('./env');

let pool = mysql.createPool({
    host: dotenv.DB.HOST,
    user: dotenv.DB.USER,
    password: dotenv.DB.PASSWORD,
    database: dotenv.DB.DATABASE,
    connectionLimit: 10
});

module.exports = async () => await pool.getConnection(async conn => conn);