const dotenv = require('dotenv');
const path = require('path');


dotenv.config({
    path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`)
});

module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,

    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: process.env.DB_PORT || '27017',
    DB_NAME: process.env.DB_NAME || 'tasks-db-estiam',
    DB_URL: process.env.DB_URL || 'mongodb+srv://tamim:tamim@studentdb.iymtsca.mongodb.net/?retryWrites=true&w=majority&appName=Studentdb',
    TOKEN_SECRET: process.env.TOKEN_SECRET || '1',
};