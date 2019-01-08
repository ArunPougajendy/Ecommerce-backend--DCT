const express = require('express');
const router = express.Router();
const {Product} = require('../models/product');
const { vadidateId } = require('../middlewares/utilities');
const { authenticateUser,authorizeUser } = require('../middlewares/authentication')


router.get('/', (req, res) => {
     // popluate works on array of objects
    Product.find().populate('category','name').then((products) => {
      res.send(products);
     }).catch((err) => {
      res.send(err);
     });
    }) 

// middlewares 
router.get('/:id',vadidateId,(req,res)=>{
    let id = req.params.id;
    Product.findById(id).populate('category').then((product)=>{
        if(!product) {
         res.send({
             notice: 'record not found'
         })
        }
        res.send(product);
    }).catch((err) => {
        res.send(err); 
    })
})

router.get('/:id/short',vadidateId,(req,res)=>{
    let id = req.params.id;
    Product.findById(id).then((product)=>{
        //Creating our own instance method
        res.send(product.shortInfo());//Since this is of Product type, define the instacne menthod in produt model
    }).catch((err)=>{
        res.send(err);
    })
})

router.get('/short/all',(req,res)=>{
    Product.find().then((products)=>{
        res.send(products.map(product => product.shortInfo()))
    })
})

router.post('/', (req, res) => {
    let body = req.body;
    let product = new Product(body);
    product.save().then((product) => {
        res.send({
            product, 
            notice: 'succesfully created a product'
            });
        }).catch((err) => {
        res.send(err);
    });
})

router.delete('/:id', vadidateId, (req, res) => {
    let id = req.params.id; 
    Product.findByIdAndDelete(id).then((product) => {
        if(!product) {
            res.send({
                notice: 'record not found'
            })
        }
        res.send({
            product, 
            notice: 'Successfully deleted a product'
        })
    })
})


module.exports = {
    productsController: router
}