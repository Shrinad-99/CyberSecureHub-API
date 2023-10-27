const bcrypt = require("bcrypt");
const db = require("../connection/db"); // Import your MySQL connection
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const secretKey = "jwt-secret-key-for-cyber-secure-hub"; // Replace with your secret key

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
    const userIsValid = await bcrypt.compare(password, user.password);

    if (userIsValid) {
      // Create a JWT with user data and secret key
      const token = jwt.sign({ userId: user.id, email: user.email }, secretKey);

      // Send the token in the response
      res.json({ token });
      //   res.send("User logged in successfully");
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

const verifyToken = (req, res, next) => {
  const authHeaderValue = req.header("Authorization");

  if (!authHeaderValue) {
    return res.status(401).send("Access denied. No token provided.");
  }
  if (!authHeaderValue.startsWith("Bearer")) {
    throw new HttpErrors.Unauthorized(`
      Authorization header is not type of 'Bearer'.
      `);
  }
  const parts = authHeaderValue.split(" ");
  if (parts.length !== 2) {
    throw new HttpErrors.Unauthorized(`
     Authorization header has too many parts it must follow this pattern 'Bearer xx.yy.zz' where xx.yy.zz should be valid token
    `);
  }
  const token = parts[1];

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send("Invalid token.");
    }

    // Attach user data to the request for later use
    req.user = decoded;
    next();
  });
};

module.exports = {
  register,
  login,
  verifyToken,
};
