/**
 * Quản lý giỏ hàng
 */
const httpStatus = require('http-status');
const { Cart } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Thêm sản phẩm vào giỏ hàng
 * @param {Object} cartBody
 * @returns {Promise<Cart>}
 */
const createCart = async (userId, cartBody) => {
  let cart = await Cart.findOne({ userId }).populate('products.productId');
  const { productId, quantity } = cartBody;
  if (!cart) {
    cart = new Cart({
      userId,
      products: [],
    });
  }
  const existingItem = cart.products.find((item) => item.productId._id.equals(productId));

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.products.push({
      productId,
      quantity,
    });
  }

  await cart.save();
  return cart;
};

/**
 * Query for carts
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCarts = async (filter, options) => {
  const carts = await Cart.paginate(filter, options);
  return carts;
};

/**
 * Get cart by id
 * @param {ObjectId} userId
 * @returns {Promise<Cart>}
 */
const getCartById = async (userId) => {
  const cart = await Cart.findOne({ userId }).populate('product.productId');
  return cart;
};

/**
 * Update cart by id
 * @param {ObjectId} cartId
 * @param {Object} updateBody
 * @returns {Promise<Cart>}
 */
const updateCartById = async (cartId, updateBody) => {
  const cart = await getCartById(cartId);
  if (!cart) {
    const res = await createCart(updateBody);
    return res;
  }
  Object.assign(cart, updateBody);
  await cart.save();
  return cart;
};

/**
 * Delete cart by id
 * @param {ObjectId} cartId
 * @returns {Promise<Cart>}
 */
const deleteCartById = async (cartId) => {
  const cart = await getCartById(cartId);
  if (!cart) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
  }
  await cart.remove();
  return cart;
};

module.exports = {
  createCart,
  queryCarts,
  getCartById,
  updateCartById,
  deleteCartById,
};
