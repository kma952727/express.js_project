const router = require('express').Router();
const userService = require('../services/user.service');
const asyncWrapper = require('../middleware/route.async.wrapper');
const userDTO = require('../dto/user.dto');
const { buyMovieRequest } = require('../dto/movie.dto');

router.route('/')
    .get(asyncWrapper(async(req, res) => {
            const getUserRequest = userDTO.getUserRequest(req.user);
            const userInfoResult = await userService.getUserInfo(getUserRequest);
            res.status(userInfoResult.httpStatus).json(userInfoResult);
        })
    )
    .post(asyncWrapper(async (req, res) => {
            const signUpResult = await userService.signUp(userDTO.signUpRequest(req.body));
            res.status(signUpResult.httpStatus).send(signUpResult);
        })
    )
    .put(asyncWrapper( async(req, res) => {
        const updateRequest = userDTO.updateRequest(req.body, req.user.userId);
        await userService.updateUser(updateRequest);
        res.status(201).send();
    })
);
module.exports = router;