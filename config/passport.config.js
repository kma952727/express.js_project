const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const bcrypt = require('bcrypt');
require('dotenv').config();

const User = require('../models/user.model');
const getConnection = require('./db');
const SECRET_KEY = process.env.JWT_SECRET_KEY;

module.exports = function(passport) {

    const loginConfig =  { 
        session: false
    }
    const loginProcess = async (username, password, done) => {
        const conn = await getConnection();
        try{
            const user = await User.getUserByUsername(username, conn);
            await bcrypt.compare(password, user.password)? done(null, user, true) : done(null, null, false);
        }catch(err){
            done(err);
        }finally {
            conn.release();
        }
    }

    const authConfig = {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        passReqToCallback: true,
        secretOrKey: SECRET_KEY,
    }
    const jwtVerifiedProcess = async (req, userInfo, done) => {
        const conn = await getConnection();
        try{
            const user = await User.getUserById(userInfo.userID, conn);
            if(user) {
                return done(null, user);
            } else {
                return done(null, false, null);
            }
        }catch(err){
            throw err;
        }finally{
            conn.release();
        }

    }

    passport.use('login', new localStrategy(loginConfig, loginProcess));
    passport.use(new JWTstrategy(authConfig, jwtVerifiedProcess));
};