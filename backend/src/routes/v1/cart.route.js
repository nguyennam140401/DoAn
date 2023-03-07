const express = require('express');
const { cartController, categoryController } = require('../../controllers');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.route('/').post(auth(), cartController.createCart).get(auth, categoryController.getCategories);
module.exports = router;
