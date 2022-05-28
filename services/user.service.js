const getConnection = require('../config/db');
const hashData = require('../common/encoder.provider');
const User = require('../models/user.model');
const { successResponse } = require('../common/response');

module.exports = userService = {
    signUp : async (signUpRequest) => {
        const conn = await getConnection();
        try{
            conn.beginTransaction();
            const notExistsUsername = await User.isExistsUsername(signUpRequest.username, conn);
            const hashedPassword = await hashData(signUpRequest.password);
            const signUpUserData = await User.insertUser(notExistsUsername, hashedPassword, conn);
            conn.commit();
            return successResponse(signUpUserData);
        } catch(err) {
            conn.rollback();
            throw err;
        } finally {
            conn.release();
        }
    },
    getUserInfo : async (getUserRequest) => {
        const conn = await getConnection();
        try{
            const user = await User.getUserById(getUserRequest.userId, conn);
            return successResponse(user);
        } catch (err) {
            throw err;
        } finally {
            conn.release();
        }
    }
}