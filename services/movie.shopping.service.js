const { successResponse } = require('../common/response');
const getConnection = require('../config/db');
const { removeAtCartRequest, getCartItemResponse } = require('../dto/movie.dto');
const Cart = require('../models/cart.model');

module.exports = movieShoppingService = {
    getCartItemsByUserId : async (userId) => {
        const conn = await getConnection();
        try{
            const items = await Cart.getCartItemsByUserId(userId, conn);
            return successResponse(items.map(item => getCartItemResponse(item)))
        }catch(err){
            throw err;
        }finally{
            conn.release();
        }
    },
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