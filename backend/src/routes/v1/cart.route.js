const express = require('express');
const { cartController } = require('../../controllers');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.route('/').get(auth(), cartController.getCartByUser).post(auth(), cartController.createCart);
router.route('/:id').get(auth(), cartController.removeCartItem);
module.exports = router;
