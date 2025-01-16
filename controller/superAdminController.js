const { addUser,approveOrRejectBook } = require("../services/superAdminService");

exports.addUser = async (req, res) => {
  try {
    const userData = req.body;

    const user = await addUser(userData);

    res.status(201).json({
      message: "User created and details sent via email.",
      data: user,
    });
  } catch (error) {
    console.error("Error in addUser:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.handleBookApproval = async (req, res) => {
  const { bookId, action } = req.body; 
  const superAdminId = req.user.id; 

  try {
    const result = await approveOrRejectBook(bookId, action, superAdminId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

