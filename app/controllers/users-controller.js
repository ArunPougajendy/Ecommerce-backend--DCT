const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const { CartLineItem } = require('../models/cart_line_item');
const { authenticateUser } = require('../middlewares/authentication');



// register
//post /user
router.post('/',function(req,res) {
    let body = req.body;
    let user = new User(body) // constructor
    user.save().then(function(user){
        return user.generateToken()
    })
    .then(function(token){
        res.header('x-auth', token).send({
            user,
            notice: 'successfully registered'
        })
    })
    .catch(function(err){
        res.send(err)
    })
})

// for login we will use post method. because req.body is not available for get request 

router.post('/login', function (req,res) {
    let body=req.body;
    User.findByCredentials(body.email, body.password).then(function (user) {
        //res.send(user);
        return user.generateToken();
    }).then(function(token){
        res.header('x-auth',token).send();
    }).catch(function (err) {
        res.status(401).send(err);
    })
})

//private routes
//user/accounts

router.get('/accounts', authenticateUser, function(req,res){
    const user = req.user;
    res.send(user)
})

// GET users/cart_line_items
router.get('/cart_line_items', authenticateUser, function(req,res){
    let user = req.user;
    res.send(user.cartLineItems);
})


//Add to Cart Functionality
// POST users/cart_line_items
router.post('/cart_line_items', authenticateUser,function(req,res){
    const body = req.body;
    const user = req.user;
    const cartLineItem = new CartLineItem(body) //Object is created with CartlineItem type with body data

    //objectID == objectID [cant use == sign]
    //cartItem.product.equals(cartLineItem.product)
    const inCart = user.cartLineItems.find(cartItem => cartItem.product.equals(cartLineItem.product))
    
    if(inCart) {
        inCart.quantity = inCart.quantity + cartLineItem.quantity
    } else {
        //user.cartLineItems.push(inCart);
        user.cartLineItems.push(cartLineItem)
   }
   
    
    user.save().then(function(user){
        res.send({
            cartLineItem,
            notice: "successfully added the product to your cart"
        })
    }).catch(function(err){
        res.send(err)
    });
})

//PUT users/cart_line_items/:id
//Update Cart Item Functionality
router.put('/cart_line_items/:id',authenticateUser,function(req,res) {
    const cartItemId = req.params.id;
    const body = req.body;
    const user = req.user;
    const item = user.cartLineItems.id(cartItemId);
    //item.quantity = body.quantity;
    Object.assign(item,body); // similar to above statement

    user.save().then((user)=>{
        res.send(item)
    }).catch((err)=>{
        res.send(err);
    })
})

//DELETE users/cart_line_items/:id

router.delete('/cart_line_items/:id', authenticateUser,function(req,res) {
    const cartItemId = req.params.id;
    const user = req.user;

    user.cartLineItems.id(cartItemId).remove();
    user.save().then((user)=>{
        res.send({
            notice: 'removed the product from cart'
        }).catch((err)=>{
            res.send(err)
        })
    }) 
})

module.exports = {
    userController: router
}