const express = require("express");
const router = express.Router();
const {OrderController} = require("../controller/order")

router.post("/input",OrderController.insert)
router.post("/paid-status",OrderController.pay)
router.post("/getcleaner/:id",OrderController.getCleaner)
router.get("/approvedarea/:id",OrderController.approvedArea)
router.get("/approvedcleaner/:id",OrderController.approvedCleaner)
router.get("/rejectedcleaner/:id",OrderController.orderRejectedCleaner)
router.get("/orderdone/:id",OrderController.orderDone)
router.get("/detail/:id",OrderController.orderDetail)
router.get("/detail-tracking/:id",OrderController.orderDetailTracking)
router.get("/history/:customer_id",OrderController.getHistory)
router.get("/cancel/:id",OrderController.Cancel)
router.post("/review/:id",OrderController.Review)

// router.get("/status/:token",OrderController.getStatus)
// router.get("/lanjut",OrderController.insert.lanjut)


module.exports = router;