const express = require('express');
const router = express.Router();
const {auth} = require('../controllers/auth');
const {createSocketInfo} = require('../controllers/socket');

router.route('/socket').post(auth, createSocketInfo);

module.exports = router