const express = require('express')
const router = express.Router()
const UsersRouter = require('../routes/user')
const OrderRouter = require('../routes/order')
const MidtransRouter = require('../routes/midtrans')
const NewsRouter = require('./news')
const News2Router = require('./news2')

router
.use('/users',UsersRouter)
.use('/news',NewsRouter)
.use('/order',OrderRouter)
.use('/notif',MidtransRouter)
.use('/news2',News2Router)

module.exports = router
