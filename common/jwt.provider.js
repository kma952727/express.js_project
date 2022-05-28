const jwt = require('jsonwebtoken');
const errorCode = require('./error.code');
const getConnection = require('../config/db');
const User = require('../models/user.model');
require('dotenv').config();

const key = process.env.JWT_SECRET_KEY;

module.exports = jwtProvider = {
    generateToken : async (userID) => {
        try{
            const [ access, refresh ] = await Promise.all([ 
                jwt.sign( { userID }, key, { expiresIn: 500 * 60 } ),
                jwt.sign( { userID }, key, { expiresIn: 500 * 60 } )
            ]);
            return [ access, refresh ];
        } catch(err) {
            throw err;
        }
    },
    isVerifiedToken : async (accessToken, refreshToken) => {
        let isSuccess, errorData, message, httpStatus;
        const conn = await getConnection();
        try{
            const destructureToken = jwt.verify(accessToken.replaceAll(`"`,""), key);
            await User.getUserById(destructureToken.userID, conn);
            if (jwt.verify(accessToken.replaceAll(`"`,""), key) !== null && jwt.verify(refreshToken.replaceAll(`"`,""), key) !== null){
                isSuccess = true;
            }
        }catch(err) {
            console.log(err)
            isSuccess = false; 
            switch(err.name) {
                case 'TokenExpiredError':
                    errorData = errorCode.TOKEN_EXPIRED;
                    message = 'expired!';
                    httpStatus = 400;
                    break;
                default:
                    errorData = errorCode.UNKNOWN_ERROR;
                    message = 'unknown ;)';
                    httpStatus = 400 
            };
        }finally {
            conn.release();
            return {isSuccess, errorData, message, httpStatus};
        }
    }
}
