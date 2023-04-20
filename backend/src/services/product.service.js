const httpStatus = require('http-status');
const { Product } = require('../models');
const ApiError = require('../utils/ApiError');
const categorieService = require('./category.service');

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
  if (filter.category != null) {
    const populate = 'childrentIds.childrentIds.childrentIds';
    const detailCategory = await categorieService.getCategoryById(filter.category, populate);
    const arrCategoryId = detailCategory.childrentIds.reduce(
      (pre, curr) => {
        pre.push(curr.id);
        return pre;
      },
      [detailCategory.id]
    );
    filter.category = arrCategoryId;
  }

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
 * @param {MongoId} listIdProduct - danh sách id
 * @returns {Promise<Product>}
 */
const getProductFromList = async (listIdProduct) => {
  return Product.find({ _id: { $in: listIdProduct } });
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
 * @param {string} productId id product
 * @param {object} review Đánh giá của người dùng
 * @returns Trả về thông tin sản phẩm được đánh giá
 */
const addReviewProduct = async (productId, review) => {
  const product = await getProductById(productId);
  if (!product) throw new ApiError(httpStatus.NOT_FOUND, 'Không tim thấy sản phẩm này');
  if (!Array.isArray(product.review) || !product.review) product.review = [review];
  else {
    product.review.push(review);
  }
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
  addReviewProduct,
  getProductFromList,
};
