const express = require('express')
const router = express.Router()
const UsersRouter = require('../routes/user')
const OrderRouter = require('../routes/order')
const MidtransRouter = require('../routes/midtrans')
const NewsRouter = require('./news')

router
.use('/users',UsersRouter)
.use('/news',NewsRouter)
.use('/order',OrderRouter)
.use('/notif',MidtransRouter)

module.exports = router
