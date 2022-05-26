const express = require('express');
const userService = require('../services/user.service');
const userDto = require('../dtos/user.dto');
const router = express.Router();

// error handler
function wrapAsync(fn) {
    return function(req, res, next) {
        fn(req, res, next).catch(next);
    }
}

router.get('/:userId', 
    wrapAsync(async(req, res, next) => {
        const getUserRequest = userDto.getUserRequest(req.params);
        const userInfoResult = await userService.getUserInfo(getUserRequest);
        res.status(userInfoResult.data.httpStatus).send(userInfoResult);
    })
);
router.post('/',
    wrapAsync(async (req, res, next) => {
        const signUpResult = await userService.signUp(userDto.signUpRequest(req.body));
        res.status(signUpResult.data.httpStatus).send(signUpResult);
    }));
    
router.use((err, req, res, next) => {
    res.status(err.httpStatus).send(err);
});

module.exports = router;