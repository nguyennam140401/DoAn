const express = require('express');
const { cartController } = require('../../controllers');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.route('/').post(auth, cartController.createCart);
module.exports = router;
