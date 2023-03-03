const cloudinary = require('cloudinary');
const rimraf = require('rimraf');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRECT,
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadImage = (arrImage, folder) => {
  const destination = `uploads/${folder}/`;
  let arrFile = [];
  fs.access(destination, fs.constants.F_OK, (err) => {
    if (err) {
      fs.mkdir(destination, { recursive: true }, (e) => {
        if (e) {
          console.error(e);
          return;
        }
        console.log(`Directory ${destination} was created`);
      });
    }
    arrImage.forEach((file) => {
      const source = file.path;
      const target = path.join(destination, file.originalname);
      arrFile = [...arrFile, destination + file.originalname];
      fs.rename(source, target, (e) => {
        if (e) {
          console.error(e);
          return;
        }

        console.log(`${file.originalname} was moved to ${destination}`);
        console.log(arrFile);
      });
    });
    return arrFile;
  });
};

const uploadImageTest = (req, res, next) => {
  const destination = `uploads/${req.body.name.trim()}/`;
  let arrFile = [];
  fs.access(destination, fs.constants.F_OK, (err) => {
    if (err) {
      fs.mkdir(destination, { recursive: true }, (e) => {
        if (e) {
          console.error(e);
          return;
        }
        console.log(`Directory ${destination} was created`);
      });
    }
    req?.files?.forEach((file) => {
      const source = file.path;
      const target = path.join(destination, file.originalname);
      arrFile = [...arrFile, req.body.name + '/' + file.originalname];
      fs.rename(source, target, (e) => {
        if (e) {
          console.error(e);
          return;
        }
        console.log(`${file.originalname} was moved to ${destination}`);
      });
    });
    console.log(req.body.images, arrFile);
    req.body.images = req.body.images ? [...req?.body?.images, ...arrFile] : arrFile;
    return next();
    // return res.json(arrFile);
  });
};
module.exports = {
  uploadImage,
  storage,
  uploadImageTest,
};
