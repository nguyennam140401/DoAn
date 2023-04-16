const express = require('express');
const discountController = require('../../controllers/discount.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.route('/').post(discountController.createDiscount).get(discountController.getDiscounts);

router.route('/discountsInDay').get(discountController.getDiscountsInDay);

router
  .route('/:discountId')
  .get(auth(), discountController.getDiscount)
  .patch(auth(), discountController.updateDiscount)
  .delete(auth(), discountController.deleteDiscount);

module.exports = router;
