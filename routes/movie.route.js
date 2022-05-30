const router = require('express').Router();
const movieService = require('../services/movie.service');
const asyncWrapper = require('../middleware/route.async.wrapper');

router.route("/")
    .get(asyncWrapper(async (req, res) => {
        const movies = await movieService.getMoviesSummaryPage(req.query.page);
        res.status(200).send(movies);
    }))
router.route("/:id")
    .get(asyncWrapper(async (req, res)=>{
        const movie = await movieService.getMovieById(req.params.id);
        res.status(200).send(movie);
    }))
    .delete(asyncWrapper(async(req, res) => {
        await movieService.deleteMovieById(req.params.id);
        res.status(201).send();
    }))
module.exports = router;