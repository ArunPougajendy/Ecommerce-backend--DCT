const express = require('express');
const router = express.Router();

const { booksController } = require('../app/controllers/books-controllers');
const { movieController } = require('../app/controllers/movies_conrtollers');
const { categoriesController } = require('../app/controllers/categories_contorller');
const { productsController } = require('../app/controllers/products_controller');
const { userController } = require('../app/controllers/users-controller');
const { ordersController } = require('../app/controllers/orders_controller')
router.use('/books',booksController);
router.use('/movies',movieController);
router.use('/categories',categoriesController);
router.use('/products', productsController);
router.use('/user',userController)
router.use('/orders',ordersController)


module.exports = {
    routes: router
}



