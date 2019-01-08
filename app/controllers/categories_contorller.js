    const express = require('express');
    const router = express.Router();
    const { Category } = require('../models/category');
    const { Product } = require('../models/product');
    const { vadidateId } = require('../middlewares/utilities');
    const { authenticateUser,authorizeUser } = require('../middlewares/authentication')

    //GET localhost:3000/categories/
    router.get('/',(req,res)=>{
        Category.find().then((categories) => {
            res.send(categories);
        }).catch((err)=>{
            res.send(err);
        });
    });

    //POST localhost:3000/categories/
    router.post('/',authenticateUser,authorizeUser,(req,res)=>{
        let body = req.body;
        let category = new Category(body);
        category.save().then((category)=>{
            res.send({
                category,
                notice: "sucessfully created"
            });
        }).catch((err) => {
            res.send(err);
        });
    });

    router.get('/:id',vadidateId,(req,res)=>{
        let categoryId = req.params.id;

        Category.findById(categoryId).then((category)=>{
            if(!category) {
                res.send({
                    notice: 'record not found'
                })
            }
            res.send(category);
        }).catch((err)=>{
            res.send(err);
        })
    })

    router.put('/:id',vadidateId,(req,res) =>{
        const id = req.params.id;
        const body = req.body;
        //Category.findOneAndUpdate({_id:id},{},{})
        Category.findByIdAndUpdate(id,{$set: body},{new:true}).then((category)=>{ 
            res.send(category) }) // $set and Objet.assign are same
    })

    router.get('/:id/products',vadidateId,(req,res)=>{
        let categoryId = req.params.id;

        Category.findAllProducts(categoryId).then((products)=>{
            res.send(products);
        }).catch((err)=>{
            res.send(err);
        })
        // Product.find({ category: categoryId }).then((products)=>{
        //     res.send(products);
        // }).catch((err)=>{
        //     res.send(err);
        // })
    })

    router.delete('/:id',vadidateId,(req,res)=>{
        let categoryId = req.params.id;
        Category.findByIdAndDelete(categoryId).then((category)=>{
            if(!category) {
              res.send({
                  notice: 'record not found'
              });
            }

            res.send({
                category,
                notice: "Deleted"
            }).catch((err)=>{
                res.send(err);
            })
        })
    })


    module.exports = {
        categoriesController : router
    }