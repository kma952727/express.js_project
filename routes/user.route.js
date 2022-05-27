const express = require('express');
const { param, validationResult } = require('express-validator');
const userService = require('../services/user.service');
const asyncWrapper = require('../middleware/route.async.wrapper');
const userDto = require('../dtos/user.dto');
const router = express.Router();

router.route('/')
    .post(
        asyncWrapper(async (req, res, next) => {
            const signUpResult = await userService.signUp(userDto.signUpRequest(req.body));
            res.status(signUpResult.httpStatus).json(signUpResult);
        })
    );

router.get('/:userId',
    asyncWrapper(async(req, res, next) => {
        const getUserRequest = userDto.getUserRequest(req.params);
        const userInfoResult = await userService.getUserInfo(getUserRequest);
        res.status(userInfoResult.httpStatus).json(userInfoResult);
    })
);
module.exports = router;