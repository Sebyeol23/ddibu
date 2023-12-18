const express = require('express');
const router = express.Router();
const {createUser, getToken} = require('../controllers/account');

router.route('/sign-up').post(createUser);
router.route('/sign-in').post(getToken);

module.exports = router