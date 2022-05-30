const getConnection = require('../config/db');
const hashData = require('../common/encoder.provider');
const User = require('../models/user.model');
const { successResponse, errorResponse } = require('../common/response');
const { userDetail } = require('../dto/user.dto');
const errorCode = require('../common/error.code');

module.exports = userService = {
    signUp : async (signUpRequest) => {
        const conn = await getConnection();
        try{
            conn.beginTransaction();
            await User.isExistsUsername(signUpRequest.username, conn);
            const hashedPassword = await hashData(signUpRequest.password);
            const signUpUserData = await User.insertUser(signUpRequest, hashedPassword, conn);
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
            return successResponse(userDetail(user));
        } catch (err) {
            throw err;
        } finally {
            conn.release();
        }
    },
    updateUser: async (updateRequest) => {
        const conn = await getConnection();
        try{
            if(await User.isExistsMail(updateRequest.mail, conn)) {
                throw errorResponse(errorCode.EXISTS_MAIL, `중복된 메일: ${updateRequest.mail}`, 409)
            }
            await User.updateUser(updateRequest, conn);
        } catch (err) {
            throw err;
        } finally {
            conn.release();
        }
    }
}