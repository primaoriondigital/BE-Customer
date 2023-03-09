const express = require('express')
const router = express.Router()
const UsersRouter = require('../routes/user')
const OrderRouter = require('../routes/order')
const MidtransRouter = require('../routes/midtrans')

router
.use('/users',UsersRouter)
.use('/order',OrderRouter)
.use('/notif',MidtransRouter)

module.exports = router
