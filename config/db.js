const mysql = require('mysql2/promise');
     
let pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '010203',
    database: 'movies',
    connectionLimit: 10
});

const getConnection = async () => {
    const conn = await pool.getConnection(async conn => conn);
    return conn;
}
module.exports = getConnection;