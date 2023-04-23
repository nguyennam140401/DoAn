const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

const addFavoriteProduct = catchAsync(async (req, res) => {
  const isAdd = await userService.addFavoriteProduct(req.user._id, req.body.productId);
  res.send(isAdd);
});
const checkProductIsFavorite = catchAsync(async (req, res) => {
  const isFavorite = await userService.checkProductIsFavorite(req.user._id, req.body.productId);
  res.send(isFavorite);
});
const getListFavorite = catchAsync(async (req, res) => {
  const results = await userService.getProductsFavorite(req.user._id);
  res.send(results);
});
module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  addFavoriteProduct,
  checkProductIsFavorite,
  getListFavorite,
};
