const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const models = {};
const mongoose = require('mongoose');

if (process.env.DB_HOST !== '') {
    fs.readdirSync(__dirname)
        .filter((file) => {
            return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
        })
        .forEach((file) => {
            const _model = require('./' + file);
            models[_model.modelName] = _model;
        });

    mongoose.Promise = global.Promise; // set mongo up to use promises

    let db = mongoose.connection;
    module.exports = db;

    db.once('open', () => {
        console.log('Connected to mongo');
    });

    db.on('error', (error) => {
        console.log("error", error);
    });

} else {
    console.log("No Mongo Credentials Given");
}

module.exports = models;