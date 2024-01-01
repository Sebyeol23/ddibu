const express = require('express');
const router = express.Router();
const {createSocketInfo} = require('../controllers/socket');

router.route('/socket').post(auth, createSocketInfo);

module.exports = router