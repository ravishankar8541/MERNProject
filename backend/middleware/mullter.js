const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../utils/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'employees', // Optional folder name in Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const parser = multer({ storage: storage });

module.exports = parser;
