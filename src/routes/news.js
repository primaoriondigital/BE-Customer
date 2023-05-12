const express = require("express");
const router = express.Router();
const {NewsController} = require("../controller/news")

router.post("/input",NewsController.insert)
router.get("/detail/:id",NewsController.getDetail)
router.get("/",NewsController.getAll)

module.exports = router