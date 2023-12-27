const express = require('express');
const router = express.Router();
const {upload, createProduct} = require('../controllers/product');
const {auth} = require('../controllers/auth');

router.route('/register').post(auth, upload.single('image'), createProduct);

module.exports = router