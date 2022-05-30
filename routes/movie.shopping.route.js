const router = require('express').Router();
const movieDTO = require('../dto/movie.dto');
const asyncWrapper = require('../middleware/route.async.wrapper');
const movieShoppingService = require('../services/movie.shopping.service');

router.route('/movie-carts/items')
    .post(asyncWrapper(async(req, res) => {
        const addToCartRequest = movieDTO.addToCartRequest(req.body.movieId, req.user.userId);
        await movieShoppingService.addToCart(addToCartRequest);
        res.status(201).send();
    }));

router.route('/movie-carts/items/:itemId')
    .delete(asyncWrapper(async(req, res)=> {
        const removeAtCartRequest = movieDTO.removeAtCartRequest(req.params.itemId, req.user.userId);
        await movieShoppingService.removeMovieAtCart(removeAtCartRequest);
        res.status(201).send();
    }));

module.exports = router;