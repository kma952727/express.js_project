const Movie = require('../models/movie.model');
const getConnection = require('../config/db');
const {movieSummary, movieDetail} = require('../dtos/movie.dto');

module.exports = movieService = {
    getMoviesSummaryPage: async (page) => {
        const conn = await getConnection();
        try{
            const movies = await Movie.getMoviesPage(page, conn);
            return movies.map(movie => movieSummary(movie));
        } catch(err) {
            throw err;
        }finally{
            conn.release();
        }
    },
    getMovieById: async (id) => {
        const conn = await getConnection();
        try{
            const movie = await Movie.getMovieById(id, conn);
            return movieDetail(movie);
        } catch(err) {
            throw err;
        }finally{
            conn.release();
        }
    }
}