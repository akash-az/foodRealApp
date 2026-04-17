const foodModel = require("../models/food.model");
const storageService = require("../services/storage.service");
const { v4: uuid } = require("uuid");

async function createFood(req, res) {
  console.log(req.foodPartner); // this value is coming from authFoodPartnerMiddleware, we can access it in all controllers where we want to use it by writing req.foodPartner
  console.log(req.body); // when in response a file is sent (like video), server cannot read it directly so we use multer for it. multer is used as middlewear in food.routes.js file,
  // so we can access the file in req.file and other data in req.body

  console.log(req.file); // this is the file which is coming from postman form-data key "video" and it is being processed by multer middlewear in food.routes.js file

  const fileUploadResult = await storageService.uploadFile(
    req.file.buffer,
    uuid(),
  ); // this is the function created in storage.service.js file for uploading file to imagekit. it takes 2 parameter, first is the file which is coming from multer middlewear and second is the name with which we want to save the file in imagekit. here we are using uuid library for creating unique name for every file.

  console.log(fileUploadResult); // this result is coming from imagekit after uploading file, it has url of uploaded file, fileId and other details.

  const foodItem = await foodModel.create({
    name: req.body.name,
    video: fileUploadResult.url, // this is the url of uploaded video which is coming from imagekit after uploading file
    description: req.body.description,
    foodPartner: req.foodPartner._id, // this is the id of food partner which is coming from authFoodPartnerMiddleware after verifying token
  });

  res.status(201).json({
    message: "food added successfully",
    food: foodItem,
  });

  //   return res.status(200).json({
  //     message: "food Added",
  //   });
}

module.exports = { createFood };

// original filename just info : `${uuid()}-${req.file.originalname}`
