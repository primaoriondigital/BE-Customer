const express = require("express");
const router = express.Router();
const {UsersController} = require("../controller/user")

router.post("/login",UsersController.login)
router.post("/register",UsersController.register)
router.post("/verification",UsersController.verification)
router.get("/:id",UsersController.getProfileDetail)
router.get("/verification-phone/:phone",UsersController.verificationWeb)
router.put("/point/:id",UsersController.putPoint)


module.exports = router;