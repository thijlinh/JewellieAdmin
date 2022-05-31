const express = require('express');
const router = express.Router();

// Import models 
const Product=require('../models/product')
const User = require('../models/User');
const Blog = require('../models/Blog');


router.get('/', function (req, res) {
    res.send('OK...');
})
// Get all products
router.get('/products', function (req, res) {
    Product.find({}, function (err, data) {
        console.log(data)
        if (err) {
            res.json({message: err.message})
        } else {
            res.json(data)
        }
    })
})
// Get product by id
router.get('/:productId', async function (req, res) {
    console.log(req.params.productId)
    try {
        const data = await Product.findById(req.params.productId)
        res.json(data)
    } catch (err) {
        res.json({message: err.message})
    }
})
// Insert product by id
router.post('/product', async function (req, res) {
    // console.log("Data from client", req.body)
    // res.send("Server received data!")

    let product = new Product({
        ten: req.body.ten,
        gia: req.body.gia
    })
    try {
        p = await product.save();
        console.log('POST PRODUCT SUCESSFULLY');
        res.json({ message: 'success'})
    } catch (err) {
        console.log('POST ERROR');
        console.log(err.message);
        res.json({message: err.message})
    }

})

// Update product
router.patch('/:productId', async (req, res) => {
    try {
        await Product.updateOne({ _id: req.params.productId }, {
        $set:{ten:req.body.ten,gia:req.body.gia}
        })
        res.json({status: 200, message:"Success"})
    } catch (err) {
        console.log(err.message);
        res.json({ message:err.message})
    }
})

// Delete product
router.delete('/:productId', async (req, res) => {
    try {
        await Product.deleteOne({ _id: req.params.productId })
        res.json({status: 200, message:"success"})
    } catch (err) {
        res.json({ message:err.message})
    }
})


// ********************* USER **************************
// Insert user by id
router.post('/authenticate', async function (req, res) {
    try {

        const data = await User.findOne({
            'username': req.body.username,
            'password' : req.body.password
        })
        if(data == null){
            res.json({message: 'Đăng nhập không thành công'})
        } else {
            res.json({ message: 'success'})
        }

    } catch (err) {
        console.log('POST ERROR');
        console.log(err.message);
        res.json({message: err.message})
    }

})

//******************************* BLOG **************************
// Get all blogs
router.get('/blogs',(req,res)=>{
    // res.send("Product list")
         Blog.find({})
    .then(data => {res.json(data)})
    .catch(err => {err.json({"Error": err.messages})})
})
// Get blog by id
router.get('/:blogId', async function (req, res) {
    console.log(req.params.blogId)
    try {
        const data = await Blog.findById(req.params.blogId)
        res.json(data)
    } catch (err) {
        res.json({message: err.message})
    }
})
// Insert blog by id
router.post('/blog', async function (req, res) {
    // console.log("Data from client", req.body)
    // res.send("Server received data!")

    let blog = new Blog({
        title: req.body.title,
        content: req.body.content,
    })
    try {
        b = await blog.save();
        console.log('POST BLOG SUCESSFULLY');
        res.json({ message: 'success'})
    } catch (err) {
        console.log('POST ERROR');
        console.log(err.message);
        res.json({message: err.message})
    }

})

// Update blog
router.patch('/:blogId', async (req, res) => {
    try {
        await Blog.updateOne({ _id: req.params.blogId }, {
        $set:{title: req.body.title,
            content: req.body.content,
            createdDate:req.body.createdDate,
            createdBy:req.body.createdBy}
        })
        res.json({status: 200, message:"Success"})
    } catch (err) {
        console.log(err.message);
        res.json({ message:err.message})
    }
})

// Delete blog
router.delete('/:blogId', async (req, res) => {
    try {
        await Blog.deleteOne({ _id: req.params.blogId })
        res.json({status: 200, message:"success"})
    } catch (err) {
        res.json({ message:err.message})
    }
})


module.exports = router;


