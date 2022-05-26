const express = require('express');
const { param, validationResult } = require('express-validator');
const userService = require('../services/user.service');
const userDto = require('../dtos/user.dto');
const { errorResponse } = require('../common/response');
const errorCode = require('../common/error.code');
const router = express.Router();

// Error Handler
function wrapAsync(fn) {
    return function(req, res, next) {
        fn(req, res, next).catch(next);
    }
}

router.get('/:userId',
    param('userId').isLength({ max : 6 }), 
    wrapAsync(async(req, res, next) => {
        if(validationResult(req)) throw errorResponse(
            {errorCode: errorCode.INVALID_REQUEST_DATA, detail : 'invalid param!', httpStatus:400}
        );
        const getUserRequest = userDto.getUserRequest(req.params);
        const userInfoResult = await userService.getUserInfo(getUserRequest);
        res.status(userInfoResult.httpStatus).json(userInfoResult);
    })
);

router.route('/')
    .post(
    wrapAsync(async (req, res, next) => {
        const signUpResult = await userService.signUp(userDto.signUpRequest(req.body));
        res.status(signUpResult.httpStatus).json(signUpResult);
    }));
    
router.use((err, req, res, next) => {
    res.status(err.httpStatus).send(err);
});

module.exports = router;