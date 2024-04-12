const express = require('express')
const router = express.Router()
const Product = require('../models/productModel')
const {getProducts, getProductById, addNewProduct, updateProductById, deleteProductById} = require('../controllers/productController')

// get all products
router.get('/', getProducts )

// get product by id
router.get('/:id', getProductById)

// post a new product
router.post('/', addNewProduct)

// update a product
router.put('/:id', updateProductById)

// delete a product by id
router.delete('/:id', deleteProductById)

module.exports = router;