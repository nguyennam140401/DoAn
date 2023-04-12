const httpStatus = require('http-status');
const { Product } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getProducts = async (filter, options) => {
  const products = await Product.paginate({ ...filter }, options);
  return products;
};

/**
 *
 * @param {MongoId} idProduct - id của sản phẩm
 * @returns {Promise<Product>}
 */
const getProductById = async (idProduct) => {
  return Product.findById(idProduct);
};

/**
 *
 * @param {Object} productBody - Thông tin sản phẩm
 * @returns {Promise<Product>}
 */
const createProduct = async (productBody) => {
  return Product.create(productBody);
};

/**
 *
 * @param {MongoId} productId Id sản phẩm
 * @param {Object} productBody Thông tin sản phẩm
 * @returns {<Promise<Product>} t
 */
const updateProduct = async (productId, productBody) => {
  const product = await getProductById(productId);
  if (!product) throw new ApiError(httpStatus.NOT_FOUND, 'Không tim thấy sản phẩm này');
  Object.assign(product, productBody);
  await product.save();
  return product;
};

/**
 *
 * @param {MongoId} idProduct id sản phẩm
 * @returns {Promise<Product>}
 */
const deleteProduct = async (idProduct) => {
  const product = await getProductById(idProduct);
  if (!product) throw new ApiError(httpStatus.NOT_FOUND, 'Không tim thấy sản phẩm này');
  await product.remove();
  return product;
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
