const express = require('express')
const bodyParser = require('body-parser')
const products = require('../source/productsArray')

const productRouter = express.Router({mergeParams: true})

productRouter.use(bodyParser.json())

productRouter.route('/')
.all((req, res, next) => {
    if(req.headers.auth.toLowerCase() === 'admin')
    {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        next()
    }
    else if (req.headers.auth.toLowerCase() === 'customer') {
        res.statusCode = 403
        res.setHeader('Content-Type', 'text/html')
        res.end(`<html><body><h1>Error ${res.statusCode}: Customer does not have access to the content.</h1></body></html>`)
    } else {
        res.statusCode = 401
        res.setHeader('Content-Type', 'text/html')
        res.end(`<html><body><h1>Error ${res.statusCode}: You are not authenticated.</h1></body></html>`)
    }
    
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