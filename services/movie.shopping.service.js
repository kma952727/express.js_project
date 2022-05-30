const getConnection = require('../config/db');
const { removeAtCartRequest } = require('../dto/movie.dto');
const Cart = require('../models/cart.model');

module.exports = movieShoppingService = {

    addToCart : async(addToCartRequest) => {
        const conn = await getConnection();
        try{
            const cart = await Cart.getCartByUserId(addToCartRequest.userId, conn);
            await Cart.insertCartItem(addToCartRequest, cart, conn);
        }catch(err){
            throw err;
        }finally{
            conn.release();
        }
    },
    removeMovieAtCart : async(removeAtCartRequest) => {
        const conn = await getConnection();
        try{
            const cart = await Cart.getCartByUserId(removeAtCartRequest.userId, conn); 
            await Cart.deleteCartItem(removeAtCartRequest, cart, conn);
        }catch(err){
            throw err;
        }finally{
            conn.release();
        }
    }
}