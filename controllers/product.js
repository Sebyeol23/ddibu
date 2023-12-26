const multer = require('multer');
const path = require('path');

const uploadDir = path.join(__dirname, '../public/images');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

function createProduct(req, res){
  res.sendStatus(200);
}

module.exports = {
  upload,
  createProduct
}