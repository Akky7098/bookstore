# Bookstore Project

This is a monolithic application for managing a bookstore. It includes roles and permissions for users such as Super Admin, Admin, and User. The application supports user authentication, book management, and email notifications.

## Features

### Super Admin Responsibilities
- Add users (Admins and Users) and send their account details via email.
- Approve or reject book details submitted by Admins.
  - Approved books are made visible to users.
  - Rejected books trigger a rejection email to the respective Admin.

### Admin Responsibilities
- Perform CRUD operations for books.
- Send an email to Super Admins after creating or updating a book.

### User Responsibilities
- Purchase books.
### Extra Features
- Forgot Password functionality with a reset token.
- Roles and permissions system.
- Send an email to Super Admins about each new book order.

---

## Technologies Used
- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework.
- **MySQL**: Database.
- **Sequelize**: ORM for database interactions.
- **Nodemailer**: For sending emails.
- **JWT**: Authentication and authorization.
- **Dotenv**: Environment variable management.

---

## Installation

### Prerequisites
- Node.js installed on your system.
- MySQL database setup.
- Git for version control.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/Akky7098/bookstore.git
   ```
2. Navigate to the project directory:
   ```bash
   cd bookstore
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Configure environment variables:
   Create a `.env` file and add the following:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=bookstore
   DB_PORT=3306
   PORT=3000
   JWT_SECRET=yourjwtsecret
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   ```
5. Run database migrations:
   ```bash
   npx sequelize-cli db:migrate
   ```
6. Seed the database with initial data (optional):
   ```bash
   npx sequelize-cli db:seed:all
   ```

---

## Usage

### Start the Server
```bash
npm start
```
The server will run on `http://localhost:3000`.

---


