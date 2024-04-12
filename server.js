// require modules
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Product = require('./models/productModel')

// setting up middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))


// routes
app.get('/', (req, res) => {
    res.send('Hello Node API')
})

app.get('/blog', (req, res) => {
    res.send('Hello Blog, this is where it begins')
})

// get all products
app.get('/products', async(req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// get product by id
app.get('/products/:id', async(req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findById(id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// post a new product
app.post('/products', async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

// update a product
app.put('/products/:id', async(req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndUpdate(id, req.body)
        if(!product){
            return res.status(404).json({message: `Cannot find product with ID: ${id}`})
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

// delete a product by id
app.delete('/products/:id', async(req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id)
        if(!product){
            return res.status(404).json({message: `Cannot find product with ID: ${id}`})
        }
        res.status(200).json(product)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

// connecting to the database
mongoose.set('strictQuery', false)
mongoose.connect('mongodb+srv://admin:Mongodb2024@firstapi.w3i6xvm.mongodb.net/FirstAPI?retryWrites=true&w=majority&appName=FirstAPI')
.then(() => {
    console.log('Connected to MongoDB')
    app.listen(3000, () => {
        console.log('Node API app is running on PORT 3000')
    })
}).catch((error) => {
    console.log(error)
})