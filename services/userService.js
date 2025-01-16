const { User, Book, Order } = require("../models");
const transporter = require("../config/nodemailerconfig");
const {generateToken,verifyToken} = require("../config/gen_var_token")


exports.purchaseBook = async (userId, bookId) => {
  const book = await Book.findByPk(bookId);
  if (!book || !book.isVisible) {
    throw new Error("Book not available for purchase.");
  }

  const order = await Order.create({
    userId,
    bookId,
    orderDate: new Date(),
  });

  const superAdmins = await User.findAll({ where: { role: "superAdmin" } });
  const emailAddresses = superAdmins.map((admin) => admin.email);
  const emailText = `
    A new book order has been placed.
    - Book: ${book.title}
    - User: ${order.userId}
  `;

  await transporter.sendMail({
    from: '"Bookstore Notification" <no-reply@bookstore.com>',
    to: emailAddresses,
    subject: "New Book Order",
    text: emailText,
  });

  return order;
};

exports.forgotPassword = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("No user found with this email.");
  }

  const token = generateToken({ id: user.id }, "15m"); 
  console.log(token);
  const emailText = `
    Hello ${user.name},
    Please use the following link to reset your password:
    ${process.env.CLIENT_URL}/reset-password/${token}
  `;

  await transporter.sendMail({
    from: '"Bookstore Support" <support@bookstore.com>',
    to: email,
    subject: "Password Reset",
    text: emailText,
  });

  return { message: "Password reset link sent to your email." };
};

exports.resetPassword = async (token, newPassword) => {
  const { id } = verifyToken(token); 
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error("Invalid token or user does not exist.");
  }
  const [affectedRows] = await User.update(
    { password: newPassword }, 
    { where: { id } }
  );
  
  if (affectedRows === 0) {
    throw new Error("Failed to update password.");
  }
  
  return { message: "Password reset successfully." };
}  
