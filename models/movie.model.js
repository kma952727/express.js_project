const { errorResponse } = require("../common/response");
const { NOT_FOUND_MOVIE } = require("../common/error.code");

module.exports = Movie = {
    getMoviesPage: async (requestPageNum, conn) => {
        const perPage = 5;
        const pageNum = Number(requestPageNum) * perPage;
        try{
            const sql = `SELECT M.* FROM (
                SELECT * FROM movie
                ORDER BY movie_id asc
            )as M LIMIT ${perPage} OFFSET ${pageNum}`;
            const [rows, fields] = await conn.execute(sql);
            return rows;
        }catch(err) {
            throw err;
        }
    },
    getMovieDetailInfo: async() => {
        try{
            const sql = `
            
            `;
        }catch(err){

        }finally{}
    },
    getMovieById: async (id, conn) => {
        try{
            const sql = `SELECT * FROM movie WHERE movie_id = ${id}`;
            const [rows, fields] = await conn.execute(sql);
            if(rows.length === 0) {
                throw errorResponse(NOT_FOUND_MOVIE, `Not Exists Movie_id ${id}`, 404 );
            } else {
                return rows[0];
            }
        }catch(err) {
            throw err;
        }
    }
}