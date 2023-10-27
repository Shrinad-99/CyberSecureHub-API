const { Sequelize } = require("sequelize");

// Replace these values with your actual database configuration
const database = process.env.DB_DATABASE;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST; // Change to your MySQL host if necessary
const port = process.env.DB_PORT || 3306; // Default MySQL port

const sequelize = new Sequelize(database, username, password, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  dialect: "mysql", // Use 'mysql' for MySQL
  logging: false, // Set to true for debugging (logs SQL queries)
});

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Initialize Sequelize and define models
sequelize
  .sync()
  .then(() => {
    console.log("Database synced.");
  })
  .catch((err) => {
    console.error("Database synchronization error:", err);
  });

module.exports = sequelize;
