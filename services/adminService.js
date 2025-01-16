const { User, Book } = require("../models");
const transporter = require("../config/nodemailerconfig");

exports.createBook = async (bookData,adminId) => {
  const { title, description, author, price} = bookData;

  const book = await Book.create( {title,
    description,
    author,
    price,
    adminId, 
    status: "pending",
    isVisible: true
})
  const superAdmins = await User.findAll({ where: { role: 'superAdmin' } });
  const emailText = `
    A new book has been added:
    - Title: ${title}
    - Description: ${description}
    - Author: ${author}
    - Price: ${price}
  `;

  try {
    for (let superAdmin of superAdmins) {
        await transporter.sendMail({
            from: '"Bookstore Admin" <admin@bookstore.com>',
            to: superAdmin.email, 
            subject: "New Book Added",
            text: emailText
          });
      console.log(`Email sent to Superadmin: ${superAdmin.email}`);
    }
  } catch (error) {
    console.error("Error sending email to Superadmins:", error);
    throw error;
  }

  return book;
};

exports.updateBook = async (bookId, updatedData) => {
  const book = await Book.findByPk(bookId);

  if (!book) {
    throw new Error("Book not found.");
  }

  await book.update(updatedData);

  const superAdmins = await User.findAll({ where: { role: 'superAdmin' } });

  const emailText = `
    A book has been updated:
    - Title: ${updatedData.title || book.title}
    - Description: ${updatedData.description || book.description}
    - Author: ${updatedData.author || book.author}
    - Price: ${updatedData.price || book.price}
  `;

  try {
    for (let superAdmin of superAdmins) {
        await transporter.sendMail({
            from: '"Bookstore Admin" <admin@bookstore.com>',
            to: superAdmin.email,  
            subject: "Book Updated",
            text: emailText
          });
      console.log(`Email sent to Superadmin: ${superAdmin.email}`);
    }
  } catch (error) {
    console.error("Error sending email to Superadmins:", error);
    throw error;
  }

  return book;
};

exports.deleteBook = async (bookId) => {
  const book = await Book.findByPk(bookId);

  if (!book) {
    throw new Error("Book not found.");
  }

  await book.destroy();

  const superAdmins = await User.findAll({ where: { role: 'superAdmin' } });

  const emailText = `
    A book has been deleted:
    - Title: ${book.title}
    - Description: ${book.description}
    - Author: ${book.author}
    - Price: ${book.price}
  `;

  try {
    for (let superAdmin of superAdmins) {
        await transporter.sendMail({
            from: '"Bookstore Admin" <admin@bookstore.com>',
            to: superAdmin.email,
            subject: "Book Deleted",
            text: emailText
          });
      console.log(`Email sent to Superadmin: ${superAdmin.email}`);
    }
  } catch (error) {
    console.error("Error sending email to Superadmins:", error);
    throw error;
  }

  return book;
};

exports.getBooks = async () => {
  const books = await Book.findAll();
  return books;
};
