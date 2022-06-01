const mysql = require('mysql2/promise');
const dotenv = require('./env');

let pool;
try{
    pool = mysql.createPool({
    host: dotenv.DB.HOST,
    user: dotenv.DB.USER,
    password: dotenv.DB.PASSWORD,
    database: dotenv.DB.DATABASE,
    connectionLimit: 10
});
}catch(err){
    console.error(err);
}

module.exports = async () => await pool.getConnection(async conn => conn);