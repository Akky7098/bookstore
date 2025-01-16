const {
    purchaseBook,
    forgotPassword,
    resetPassword,
  } = require("../services/userService");
  

  exports.purchaseBook = async (req, res) => {
    const userId = req.user.id;
    const { bookId} = req.body;
  
    try {
      const order = await purchaseBook(userId, bookId);
      res.status(201).json({
        message: "Book purchased successfully.",
        order,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
 
  exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    const role = req.user.role;
    console.log(role);
  
    try {
      const result = await forgotPassword(email);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  

  exports.resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
  
    try {
      const result = await resetPassword(token, newPassword);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  