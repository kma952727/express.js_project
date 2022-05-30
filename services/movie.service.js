const Movie = require('../models/movie.model');
const getConnection = require('../config/db');
const {movieSummary, movieDetail} = require('../dto/movie.dto');

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
    getMovieDetailInfo: async (id) => {
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
    },
    deleteMovieById: async (id) => {
        const conn = await getConnection();
        try{
            conn.beginTransaction();
                await Movie.deleteMovieById(id, conn);
            conn.commit();
        }catch(err) {
            conn.rollback();
            throw err;
        }finally {
            conn.release();
        }
    }
}