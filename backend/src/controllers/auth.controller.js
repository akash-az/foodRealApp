const userModel = require("../models/user.model");
const foodPartnerModel = require("../models/foodpartner.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// this key is saved in .env file. In corder to access data from .env file , we have to instal  package dotenv.
// then in server.js :  require("dotenv").config(); // no need to save in a variable , just directly require it.

async function registerUser(req, res) {
  console.log("BODY:", req.body);

  const { fullName, email, password } = req.body; // express server cannot automatially read data from req.body. we need middleware for it.
  // We use app.use(express.json()); //  middleware for reading data from request body. data redable banata hai requst body ka. in app.js

  // then we check if an accnt already exists with coming info.

  const isUserAlreadyExist = await userModel.findOne({
    email,
  });

  if (isUserAlreadyExist) {
    return res.status(400).json({
      message: "user already exists",
    });
  }

  // if existing user is not here with coming request then we move ahead. We hash the password , so in case of data breach password cannot be accessed and user accnt is safe.
  // we use library for it ("bcrypt : libraryName = bcryptjs )")

  const hashedPassword = await bcrypt.hash(password, 10); // it takes 2 value actual password and no of rounds of hashing required

  const user = await userModel.create({
    fullName,
    email,
    password: hashedPassword,
  });

  // to know from  where the request is coming from we create a token. This token is saved in cookies.For creating token we need package ("jsonwebtoken") and then to
  // save this token in cookies  ("cookie-parser"). jsonwebtoken is used here in auth-controller but cookie-parser is used as middle wear in app.js

  const token = jwt.sign(
    {
      // jwt.sign() is used for creating token
      id: user._id, // user info is passed as object. id should be unique. 2nd value is jwt secret key
    },
    process.env.JWT_SECRET, // this key is saved in .env file. In corder to access data from .env file , we have to instal  package dotenv.
    // then in server.js :  require("dotenv").config(); // no need to save in a variable , just directly require it.
  ); // generated from jwtsecrets.com // used 128 bits as increasing will increase security but increase load on server too.

  res.cookie("token", token);

  res.status(201).json({
    message: "user registered successfully",
    user: {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
      // password is never sent at frontend. no api should leak password at frontend
    },
  });
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({
    email,
  });

  if (!user) {
    return res.status(400).json({
      // 400 response code
      message: "invalid user or password ", // there Are usually 2 types of attacks dictionary, brute force.
      //  Aur isko delay krne ke liye ye response bhejte hain taaki narrow down na ho paye ki galat kya hai
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "invalid user or password",
    });
  }

  // ek baar email and password verify ho jaega to token generate karenge aur cookie mein save karenge.

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "user logged in successfully",

    user: {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
    },
  });

  // res.json("user logged in");
}

async function logoutUser(req, res) {
  res.clearCookie("token"); // built in function for clearing token from cookies
  res.status(200).json({
    message: "user logged out",
  });
}

async function registerFoodPartner(req, res) {
  const { name, email, password } = req.body;

  const isAccountAlreadyExists = await foodPartnerModel.findOne({ email });

  if (isAccountAlreadyExists) {
    return res.status(400).json({
      message: "Account already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const foodPartner = await foodPartnerModel.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ id: foodPartner._id }, process.env.JWT_SECRET);

  res.cookie("token", token);

  return res.status(201).json({
    message: "User is registered successfully",
    user: {
      _id: foodPartner._id,
      name: foodPartner.name,
      email: foodPartner.email,
    },
  });
}

async function loginFoodPartner(req, res) {
  const { email, password } = req.body;

  const partner = await foodPartnerModel.findOne({
    email
  });

  if (!partner) {
    return res.status(401).json({
      message: "Invalid user id or password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, partner.password);

  if (!isPasswordValid) {
   return res.status(401).json({
      message: "Invalid username or password",
    });
  }

  const token = jwt.sign(
    {
      id: partner._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  return res.status(201).json(
    {
      message: "partner logged in successfully ",
    },
    {
      _id: partner._id,
      name: partner.name,
    },
  );
}

async function logoutFoodPartner (req,res) {

res.clearCookie("token");

res.status(200).json({
  message:"user logged out successfully"
})

}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner
};
