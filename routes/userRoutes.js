const express = require("express");
const {
  purchaseBook,
  forgotPassword,
  resetPassword,
} = require("../controller/userController");
const auth = require("../middlewares/auth");
const role = require("../middlewares/role")
const router = express.Router();

router.post("/books/purchase",auth,role('user'), purchaseBook);
router.post("/forgot-password",auth,role('superAdmin','admin'), forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
