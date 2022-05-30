const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    ten: {type:String,required:true},
    gia: { type: Number, required: true },
    thumbPath: {type: String},
    loai: { type: Number},
    createdAt: { type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now},

})

module.exports = mongoose.model('Product',ProductSchema);