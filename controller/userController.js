const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

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
    res.status(500).json({
      error: error.message,
      message: "Error: User registration failed",
    });
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
    const userIsValid = await bcrypt.compare(password, user.password);

    if (userIsValid) {
      // Create a JWT with user data and secret key
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.secretKey
      );

      // Send the token in the response
      res.json({ token, message: "User logged in successfully" });
    } else {
      res.status(401).send("Invalid email or password");
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "Error: User login failed" });
  }
};

module.exports = {
  register,
  login,
};
