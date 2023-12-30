const express = require('express');
const router = express.Router();
const {auth} = require('../controllers/auth');
const {getUser, createChatRoom, createLike, getProduct, getProductInfo, getChatRoom} = require('../controllers/home');

router.route('/user').get(auth, getUser);
router.route('/chat-room').get(auth, getChatRoom).post(auth, createChatRoom);
router.route('/like').post(auth, createLike);
router.route('/product').get(getProduct);
router.route('/product-info').get(getProductInfo);

module.exports = router