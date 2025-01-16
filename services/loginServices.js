const { User } = require("../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("Invalid email");
  }
  if (user.password !== password) {
    throw new Error("Invalid password.");
  }
   const payload = {
    id: user.id,
    role: user.role,
  }
  const token = jwt.sign(payload,process.env.JWT_SECRET,{ expiresIn: "5d" });

  return { message: "Login successful", token };
};
