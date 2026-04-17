const mongoose = require("mongoose");
const foodPartnerModel = require("./foodpartner.model");

const foodSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  video: {
    type: String, // stored url in database
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  foodPartner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "foodpartner",
  },
});

const foodModel = mongoose.model("food", foodSchema);

module.exports = foodModel;
