const express = require('express');
const app = express();
const port = 3000;

//Connect DB
const db = require('./config/db');
db.connect();


app.get('/', (req, res) => {
    res.send("Hello")
})

app.listen(port, () => {
    console.log(`My serve listing on port ${port}`)
})

