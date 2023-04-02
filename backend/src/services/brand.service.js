/**
 * Quản lý danh mục
 */
const httpStatus = require('http-status');
const { Brand } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Query for brands
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryBrands = async (filter, options) => {
  const brands = await Brand.paginate(filter, options);
  return brands;
};

/**
 * Get brand by id
 * @param {ObjectId} id
 * @returns {Promise<Brand>}
 */
const getBrandById = async (id) => {
  const response = await Brand.findById(id);
  if (!response) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Brand not found');
  }
  return response;
};

/**
 * Update brand by id
 * @param {ObjectId} brandId
 * @param {Object} updateBody
 * @returns {Promise<Brand>}
 */
const updateBrandById = async (brandId, updateBody) => {
  const brand = await Brand.findById(brandId);
  if (!brand) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Brand not found');
  }
  Object.assign(brand, updateBody);
  await brand.save();
  return brand;
};

/**
 * Create a brand
 * @param {Object} brandBody
 * @returns {Promise<Brand>}
 */
const createBrand = async (brandBody) => {
  let res;
  if (brandBody.parentId) {
    const { _id, ...brandParent } = await Brand.findById(brandBody.parentId);
    const payload = brandParent._doc;
    res = await Brand.create({ ...brandBody, level: payload.level + 1 });
    payload.childrentIds.push(res._id);
    await updateBrandById(_id, payload);
  } else {
    res = await Brand.create(brandBody);
  }
  return res;
};

/**
 * Delete brand by id
 * @param {ObjectId} brandId
 * @returns {Promise<Brand>}
 */
const deleteBrandById = async (brandId) => {
  const brand = await getBrandById(brandId);
  if (!brand) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Brand not found');
  }

  await brand.remove();
  return brand;
};

module.exports = {
  createBrand,
  queryBrands,
  getBrandById,
  updateBrandById,
  deleteBrandById,
};
