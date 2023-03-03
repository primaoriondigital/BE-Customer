const express = require("express");
const router = express.Router();
const {OrderController} = require("../controller/order")

router.post("/input",OrderController.insert)

module.exports = router;