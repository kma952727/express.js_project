const express = require('express');
const userService = require('../services/user.service');
const userDto = require('../dtos/user.dto');
const router = express.Router();

router.get('/:userId', async(req, res, next) => {
    const getUserRequest = userDto.getUserRequest(req.params);
    const userInfoResult = await userService.getUserInfo(getUserRequest);
    res.status(userInfoResult.data.httpStatus).send(userInfoResult);
});
router.post('/', async (req, res, next) => {
    const signUpResult = await userService.signUp(userDto.signUpRequest(req.body));
    res.status(signUpResult.data.httpStatus).send(signUpResult);
});
router.use((err, req, res, next) => {
    
});
module.exports = router;