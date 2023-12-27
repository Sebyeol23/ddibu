const express = require('express');
const router = express.Router();
const {auth} = require('../controllers/auth');
const {getUser, updateUser} = require('../controllers/profile.js');

router.route('/user').get(auth, getUser).put(auth, updateUser);

module.exports = router