const express = require('express')
const bodyParser = require('body-parser')
const products = require('../productsArray')

const productRouter = express.Router({mergeParams: true})

productRouter.use(bodyParser.json())

productRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    next()
})
.get((req, res, next) => {
    res.json(products)
})

productRouter.route('/:productId')
.all((req, res, next) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    next()
})
.get((req, res, next) => {
    const result = products.products.find((product) => product.id == req.params.productId)
    console.log(result)
    res.json(result)
})

module.exports = productRouter