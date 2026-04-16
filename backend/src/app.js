// create server

const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");

const app = express(); // create instance of a server

app.use(cookieParser()); // middlewear
app.use(express.json()); //  middleware for reading data from request body. data redable banata hai requst body ka.

app.get("/", (req, res) => {
  res.send("hellooo");
}); // dummy route (req,res) => {} is the controller. It is basically a callback function but when used with api it is referred as controller. when we are writing controller in app.js file we write
// controller right beside path, but when creating apis in different file we make seperate file (name coontroller for writing controllers for apis).

app.use("/api/auth", authRoutes); // here prefix ("/api/auth") is not necessary. But for production apis should be categorized.

module.exports = app; // export this server so that it can be run in server.js or anywhere.
