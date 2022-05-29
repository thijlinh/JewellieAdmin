const express = require('express');
const router = express.Router();

// Import models 
const Product=require('../models/product')
const User = require('../models/User');


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
        $set:{name:req.body.name,price:req.body.price}
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
// Insert product by id
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


module.exports = router;


