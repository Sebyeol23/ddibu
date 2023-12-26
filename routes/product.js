const express = require('express');
const router = express.Router();
const {upload, createProduct} = require('../controllers/product');

router.route('/register').post(upload.single('image'), createProduct);

module.exports = router