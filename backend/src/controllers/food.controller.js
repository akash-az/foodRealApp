const foodModel = require("../models/food.model");
const likeModel = require("../models/likes.model");
const saveModel = require("../models/save.model");
const storageService = require("../services/storage.service");
const { v4: uuid } = require("uuid");

// [protected api]
async function createFood(req, res) {
  console.log(req.foodPartner); // this value is coming from authFoodPartnerMiddleware, we can access it in all controllers where we want to use it by writing req.foodPartner
  console.log(req.body); // when in response a file is sent (like video), server cannot read it directly so we use multer for it. multer is used as middlewear in food.routes.js file,
  // so we can access the file in req.file and other data in req.body

  console.log(req.file); // this is the file which is coming from postman form-data key "video" and it is being processed by multer middlewear in food.routes.js file

  const fileUploadResult = await storageService.uploadFile(
    req.file.buffer,
    uuid(),
    console.log("req.file.originalname", "uuid worked"),
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

async function getFoodItems(req, res) {
  const foodItems = await foodModel.find({});

  res.status(200).json({
    message: "Food Items fetched Successfully",
    foodItems,
  });
}

async function likeFood(req, res) {
  const { foodId } = req.body;

  const user = req.user; // this value is coming from authUserMiddleware, we can access it in all controllers where we want to use it by writing req.user

  const isAlreadyLiked = await likeModel.findone({
    food: foodId,
    user: user._id,
  });

  if (!isAlreadyLiked) {
    await likeModel.deleteOne({
      user: user._id,
      food: foodId,
    });

    await foodModel.findByIdAndUpdate(foodId, {
      $inc: { likeCount: -1 },
    });

    return res.status(200).json({
      message: "food unliked successfull",
    });
  }

  const like = await foodModel.create({
    user: user._id,
    food: foodId,
  });
  await foodModel.findByIdAndUpdate(foodId, {
    $inc: { likeCount: 1 },
  });

  res.status(201).json({
    message: "food liked successfull",
    like,
  });
}

async function saveFood(req, res) {
  const { foodId } = req.body;
  const user = req.user;

  const isAlreadySaved = await saveModel.findOne({
    user: user._id,
    food: foodId,
  });

  if (!isAlreadySaved) {
    saveModel.deleteOne({
      user: user._id,
      food: foodId,
    });

    return res.status(200).json({
      message: "food removed successfully",
    });
  }

  const save = await saveModel.create({
    user: user._id,
    food: foodId,
  });

  res.status(201).json({
    message: "food saved successfully",
    save,
  });
}

// async function getAllfoods
// module.exports = { createFood };

// original filename just info : `${uuid()}-${req.file.originalname}`

module.exports = { createFood, getFoodItems, likeFood, saveFood };
