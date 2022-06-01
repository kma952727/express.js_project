const { errorResponse } = require("../common/response");
const { NOT_FOUND_MOVIE } = require("../common/error.code");
const errorCode = require("../common/error.code");

module.exports = Movie = {
    getMoviesPage: async (requestPageNum, conn) => {
        const perPage = 5;
        const pageNum = Number(requestPageNum) * perPage;
        try{
            const sql = `SELECT M.* FROM (
                SELECT * FROM movie
                ORDER BY movie_id desc
            )as M LIMIT ${perPage} OFFSET ${pageNum}`;
            const [rows] = await conn.execute(sql);
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
    },
    deleteMovieById: async(id, conn) => {
        try{
            const deleteJoinTableSql = `
                DELETE mc, mc2, mc3 
                FROM movie_cast mc
                LEFT JOIN movie_company mc2 ON mc.movie_id = mc2.movie_id
                LEFT JOIN movie_crew mc3 ON mc.movie_id = mc3.movie_id
                WHERE mc.movie_id = ?`;
            const deleteMovieSql = `DELETE m FROM movie m WHERE m.movie_id = ?`;
            await conn.execute(deleteJoinTableSql, [id]);
            const result = await conn.execute(deleteMovieSql, [id]);
            if(result[0].affectedRows === 0) {
                throw errorResponse(errorCode.NOT_FOUND_MOVIE, `삭제할 데이터가 없음, ${id}`, 404);
            }
        }catch(err) {
            console.log(err);
            throw err;
        }
    }
}