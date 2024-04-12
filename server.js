// require modules
require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 3000
const productRoute = require('./routes/productRoute')
const errorMiddleware = require('./middleware/errorMiddleware')
const cors = require('cors')
const FRONTEND = process.env.FRONTEND

// setting up middleware

const corsOptions = {
    origin: FRONTEND,
    optionsSuccessStatus: 200 // some legacy browsers like IE11 and various SmartTVs choke on 204
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended: false}))


// routes
app.use('/api/products', productRoute)

app.get('/', (req, res) => {
   res.send('Hello Node API')
})

app.get('/blog', (req, res) => {
    res.send('Hello Blog, this is where it begins')
})

app.use(errorMiddleware)

// connecting to the database
mongoose.set('strictQuery', false)
mongoose.connect(MONGO_URL)
.then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
        console.log(`Node API app is running on PORT:${PORT}`)
    })
}).catch((error) => {
    console.log(error)
})