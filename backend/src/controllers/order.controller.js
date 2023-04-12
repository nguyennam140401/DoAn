const httpStatus = require('http-status');
const { orderService } = require('../services');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');

const createOrder = catchAsync(async (req, res) => {
  const order = await orderService.createOrder(req.user.id, req.body);
  return res.status(httpStatus.CREATED).send(order);
});

const getOrdersByUserId = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role', 'status']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  const orders = await orderService.getOrders(filter, options);
  return res.status(httpStatus.OK).send(orders);
});

const getOrdersByAdmin = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  const orders = await orderService.getOrders(filter, options);
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
