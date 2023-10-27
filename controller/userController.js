const bcrypt = require("bcrypt");
const db = require("../connection/db"); // Import your MySQL connection
const User = require("../models/User");

// User registration controller
const register = async (req, res) => {
  const { name, email, mobile, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user using Sequelize
    const user = await User.create({
      name,
      email,
      mobile,
      password: hashedPassword,
    });
    res.send("User registered successfully");
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
    res.status(500).send("Error: User registration failed");
  }
};

// User login controller
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email using Sequelize
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).send("Invalid email or password");
    }

    // Compare the entered password with the stored hashed password
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      res.send("User logged in successfully");
    } else {
      res.status(401).send("Invalid email or password");
    }
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
    res.status(500).send("Error: User login failed");
  }
};

module.exports = {
  register,
  login,
};
