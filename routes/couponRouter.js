const express = require('express')
const bodyParser = require('body-parser')
const coupons = require('../source/couponsArray')

const couponRouter = express.Router({mergeParams: true})

couponRouter.use(bodyParser.json())

couponRouter.route('/')
.all((req, res, next) => {
    console.log(req.headers.auth)
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    next()
})
.get((req, res, next) => {
    res.json(coupons)
})
.post((req, res , next) => {
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
})

couponRouter.route('/:couponId')
.all((req, res, next) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    next()
})
.get((req, res, next) => {
    const result = coupons.coupons.find((coupon) => coupon.id == req.params.couponId)
    console.log(result)
    res.json(result)
})

module.exports = couponRouter