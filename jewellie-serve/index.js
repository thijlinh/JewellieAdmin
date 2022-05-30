const express = require('express');
const app = express();
const port = 5000;
const cors=require("cors");
const bodyParser = require("body-parser");
// const multer = require('multer');
const path= require('path')

//Connect DB
const db = require('./config/db');
db.connect();

// app.use(cors());
// app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/images')));
app.use(cors());

app.get('/', (req, res) => {
    res.send("Hello")
})

// Import Router
const Router = require('./routers/router')
app.use("/",Router)

//Import Models
// const Product=require('./models/Product');

app.listen(port, async () => {
    console.log(`My serve listing on port ${port}`)
})

//////////////UPLOAD IMAGE///////////
// var storage = multer.diskStorage({
//     destination: "images", 
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}--${file.originalname}`)
//     }
// })

// let maxSize = 10 * 1024 * 1024 //10MB
// var upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: maxSize
//     }
// }).single("file")

