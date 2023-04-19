const express = require('express');
const { permission } = require('../../config/permission');
const { orderController } = require('../../controllers');
const auth = require('../../middlewares/auth');
const { orderValidation } = require('../../validations');
const validate = require('../../middlewares/validate');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(orderValidation.createOrder), orderController.createOrder)
  .get(auth(), orderController.getOrdersByUserId)
  .patch(auth(), orderController.updateStatusOrder);

router
  .route('/admin')
  .get(auth(permission.ORDER.MANAGE_ORDER), orderController.getOrdersByAdmin)
  .patch(auth(permission.ORDER.MANAGE_ORDER), orderController.updateStatusOrder);

router.route('/:id').patch(auth(), orderController.updateStatusOrder);
module.exports = router;
