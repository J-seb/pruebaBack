const express = require('express')
const bodyParser = require('body-parser')
const coupons = require('../source/couponsArray')
const products = require('../source/productsArray')

const couponRouter = express.Router({mergeParams: true})

couponRouter.use(bodyParser.json())

couponRouter.route('/')
.all((req, res, next) => {
    if (req.headers.auth.toLowerCase() === 'admin' || req.headers.auth.toLowerCase() === 'customer'){
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        next()
    }else {
        res.statusCode = 401
        res.setHeader('Content-Type', 'text/html')
        res.end(`<html><body><h1>Error ${res.statusCode}: Acceso denegado a desconocidos, por favor identificarse.</h1></body></html>`)
    }
})
.get((req, res, next) => {
    if (req.headers.auth.toLowerCase() === 'admin') {
        res.json(coupons)
    } else {
        res.statusCode = 403
        res.setHeader('Content-Type', 'text/html')
        res.end(`<html><body><h1>Error ${res.statusCode}: Acceso denegado. Clientes no tienen acceso al contenido.</h1></body></html>`)
    }
})
.post((req, res, next) => {
    if (req.headers.auth.toLowerCase() === 'admin') {
        if (req.body) {
            const newCoupon = {
                id: coupons.coupons.length + 1,
                name: req.body.name,
                description: req.body.description,
                product_id: req.body.product_id,
                valid_since: req.body.valid_since,
                valid_until: req.body.valid_until,
            }
            coupons.coupons.push(newCoupon)
        }
        res.json(coupons)
    } else {
        res.statusCode = 403
        res.setHeader('Content-Type', 'text/html')
        res.end(`<html><body><h1>Error ${res.statusCode}: Acceso denegado. Clientes no tienen acceso al contenido.</h1></body></html>`)
    }
})

couponRouter.route('/:couponId')
.all((req, res, next) => {
    if (req.headers.auth.toLowerCase() === 'admin' || req.headers.auth.toLowerCase() === 'customer'){
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        next()
    }else {
        res.statusCode = 401
        res.setHeader('Content-Type', 'text/html')
        res.end(`<html><body><h1>Error ${res.statusCode}: Acceso denegado a desconocidos, por favor identificarse.</h1></body></html>`)
    }
})
.get((req, res, next) => {
    if (req.headers.auth.toLowerCase() === 'admin') {
        const result = coupons.coupons.find((coupon) => coupon.id == req.params.couponId)
        console.log(result)
        res.json(result)
    } else {
        res.setHeader('Content-Type', 'text/html')
        if (req.params.couponId <= coupons.coupons.length) {
            const cupon = coupons.coupons[req.params.couponId - 1]
            console.log(cupon)
            const producto = products.products.find((product) => product.id === cupon.product_id)

            res.write(`<html><body><h1>El cupon con numero: ${req.params.couponId} existe</h1>`)
            res.end(`<p>Usted tiene un ${cupon.description} para la compra de ${producto.name}</p></body></html>`)
        } else {
            res.end(`<html><body><h1>El cupon con número: ${req.params.couponId} NO existe</h1></body></html>`)
        }
    }
})

module.exports = couponRouter

