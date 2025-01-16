const express = require("express");
const {addUser,handleBookApproval} = require("../controller/superAdminController")
const auth = require("../middlewares/auth");
const role = require("../middlewares/role");
const router = express.Router();        

router.post('/add-user',auth,role('superAdmin'),addUser);
router.post("/books/approval",auth,role('superAdmin'),handleBookApproval);

module.exports = router;