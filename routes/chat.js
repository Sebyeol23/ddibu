const express = require('express');
const router = express.Router();
const {auth} = require('../controllers/auth');
const {getChatRoom, getChat, createChat} = require('../controllers/chat');

router.route('/chat-room').get(auth, getChatRoom);
router.route('/chat').get(auth, getChat).post(auth, createChat);

module.exports = router