const express = require('express');
const userService = require('../services/user.service');
const userDto = require('../dtos/user.dto');
const router = express.Router();

router.get('/:userId', async(req, res) => {
    const getUserRequest = userDto.getUserRequest(req.params);
    const userInfoResult = await userService.getUserInfo(getUserRequest);
    res.status(userInfoResult.data.httpStatus).send(userInfoResult);
});
router.post('/', async (req, res) => {
    const signUpResult = await userService.signUp(userDto.signUpRequest(req.body));
    res.status(signUpResult.data.httpStatus).send(signUpResult);
});
module.exports = router;