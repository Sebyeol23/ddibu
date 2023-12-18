const express = require('express');
const router = express.Router();
const {auth} = require('../controllers/auth');
const {getUser} = require('../controllers/home');

router.route('/user').get(auth, getUser);

module.exports = router