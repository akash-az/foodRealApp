const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      // we dont make password requirement true : bcuz when using google auth password is not required
    },
  },
  {
    timestamps: true, // used to manage when user record was created and when it was updated
  },
);

const userModel = mongoose.model("user",userSchema);

module.exports = userModel;
