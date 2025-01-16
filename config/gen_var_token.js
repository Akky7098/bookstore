  const jwt = require("jsonwebtoken");
  require("dotenv").config();

exports.generateToken = (payload, expiresIn = "1h") => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
  };
  
  exports.verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
  };