// import ImageKit from "@imagekit/nodejs";

// const client = new ImageKit({
//   privateKey: process.env["IMAGEKIT_PRIVATE_KEY"], // This is the default and can be omitted
// });

// const response = await client.files.upload({
//   file: fs.createReadStream("path/to/file"),
//   fileName: "file-name.jpg",
// });

// console.log(response);

const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});


async function uploadFile(file, filename) {
  const result = await imagekit.upload({
    file: file, // required buffer data of the video will be sent in this parameter from controller where multer middlewear is used and file is accessed in req.file
    fileName: filename, // required
  });

  return result; // result will have url of uploaded file, fileId and other details.
}

module.exports = { uploadFile };
