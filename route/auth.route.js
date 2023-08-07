const express = require("express");
const router = express.Router();
const authController = require("../controller/auth.controller");
const authenticateToken = require("../middleware/auth.middleware");

router.post("/signup", authController.signUP);
router.post("/login", authController.login);

router.get("/userdetails", authenticateToken, authController.userDetails);

module.exports = router;
