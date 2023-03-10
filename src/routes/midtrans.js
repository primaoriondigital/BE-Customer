const express = require("express");
const router = express.Router();
const {MidtransController} = require('../controller/midtrans')

router.post("/notification",MidtransController.insert)
router.get("/status/:order_id",MidtransController.status)

module.exports = router