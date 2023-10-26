const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

// Import your route files
const pingRoute = require("./routes/pingRoute");
const nmapRoute = require("./routes/nmapRoute");
const nslookupRoute = require("./routes/nslookupRoute");
const whoisRoute = require("./routes/whoisRoute");
const whatwebRoute = require("./routes/whatwebRoute");
const passwordStrengthRoute = require("./routes/passwordStrengthRoute");

// Use the routes
app.use("/api/ping", pingRoute);
app.use("/api/nmap", nmapRoute);
app.use("/api/nslookup", nslookupRoute);
app.use("/api/whois", whoisRoute);
app.use("/api/whatweb", whatwebRoute);
app.use("/api/password-strength", passwordStrengthRoute);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
