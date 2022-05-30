const passport = require('passport');
const { errorResponse, successResponse } = require('../common/response');
const errorCode = require('../common/error.code');
const jwtProvider = require('../common/jwt.provider');
const { userDetail } = require('../dto/user.dto');

/**
 * passport 기능제공
 * 
 * verifiedJWT : auth token을 유효성을 검사합니다.
 * login : 서비스에서의 로그인 기능을 제공합니다.
 * 
 */
module.exports = passportProvider = {
    verifiedJWT : (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (...args) => {
            if(args[1] === false) {
                next(errorResponse(errorCode.DECODED_TOKEN_FAILED, 'invalid Token!', 401));
            } else {
                req.user = userDetail(args[1]);
                next();
            }
            })(req, res, next);
    },
    login : (req, res, next) => {
        passport.authenticate('login', async (error, user, isSuccess) => {  
            if(isSuccess) {
                const [access, refresh] = await jwtProvider.generateToken(user.user_id);
                res.status(200).send(successResponse({access, refresh}));
            }else {
                res.status(400)
                    .json(errorResponse({errorCode: errorCode.GENERATE_TOKEN_FAILED, detail: '로그인 실패', httpStatus: 400}));
            }
        })(req, res, next);    
    }

}