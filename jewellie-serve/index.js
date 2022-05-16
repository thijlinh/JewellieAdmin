const express = require('express');
const app = express();
const port = 3000;

//Connect DB
const db = require('./config/db');
db.connect();

//http request logger nhận yêu cầu từ phía client
const morgan = require('morgan');
app.use(morgan('combined'));


app.get('/', (req, res) => {
    res.send("Hello")
})

app.listen(port, () => {
    console.log(`My serve listing on port ${port}`)
})

