//Object Prototype Function

const mongoose = require('mongoose');
const { Product } = require('./product'); // refering the Product model
const Schema = mongoose.Schema;

let categorySchema = new Schema({
    name: {
        type: String,
        require: true,
        minlength: 1,
        maxlength: 64
    }
});

//While defining our own static methods & instance methods do nt use arrow function

categorySchema.statics.findAllProducts = function(id) {
    let categoryId = id;
    return Product.find({category: categoryId});
}

const Category = mongoose.model('Category',categorySchema);


module.exports = {
    Category
}