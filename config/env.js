require('dotenv').config();

module.exports = {
    PORT: process.env.PORT,
    DB: {
        HOST: process.env.LOCAL_DB_HOST,
        USER: process.env.LOCAL_DB_USER,
        PASSWORD: process.env.LOCAL_DB_PASSWORD,
        DATABASE: process.env.LOCAL_DB_NAME,
    }
}