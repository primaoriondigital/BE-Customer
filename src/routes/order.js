const express = require("express");
const router = express.Router();
const {OrderController} = require("../controller/order")

router.post("/input",OrderController.insert)
router.get("/paid",OrderController.pay)
router.post("/getcleaner/:id",OrderController.getCleaner)
router.get("/approvedarea/:id",OrderController.approvedArea)
router.get("/approvedcleaner/:id",OrderController.approvedCleaner)
router.get("/orderdone/:id",OrderController.orderDone)
router.get("/detail/:id",OrderController.orderDetail)
router.get("/history/:customer_id",OrderController.getHistory)
router.get("/cancel/:id",OrderController.Cancel)
// router.get("/lanjut",OrderController.insert.lanjut)


module.exports = router;