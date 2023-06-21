const express = require("express");
const router = express.Router();
const {UsersController} = require("../controller/user")

router.post("/login",UsersController.login)
router.post("/register",UsersController.register)
router.post("/verification",UsersController.verification)
router.get("/:id",UsersController.getProfileDetail)
router.get("/verification-phone/:phone",UsersController.verificationWeb)
router.put("/point/:id",UsersController.putPoint)
router.delete("/:id",UsersController.deleteUser)
router.post("/change-pw/:phone",UsersController.changePass)
router.get("/check-phone/:phone",UsersController.checkPhone)
router.get("/otp-check/:phone/:otp",UsersController.checkOTP)
router.put("/change-profile/:id",UsersController.changeProfile)


module.exports = router;