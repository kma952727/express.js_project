const errorCode = require("../common/error.code");
const { errorResponse } = require("../common/response");
const { addToCartRequest } = require("../dto/movie.dto");


module.exports = Cart = {
    
    getCartByUserId : async(userId, conn) => {
        try{
            const getCartSql = `SELECT * FROM movie_cart where user_id = ?`;
            const [rows] = await conn.execute(getCartSql, [userId]);
            return rows[0];
        }catch(err){
            throw err;
        }
    },
    getCartItemsByUserId : async(userId, conn) => {
        try{
            const getCartItemsSql = `
                SELECT m.* FROM movie_cart_item mci
                JOIN movie_cart mc ON mci.movie_cart_id = mc.cart_id
                JOIN movie m ON m.movie_id = mci.movie_id
                WHERE mc.user_id = ? 
            `;
            const [rows] = await conn.execute(getCartItemsSql, [userId]);
            return rows;
        }catch(err) {
            console.log(err)
            throw err;
        }
    },
    insertCartItem: async (addToCartRequest, cart, conn) => {
        try{   
            const addCartItemSql = `INSERT INTO movie_cart_item (movie_cart_id, movie_id) values (?, ?)`;
            await conn.execute(addCartItemSql, [cart.cart_id, addToCartRequest.movieId]);
        }catch(err) {
            if(err.errno === 1452) throw errorResponse(errorCode.NOT_FOUND_MOVIE, `영화데이터가 없음. ${addToCartRequest.movieId}`, 404);
            throw err;
        }
    },
    deleteCartItem: async (removeAtCartRequest, cart, conn) => {
        try{
            const deleteCartItemSql = `DELETE FROM movie_cart_item WHERE movie_cart_id = ? AND movie_cart_item_id = ?`;
            const [rows] = await conn.execute(deleteCartItemSql, [cart.cart_id, removeAtCartRequest.itemId]);
            if(rows.affectedRows === 0) throw errorResponse(errorCode.NOT_FOUND_CART_ITEM, `카트아이템이 없음. ${removeAtCartRequest.itemId}`, 404);
        }catch(err){
            throw err;
        }
    }
};