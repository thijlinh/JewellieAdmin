const express = require('express');
const app = express();
const port = 5000;
const cors=require("cors");
const bodyParser = require("body-parser");

//Connect DB
const db = require('./config/db');
db.connect();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("Hello")
})

// Import Router
const Router = require('./routers/router')
app.use("/",Router)


app.listen(port, async () => {
    console.log(`My serve listing on port ${port}`)
})

