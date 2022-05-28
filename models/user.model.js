const errorCode = require('../common/error.code');
const { errorResponse } = require('../common/response');

 module.exports = User = {
    isExistsUsername : async (username, conn) => {
        const sql = `SELECT count(*) AS count FROM users WHERE username = '${username}' GROUP BY 'username'`;
        const user = await conn.query(sql);
        if(result[0].length !== 0 && result[0][0].count > 0) {
            throw errorResponse(errorCode.EXISTS_USERNAME, `유저이름 중복여부 체크, ${username}`, 409);
        }
        return username;
    },
    isExistsUserId : async (id, conn) => {
        const sql = 'SELECT count(*) as count FROM users WHERE user_id = ? GROUP BY user_id';
        const [row, fields] = await conn.execute(sql, [id]);
        return row.length === 0? false: true
    },
    insertUser : async (username, password, conn) => {
        try{
            const sql = `INSERT INTO users (username, password, register_date, account) VALUES (?, ?, ?, ?)`;
            await conn.execute(sql, [username, password, new Date(), 0]);
            return username;
        } catch(err) {
            throw errorResponse(errorCode.UNKNOWN_ERROR, `회원가입 실패, ${username}`, 500);
        }
    },
    getUserById : async (userId, conn) => {
        const sql = `SELECT * FROM users WHERE user_id = ?`;
        const [rows, fields] = await conn.execute(sql, [userId]);
        if(rows.length === 0) {
            throw errorResponse(errorCode.NOT_FOUND_USER, `사용자가 없습니다. userId: ${userId}`, 404);
        }
        return rows;
    },
    getUserByUsername : async (username, conn) => {
        try{
            const sql = `SELECT * FROM users WHERE username = ?`;
            const [rows, fields] = await conn.execute(sql, [username]);
            if(rows.length === 0) {
                throw errorResponse(errorCode.NOT_FOUND_USER, `사용자가 없습니다. username: ${username}`, 404);
            }
            return rows[0];
        } catch(err) {
            throw err;
        }
    }
}