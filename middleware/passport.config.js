const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user.model');
const getConnection = require('../config/db');

passport.use(
    new LocalStrategy(
        { usernameField: 'username', passwordField: 'password' }, 
        async (username, password, done) => {
            let conn;
            try{
                conn = await getConnection();
                const user = await User.getUserByUsername(username, conn);
                await bcrypt.compare(password, user.password)? done(null, user, true) : done(null, null, false);
            }catch(err){
                done(err);
            }finally {
                conn.release();
            }
        }
    )
);

module.exports = passport;