const express = require('express')
const router = express.Router()
const UsersRouter = require('../routes/user')
const OrderRouter = require('../routes/order')

router
.use('/users',UsersRouter)
.use('/order',OrderRouter)

module.exports = router
