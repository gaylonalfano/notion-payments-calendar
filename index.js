const express = require("express");
const PORT = process.env.PORT || 5000;
// Using NODE named exports to import:
const { getPayments } = require("./services/notion");
// Using ES modules export default instead:
// import { getPayments } from "./services/notion.js";  // Error

// Use IFFY to make a quick async call
// (async () => {
//   const nPayments = await getPayments();
//   console.log(nPayments);
// })();

// Init our Express app
const app = express();

// We're going to serve a static Frontend in the public dir
// NOTE Automatically serves index.html at "/" root path
app.use(express.static("public"));

// Create our get route
// app.get("/", (req, res) => res.send("Hello World!"));

app.get("/payments", async (req, res) => {
  const payments = await getPayments();
  // Update the Response with this data and return JSON
  // NOTE Can test this new route out in Postman or Curl
  res.json(payments);
});

// Start up the the API server
app.listen(PORT, console.log(`Server started on port ${PORT}`));
