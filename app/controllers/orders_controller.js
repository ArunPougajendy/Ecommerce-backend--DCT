const express = require('express');
const router = express.Router()
const { Order } = require('../models/order')
const { authenticateUser }= require('../middlewares/authentication')

//localhost:3000/orders - display all orders belong to one user

router.get('/', authenticateUser,function(req,res){
    const currentUser = req.user;
    Order.find( {user: currentUser._id}).then((orders) =>{
        res.send(orders)
    }).catch((err) =>{
        res.send(err)
    })
})

router.post('/',authenticateUser,function(req,res){
    const currentUser = req.user;
    let order = new Order();
    //ensuring current order belong to the user
    order.user = currentUser._id; 
    order.save().then(function(order){
        res.send({
            order,
            notice: 'successfully created an order'
        })
    }).catch((err)=>{
        res.send(err)
    })

})

module.exports = {
    ordersController : router
}