const express = require("express");
const router = express.Router();
const {MidtransController} = require('../controller/midtrans')

router.post("/notification",MidtransController.insert)

module.exports = router