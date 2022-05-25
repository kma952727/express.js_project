const bcrypt = require('bcrypt');
const errorCode = require('./error.code');
const { errorDto } = require('./response');

/**
 * 데이터 1개를 받아 암호화합니다.
 * 
 * @param {평문의 데이터} plainData 
 * @returns 암호화된 데이터
 */
const hashData = async (plainData) => {
    const saltRounds = 5;
    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(plainData, saltRounds, (err, hash) => {
            if(err) {
                reject(errorDto({
                    errorCode: errorCode.HASH_FAILED,
                    detail: `암호화에 실패하였습니다.`,
                    httpStatus: 500
                }));
            }
            resolve(hash);
        })
    });
    return hashedPassword;
}
module.exports = hashData