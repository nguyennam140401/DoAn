/**
 * QUản lý phiếu giảm giá
 */
const httpStatus = require('http-status');
const { Discount } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a discount
 * @param {Object} discountBody
 * @returns {Promise<discount>}
 */
const createDiscount = async (discountBody) => {
  const discount = await Discount.create(discountBody);
  return discount;
};

/**
 * Query for discounts
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryDiscounts = async (filter, options) => {
  const discounts = await Discount.paginate(filter, options);
  return discounts;
};

const getDiscountsInDay = async () => {
  const currentDate = new Date();
  const discounts = await Discount.find({
    quantity: { $gte: 1 },
    fromDate: { $lte: currentDate }, // Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày hiện tại
    endDate: { $gte: currentDate }, // Ngày kết thúc phải lớn hơn hoặc bằng ngày hiện tại
  });
  return discounts;
};

/**
 * Get discount by id
 * @param {ObjectId} id
 * @returns {Promise<discount>}
 */
const getDiscountById = async (id) => {
  return Discount.findById(id);
};

/**
 * Update discount by id
 * @param {ObjectId} discountId
 * @param {Object} updateBody
 * @returns {Promise<discount>}
 */
const updateDiscountById = async (discountId, updateBody) => {
  const discount = await getDiscountById(discountId);
  if (!discount) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy phiếu giảm giá');
  }
  Object.assign(discount, updateBody);
  await discount.save();
  return discount;
};

/**
 * Delete discount by id
 * @param {ObjectId} discountId
 * @returns {Promise<discount>}
 */
const deleteDiscountById = async (discountId) => {
  const discount = await getDiscountById(discountId);
  if (!discount) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy phiếu giảm giá');
  }
  await discount.remove();
  return discount;
};

module.exports = {
  createDiscount,
  queryDiscounts,
  getDiscountById,
  updateDiscountById,
  deleteDiscountById,
  getDiscountsInDay,
};
