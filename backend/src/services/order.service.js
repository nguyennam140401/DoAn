const httpStatus = require('http-status');
const { Order } = require('../models');
const ApiError = require('../utils/ApiError');

const createOrder = async (userId, orderBody) => {
  const { products } = orderBody;

  const order = await Order.create({
    userId,
    products,
    status: 'pending',
  });
  return order;
};

const getOrdersByUserId = async (userId) => {
  const orders = await Order.find({ userId });

  return orders;
};

const getOrdersByAdmin = async () => {
  const orders = await Order.find({ status: 'pending' }).populate('userId', 'username');
  return orders;
};

const updateStatusOrder = async (orderId, status) => {
  const order = await Order.findById(orderId);

  if (!order) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Không tìm thấy đơn hàng này');
  }

  order.status = status;

  await order.save();
  return order;
};

module.exports = {
  createOrder,
  getOrdersByUserId,
  getOrdersByAdmin,
  updateStatusOrder,
};
