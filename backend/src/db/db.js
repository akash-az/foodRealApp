const mongoose = require("mongoose");

// this function needs to be called for establishing database connection.here we only write how to connect and this function is called in server.js

function connectDB() {
  // we write here kis tarah se code connect karega database se.
  mongoose
    .connect(process.env.MONGODB_URI) // right now we are using local database but in case of cloud we have to keep link i .env file
    .then(() => {
      // this is a callback function used by writing then .
      console.log("connection established");
    })
    .catch((error) => {
      // for catching erro and logging it.
      console.log("mogodb database connection error", error);
    });
}

module.exports = connectDB;
