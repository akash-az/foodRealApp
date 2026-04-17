const mongoose = require('mongoose')

const foodPartnerScheman = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true

    }
})

const foodpartnermodel = mongoose.model("foodpartner", foodPartnerScheman);

module.exports = foodpartnermodel;