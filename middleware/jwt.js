const jwt = require("jsonwebtoken");
const secretKey = "jwt-secret-key-for-cyber-secure-hub"; // secret key
let verifyToken = (req, res, next) => {
  const authHeaderValue = req.header("Authorization");

  if (!authHeaderValue) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided.",
    });
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

  jwt.verify(token, process.env.secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Invalid token.",
      });
    }

    // Attach user data to the request for later use
    req.user = decoded;
    next();
  });
};

module.exports = {
  verifyToken,
};
