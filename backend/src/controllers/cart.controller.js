const httpStatus = require('http-status');
const { cartService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const createCart = catchAsync(async (req, res) => {
  const cart = await cartService.createCart(req.user.id, res.body);
  return res.status(httpStatus.OK).send(cart);
});

module.exports = {
  createCart,
};
