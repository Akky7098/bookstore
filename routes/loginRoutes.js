const express = require("express");
const router = express.Router();
const loginController = require("../controller/loginController");
const auth = require("../middlewares/auth")

router.post("/", loginController.login);
router.post("/logout", auth, loginController.logout);

module.exports = router;
