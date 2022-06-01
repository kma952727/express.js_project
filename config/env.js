require('dotenv').config();
const DEPLOY_STEP = process.argv[2];
module.exports = {
    PORT: process.env.PORT,
    DB: {
        HOST: DEPLOY_STEP === 'prod'? process.env.PROD_DB_HOST : process.env.LOCAL_DB_HOST,
        USER: DEPLOY_STEP === 'prod'? process.env.PROD_DB_USER : process.env.LOCAL_DB_USER,
        PASSWORD: DEPLOY_STEP === 'prod'? process.env.PROD_DB_PASSWORD : process.env.LOCAL_DB_PASSWORD,
        DATABASE: DEPLOY_STEP === 'prod'? process.env.PROD_DB_NAME : process.env.LOCAL_DB_NAME,
        PORT: DEPLOY_STEP === 'prod'? process.env.PROD_DB_PORT : process.env.LOCAL_DB_PORT,
    }
}