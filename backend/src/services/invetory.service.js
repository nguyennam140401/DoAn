/**
 * Danh sách hàng tồn kho
 */
const httpStatus = require('http-status');
const { Invetory } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Query for invetories
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCategories = async (filter, options) => {
  const invetories = await Invetory.paginate(filter, options);
  return invetories;
};

/**
 * Get invetory by id
 * @param {ObjectId} id
 * @returns {Promise<Invetory>}
 */
const getInvetoryById = async (id) => {
  return Invetory.findById(id);
};

/**
 * Update invetory by id
 * @param {ObjectId} invetoryId
 * @param {Object} updateBody
 * @returns {Promise<Invetory>}
 */
const updateInvetoryById = async (invetoryId, updateBody) => {
  const invetory = await getInvetoryById(invetoryId);
  if (!invetory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invetory not found');
  }

  invetory.quantity += updateBody.count;
  const buyer = invetory.reservation.find((item) => item._id === updateBody.buyerId)[0];
  buyer.count += updateBody.count;
  await invetory.save();
  return invetory;
};

/**
 * Create a invetory
 * @param {Object} invetoryBody
 * @returns {Promise<Invetory>}
 */
const createInvetory = async (invetoryBody) => {
  const res = Invetory.create(invetoryBody);
  if (invetoryBody.parentId) {
    const { _id, ...invetoryParent } = Invetory.findById(invetoryBody.parentId);
    invetoryParent.childrentIds.push(res._id);
    await updateInvetoryById(_id, invetoryParent);
  }
  return res;
};

/**
 * Delete invetory by id
 * @param {ObjectId} invetoryId
 * @returns {Promise<Invetory>}
 */
const deleteInvetoryById = async (invetoryId) => {
  const invetory = await getInvetoryById(invetoryId);
  if (!invetory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invetory not found');
  }
  if (invetory.parentId) {
    const { _id, ...invetoryParent } = Invetory.findById(invetory.parentId);
    invetoryParent.childrentIds.splice(invetoryParent.childrentIds.indexOf(_id), 1);
    await updateInvetoryById(_id, invetoryParent);
  }
  await invetory.remove();
  return invetory;
};

module.exports = {
  createInvetory,
  queryCategories,
  getInvetoryById,
  updateInvetoryById,
  deleteInvetoryById,
};
