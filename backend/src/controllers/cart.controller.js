const httpStatus = require('http-status');
const { cartService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const createCart = catchAsync(async (req, res) => {
  const cart = await cartService.createCart(req.user.id, req.body);
  return res.status(httpStatus.OK).send(cart);
});
const getCartByUser = catchAsync(async (req, res) => {
  const { id: userId } = req.user;
  const cart = await cartService.getCartById(userId);
  return res.status(httpStatus.OK).send(cart);
});
const removeCartItem = catchAsync(async (req, res) => {
  const { id: userId } = req.user;
  const { id: productId, optionName } = req.query;
  const cart = await cartService.removeCartItem(userId, productId, optionName);
  return res.status(httpStatus.OK).send(cart);
});
module.exports = {
  createCart,
  getCartByUser,
  removeCartItem,
};
