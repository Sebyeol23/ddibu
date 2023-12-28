const express = require('express');
const router = express.Router();
const {auth} = require('../controllers/auth');
const {getChatRoom} = require('../controllers/chat');

router.route('/chat-room').get(auth, getChatRoom);

module.exports = router