const mongoose = require('mongoose');
const shorthash = require('shorthash');
const {User} = require('./user')
const Schema = mongoose.Schema


const orderSchema = new Schema({
    orderDate: {
        type: Date,
        defalut: Date.now
    },
    orderNumber: {
        type: String, 
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    total: {
        type: Number
    },
    status: {
        type: String,
        enum: ['open','confirmed','deleivered'],
        defalut: 'confirmed'
    },
    orderLineItems: [
        {
            product:{
                type: Schema.Types.ObjectId,
                ref:'product'
            },
            quantity: {
                type: Number
            },
            price: {
                type: Number
            }
        }
    ]
})

orderSchema.pre('validate',function(nex){
    let order = this;
    order.orderNumber = `DCT-${shorthash.unique(order.order_id.toString())}`
    next()
})
 
orderSchema.pre('save',function(next){
    let order = this;
    if(order.isNew) {
        let cartTotal = 0
        User.findOne({_id:order.user}).populate('cartLineItems.product').then(function(user){
            user.cartLineItems.forEach((lineItem)=>{
                let productData = {
                    product: lineItem.product._id,
                    quantity: lineItem.quantity,
                    price: lineItem.product.price
                }
                order.orderLineItems.push(productData)
                cartTotal += productData.price * productData.quantity
            })
            order.total = cartTotal;
            next()
        }).catch((err)=>{
            return Promise.reject(err)
            //return nre Promise (function(resolve,reject){
                //reject(err)
            //})
        })
    } else {
        next()
    }
})

const Order = mongoose.model('Order',orderSchema)

module.exports = {
    Order
}