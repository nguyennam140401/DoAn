const httpStatus = require('http-status');
const { orderService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const createOrder = catchAsync(async (req, res) => {
  const order = await orderService.createOrder(req.user.id, req.body);
  return res.status(httpStatus.CREATED).send(order);
});

const getOrdersByUserId = catchAsync(async (req, res) => {
  const orders = await orderService.getOrdersByUserId(req.user.id);
  return res.status(httpStatus.OK).send(orders);
});

const getOrdersByAdmin = catchAsync(async (req, res) => {
  const orders = await orderService.getOrdersByAdmin(req.user.id);
  return res.status(httpStatus.OK).send(orders);
});

const updateStatusOrder = catchAsync(async (req, res) => {
  const { id, status } = req.body;
  const order = await orderService.updateStatusOrder(id, status);
  return res.status(httpStatus.OK).send(order);
});
module.exports = {
  createOrder,
  getOrdersByUserId,
  getOrdersByAdmin,
  updateStatusOrder,
};
