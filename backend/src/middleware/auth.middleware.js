const foodPartnerModel = require("../models/foodpartner.model");
const jwt = require("jsonwebtoken");

// middle wares have 3 parameters,controllers usuallly have 2.
async function authFoodPartnerMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized access",
    });
  }

  try {
    const decoded =  jwt.verify(token, process.env.JWT_SECRET); // jwt.verify() , function verifies the token and takes 2 parameter, 
    // the token created in cookies etc.. or actual secret key created // also return the data saved in tokn in object form. in this case "id" was saved so id is returned , 
    // if token is not right then this function returns error, this si why try catch is being used.

    const foodPartner = await foodPartnerModel.findById(decoded.id); 

    req.foodPartner = foodPartner // we are creating new value in req with name "foodpartner"

    next()

  } catch (err) {
        return res.status(401).json({
            message:"please login first"
        })
  }
}



module.exports = {authFoodPartnerMiddleware}
