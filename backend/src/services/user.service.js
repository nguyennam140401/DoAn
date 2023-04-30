const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const { getProductById } = require('./product.service');
const { toggleArrayItem } = require('../common/commonFunction');
const productService = require('./product.service');
/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return User.create(userBody);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id).populate('roleId');
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email }).populate('roleId');
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy khách hàng');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy khách hàng');
  }
  await user.remove();
  return user;
};

/**
 * Thêm sản phẩm vào danh sách sản phẩm yêu thích của khách hàng
 * @param {String} userId ID khách hàng
 * @param {String} productId ID sản phẩm
 * @returns user
 */
const addFavoriteProduct = async (userId, productId) => {
  const user = await getUserById(userId);
  const product = await getProductById(productId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy khách hàng');
  }
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy sản phẩm');
  }
  if (!user.favorite) {
    user.favorite = [];
  }
  const res = toggleArrayItem(user.favorite, productId);
  await user.save();
  return res;
};

const checkProductIsFavorite = async (userId, productId) => {
  const user = await getUserById(userId);
  if (!user.favorite) return false;
  return user.favorite.findIndex((item) => item === productId) !== -1;
};

const getProductsFavorite = async (userId) => {
  const user = await getUserById(userId);
  if (!user.favorite) return [];
  const products = await productService.getProductFromList(user.favorite);
  return products;
};
module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  addFavoriteProduct,
  checkProductIsFavorite,
  getProductsFavorite,
};
