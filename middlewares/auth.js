const jwt = require("jsonwebtoken");
const { User } = require("../models"); 
require("dotenv").config();

module.exports = async (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token missing." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user || user.currentToken !== token) {
      return res.status(403).json({ message: "Unauthorized: Invalid or expired session." });
    }

    req.user = { id: user.id, role: user.role };
    next();
  } catch (err) {
    res.status(403).json({ message: "Forbidden: Invalid token." });
  }
};

