const express = require('express');
const { permission } = require('../../config/permission');
const { orderController } = require('../../controllers');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.route('/').post(auth, orderController.createOrder).get(auth, orderController.getOrdersByUserId);

router
  .route('/admin')
  .get(auth(permission.ORDER.MANAGE_ORDER), orderController.getOrdersByAdmin)
  .post(auth(permission.ORDER.MANAGE_ORDER), orderController.updateStatusOrder);

module.exports = router;
