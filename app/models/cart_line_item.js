const mongoose = require('mongoose');
const Schema = mongoose.Schema

const cartLineItemSchema = new Schema({
    product:{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        required: true
    }
})

//business logic
//cartLineItemsSchema.methods

//cartLineItemsSchema.statics

//cartLineItemsSchema.pre('save',function(){})

const CartLineItem = mongoose.model('CartLineItem',cartLineItemSchema);

module.exports = {
    cartLineItemSchema,
    CartLineItem
}

