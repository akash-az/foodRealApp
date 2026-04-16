// when we are creating api for different file , we cretaes router first

const express = require("express");
const authController = require('../controllers/auth.controller')

const router = express.Router();

// (req,res) => {} is the controller. It is basically a callback function but when used with api it is referred as controller. when we are writing controller in app.js file we write
    // controller right beside path, but when creating apis in different file we make seperate file (name coontroller for writing controllers for apis).

// we create model for user in models folder to interact with database and then we write controller for register and login in controllers folder and then we write api for register and login in routes folder.
//  we have to export this router to app.js file so that it can be used there.
router.post('/user/register',authController.registerUser)
router.post('/user/login',authController.loginUser)
router.get('/user/logout',authController.logoutUser)

module.exports = router;

