const router = require('express').Router();
const userService = require('../services/user.service');
const asyncWrapper = require('../middleware/route.async.wrapper');
const userDTO = require('../dtos/user.dto');

router.post('/', asyncWrapper(async (req, res) => {
        const signUpResult = await userService.signUp(userDTO.signUpRequest(req.body));
        res.status(signUpResult.httpStatus).json(signUpResult);
    })
);
router.get('/:userId', asyncWrapper(async(req, res) => {
        const getUserRequest = userDTO.getUserRequest(req.params);
        const userInfoResult = await userService.getUserInfo(getUserRequest);
        res.status(userInfoResult.httpStatus).json(userInfoResult);
    })
);
module.exports = router;