require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const sequelize = require("./connection/db"); // Import your Sequelize instance
const User = require("./models/User"); // Import your User model
app.use(express.json());

// Initialize Sequelize and define models
sequelize
  .sync()
  .then(() => {
    console.log("Database synced.");
  })
  .catch((err) => {
    console.error("Database synchronization error:", err);
  });

// Import your route files
const pingRoute = require("./routes/pingRoute");
const nmapRoute = require("./routes/nmapRoute");
const nslookupRoute = require("./routes/nslookupRoute");
const whoisRoute = require("./routes/whoisRoute");
const whatwebRoute = require("./routes/whatwebRoute");
const passwordStrengthRoute = require("./routes/passwordStrengthRoute");
const userRoute = require("./routes/userRoute");

// Use the routes
app.use("/api/ping", pingRoute);
app.use("/api/nmap", nmapRoute);
app.use("/api/nslookup", nslookupRoute);
app.use("/api/whois", whoisRoute);
app.use("/api/whatweb", whatwebRoute);
app.use("/api/password-strength", passwordStrengthRoute);
app.use("/api/user", userRoute);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
