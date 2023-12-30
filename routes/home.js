const express = require('express');
const router = express.Router();
const {auth} = require('../controllers/auth');
const {getUser, createChatRoom, createLike, getProduct, getProductInfo} = require('../controllers/home');

router.route('/user').get(auth, getUser);
router.route('/chat-room').post(auth, createChatRoom);
router.route('/like').post(auth, createLike);
router.route('/product').get(getProduct);
router.route('/product-info').get(getProductInfo);

module.exports = router