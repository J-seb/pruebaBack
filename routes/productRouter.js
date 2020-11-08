const express = require('express')
const bodyParser = require('body-parser')
const products = require('../source/productsArray')

const productRouter = express.Router({mergeParams: true})

productRouter.use(bodyParser.json())

productRouter.route('/')
.all((req, res, next) => {
    if(req.headers.auth.toLowerCase() === 'admin'){
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        next()
    }
    else if (req.headers.auth.toLowerCase() === 'customer') {
        res.statusCode = 403
        res.setHeader('Content-Type', 'text/html')
        res.end(`<html><body><h1>Error ${res.statusCode}: Acceso denegado. Clientes no tienen acceso al contenido.</h1></body></html>`)
    } else {
        res.statusCode = 401
        res.setHeader('Content-Type', 'text/html')
        res.end(`<html><body><h1>Error ${res.statusCode}: Acceso denegado a desconocidos, por favor identificarse.</h1></body></html>`)
    }
})
.get((req, res, next) => {
    res.json(products)
})

productRouter.route('/:productId')
.all((req, res, next) => {
    if(req.headers.auth.toLowerCase() === 'admin'){
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        next()
    }
    else if (req.headers.auth.toLowerCase() === 'customer') {
        res.statusCode = 403
        res.setHeader('Content-Type', 'text/html')
        res.end(`<html><body><h1>Error ${res.statusCode}: Acceso denegado. Clientes no tienen acceso al contenido.</h1></body></html>`)
    } else {
        res.statusCode = 401
        res.setHeader('Content-Type', 'text/html')
        res.end(`<html><body><h1>Error ${res.statusCode}: Acceso denegado a desconocidos, por favor identificarse.</h1></body></html>`)
    }
})
.get((req, res, next) => {
    const result = products.products.find((product) => product.id == req.params.productId)
    if (result) {
        res.json(result)
    } else {
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/html')
        res.end(`<html><body><h1>Error ${res.statusCode}: Recurso no encontrado.</h1></body></html>`)
    }
    
})

module.exports = productRouter