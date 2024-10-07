// db.js
const mongoose = require('mongoose');
const config = require('./config.js');

const connectDB = async () => {
    try {
        await mongoose.connect(config.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB Atlas');
    } catch (err) {
        console.error('Error connecting to MongoDB Atlas:', err.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;