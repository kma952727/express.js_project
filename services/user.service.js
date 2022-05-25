const getConnection = require('../config/db');
const hashData = require('../common/encoder.provider');
const userRepo = require('../models/user.model');
const response = require('../common/response');

/**
 * 사용자의 가입신청을 처리합니다.
 * 
 * @param {가입내용} signUpRequest 
 * @returns 
 */
const signUp = async (signUpRequest) => {
    let conn;
    try{
        conn = await getConnection();
        conn.beginTransaction();
        await userRepo.isExistsUsername(signUpRequest.username, conn);
        const hashedPassword = await hashData(signUpRequest.password);
        const signUpUserData = await userRepo.insertUser(signUpRequest.username, hashedPassword, conn);
        conn.commit();
        return response.successDto(signUpUserData);
    } catch(err) {
        console.log(err);
        conn.rollback();
        return response.failedDto(err);
    } finally {
        conn.release();
    }
}

/**
 * useId를 기준으로 users테이블의 데이터를 조회합니다.
 * 
 * @param {찾고싶은 user의 userId} getUserRequest 
 * @returns 사용자 데이터
 */
const getUserInfo = async (getUserRequest) => {
    let conn;
    try{
        conn = await getConnection();
        const user = await userRepo.getUser(getUserRequest.userId, conn);
        return response.successDto(user);
    } catch (err) {
        return response.failedDto(err);
    } finally {
        conn.release();
    }
}

module.exports = { signUp, getUserInfo }