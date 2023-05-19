const express = require("express");
const router = express.Router();
const {NewsController} = require("../controller/news")
const multer = require("multer")
const storage = multer.memoryStorage()
const upload = multer({ storage: storage})

// router.post("/input",NewsController.insert)
router.post("/input",upload.single('image'),NewsController.insert)
// router.post('/upload', upload.single('image'), NewsController.upload)
router.get("/detail/:id",NewsController.getDetail)
router.get("/",NewsController.getAll)
router.delete("/:id",NewsController.deleteNews)
// router.put("/:id",NewsController.edit)
router.put("/edit/:id",upload.single('image'),NewsController.edit2)


module.exports = router