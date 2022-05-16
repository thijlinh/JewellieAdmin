const mongoose = require('mongoose');
require('dotenv/config')

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/jewellie', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected successfully")

    } catch (err) {
        console.log("Error", err.message);
    }
}
module.exports = { connect }