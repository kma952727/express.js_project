const jwt = require('jsonwebtoken');
const errorCode = require('./error.code');
const getConnection = require('../config/db');
const User = require('../models/user.model');
require('dotenv').config();

const key = process.env.JWT_SECRET_KEY;

module.exports = jwtProvider = {
    generateToken : async (userID) => {
        try{
            const access =  await jwt.sign( { userID }, key, { expiresIn: 30 * 60 } );
            const refresh = await jwt.sign( { userID }, key, { expiresIn: 360 * 60 } );
            return [ access, refresh ];
        } catch(err) {
            throw err;
        }
    },
    isVerifiedToken : async (accessToken, refreshToken) => {
        let isSuccess, errorData, message, httpStatus;
        const conn = await getConnection();
    
        try{
            const destructureToken = jwt.verify(accessToken, key);
            await User.getUserById(destructureToken.userID, conn);
            if (jwt.verify(accessToken, key) !== null && jwt.verify(refreshToken, key) !== null)
                isSuccess = true;
        }catch(err) {
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
