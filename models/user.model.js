const errorCode = require('../common/error.code');
const { errorResponse } = require('../common/response');

/**
 *  
 * isExistsUsername
 * users 테이블에 사용자이름 중복여부를 확인합니다.
 * @param {중복여부를 알고싶은 users테이블의 username 필드} username 
 * 
 * insertUser
 * users 테이블에 새로운 사용자데이터를 추가합니다.
 * @returns signUp Result
 * 
 * getUser
 * @param {찾고싶은 사용자의 userId, number} userId 
 * @param {connection 객체} conn 
 * @returns userData
 */
const User = {
    isExistsUsername : async (username, conn) => {
        const sql = `SELECT count(*) AS count FROM users WHERE username = '${username}' GROUP BY 'username'`;
        const result = await conn.query(sql);
        if(result[0].length !== 0 && result[0][0].count > 0) {
            throw errorResponse({
                errorCode: errorCode.EXISTS_USERNAME,
                detail: `유저이름 중복여부 체크, ${username}`,
                httpStatus: 409
            });
        }
        return username;
    },
    insertUser : async (username, password, conn) => {
        try{
            const sql = `INSERT INTO users (username, password, register_date, account) VALUES (?, ?, ?, ?)`;
            await conn.execute(sql, [username, password, new Date(), 0]);
            return username;
        } catch(err) {
            throw errorResponse({
                errorCode : errorCode.UNKNOWN_ERROR,
                detail: `회원가입 실패, ${username}`,
                httpStatus: 500
            });
        }
    },
    getUserById : async (userId, conn) => {
        const sql = `SELECT * FROM users WHERE user_id = ?`;
        const [rows, fields] = await conn.execute(sql, [userId]);
        if(rows.length === 0) {
            throw errorResponse({
                errorCode: errorCode.NOT_FOUND_USER,
                detail: `사용자가 없습니다. userId: ${userId}`,
                httpStatus: 404
            });
        }
        return rows;
    },
    getUserByUsername : async (username, conn) => {
        try{
            const sql = `SELECT * FROM users WHERE username = ?`;
            const [rows, fields] = await conn.execute(sql, [username]);
            if(rows.length === 0) {
                throw errorResponse({
                    errorCode: errorCode.NOT_FOUND_USER,
                    detail: `사용자가 없습니다. username: ${username}`,
                    httpStatus: 404
                });
            }
            return rows[0];
        } catch(err) {
            throw err;
        }
    }
}

module.exports = User;