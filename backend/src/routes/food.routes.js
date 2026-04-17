const express = require("express");
const foodController = require("../controllers/food.controller");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(), // this means file will be stored in memory as buffer.
  // we can also store file on disk by using multer.diskStorage() but for now we are storing it in memory.
});
//this route only accessed by partner,i.e protected. for making it a protected route the request is first sent to the middleware which verifies the token and adds a foodpartner values and then
// next() forwards the request to controller.
router.post(
  "/",
  authMiddleware.authFoodPartnerMiddleware,
  upload.single("video"), // this is the middlewear for uploading file, "video" is the name of the key in postman form-data where we are uploading file.
  // when we use this middlewear we can access file in req.file and other data in req.body
  foodController.createFood,
);

module.exports = router;
