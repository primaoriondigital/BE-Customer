const express = require('express');
const router = express.Router();
const controller = require('../controller/news2');
const upload = require('../middleware/multer');

router.post('/upload', upload.single('image'), controller.uploadImage);

module.exports = router;
