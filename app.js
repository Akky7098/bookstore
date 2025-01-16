const express = require("express");
const bodyParser = require("body-parser")
const loginRoutes = require("./routes/loginRoutes")
const superAdminRoutes = require("./routes/superAdminRoutes");
const adminRoutes = require("./routes/adminRoutes")
const userRoutes = require("./routes/userRoutes")


const app = express();
app.use(bodyParser.json());
app.use('/login',loginRoutes)
app.use('/superadmin',superAdminRoutes);
app.use('/admin',adminRoutes);
app.use('/user',userRoutes)

module.exports = app;