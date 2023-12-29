const express = require('express');
const router = express.Router();
const {getLike} = require('../controllers/like');
const {auth} = require('../controllers/auth');

router.route('/like').get(auth, getLike);

module.exports = router