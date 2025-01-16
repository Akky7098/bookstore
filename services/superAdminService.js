const  { User,Book }  = require("../models");
//sconst { sequelize } = require("../config/db");
const nodemailer = require("nodemailer");
const transporter = require("../config/nodemailerconfig");

exports.addUser = async (userData) => {
  const { name, email, password, role } = userData;

  if (!["admin", "user"].includes(role)) {
    throw new Error("Invalid role. Must be 'admin' or 'user'.");
  }
  const user = await User.create({ name, email, password, role });
  const emailText = `
    Welcome to the Bookstore!
    Your account has been created successfully.
    - Name: ${name}
    - Email: ${email}
    - Role: ${role}
  `;
  try {
    await transporter.sendMail({
      from: '"Bookstore Super Admin" <admin@bookstore.com>',
      to: email,
      subject: "Your Account Details",
      text: emailText,
    });
    console.log(`Account details sent to ${email}`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
  return user;
};

exports.approveOrRejectBook = async (bookId, action, superAdminId) => {
  if (!["approve", "reject"].includes(action)) {
    throw new Error("Invalid action. Must be 'approve' or 'reject'.");
  }

  const book = await Book.findByPk(bookId);
  if (!book) {
    throw new Error("Book not found.");
  }

  const admin = await User.findByPk(book.adminId);
  if (!admin) {
    throw new Error("Admin who created the book not found.");
  }

  if (action === "approve") {
    await book.update({ status: "approved", isVisible: true });
    return { message: "Book approved and made visible to users." };
  } else if (action === "reject") {
    await book.update({ status: "rejected", isVisible: false });

    const emailText = `
      Hello ${admin.name},
      The book you submitted (${book.title}) has been rejected by the Super Admin.
      Please review and resubmit the book details.
    `;
    await transporter.sendMail({
      from: '"Bookstore Super Admin" <admin@bookstore.com>',
      to: admin.email,
      subject: "Book Submission Rejected",
      text: emailText,
    });
    return { message: "Book rejected and admin notified." };
  }
};


  
