const mongoose = require('mongoose');
const validatePackage = require ('validator');
const shorthash = require('shorthash');
const Schema = mongoose.Schema;
const {triggerMail} = require('../middlewares/mailer')

const productSchema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    },
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 124
    },
    price: {
        type: Number,
        required: true,
        min: 1
    },
     description: {
         type: String,
         required: true,
         minlength: 5,
         maxlength: 1000
     },
     stock: {
        type: Number,
        required: true,
        min: 0
     },
     codEligible: {
         type: Boolean,
         required: true,
         enum: [true, false],
         default: true,
         /*validate: {
             validator: function(value) {
                 return (!this.price >= 25000 && this.codEligible)
             },
             message: function(){
                 return 'cod eligibility not availbale as price is gretater than 25000'
             }
         }*/
     },
     createdAt: {
         type: Date,
         default: Date.now
     },
     code: {
         type: String,
         required: true
     }
});

//To display only short details
productSchema.methods.shortInfo = function(){
    return {
        _id: this._id,
        name: this.name,
        price: this.price
    }
}

productSchema.pre('validate',function(next){
    let product = this;
    console.log(product._id);
    let code =shorthash.unique(product._id.toString());
    console.log(code);
    product.code = `DCT-${code}`;
    next();
})

productSchema.post('save',function() {
    let product = this;
    triggerMail(product)
    
})

const Product = mongoose.model('Product', productSchema);

module.exports = {
    Product
}