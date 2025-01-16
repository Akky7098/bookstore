const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth")
const role = require("../middlewares/role")
const adminController = require("../controller/adminController");

router.post("/books",auth,role('admin') ,adminController.createBook);
router.put("/books/:id",auth,role('admin'), adminController.updateBook);

router.delete("/books/:id",auth, role('admin'),adminController.deleteBook);
router.get("/books",auth,role('admin'), adminController.getBooks);

module.exports = router;
