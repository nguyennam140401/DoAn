/**
 * Quản lý danh mục
 */
const httpStatus = require('http-status');
const { Category } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Query for categories
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCategories = async (filter, options) => {
  const categories = await Category.paginate(filter, options);
  return categories;
};

/**
 * Get category by id
 * @param {ObjectId} id
 * @returns {Promise<Category>}
 */
const getCategoryById = async (id, populate) => {
  const response = await Category.findByIdAndPopulate(id, populate);
  if (!response) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  return response;
};

/**
 * Update category by id
 * @param {ObjectId} categoryId
 * @param {Object} updateBody
 * @returns {Promise<Category>}
 */
const updateCategoryById = async (categoryId, updateBody) => {
  const category = await Category.findById(categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  Object.assign(category, updateBody);
  await category.save();
  return category;
};

/**
 * Create a category
 * @param {Object} categoryBody
 * @returns {Promise<Category>}
 */
const createCategory = async (categoryBody) => {
  let res;
  if (categoryBody.parentId) {
    const { _id, ...categoryParent } = await Category.findById(categoryBody.parentId);
    const payload = categoryParent._doc;
    res = await Category.create({ ...categoryBody, level: payload.level + 1 });
    payload.childrentIds.push(res._id);
    await updateCategoryById(_id, payload);
  } else {
    res = await Category.create(categoryBody);
  }
  return res;
};

/**
 * Delete category by id
 * @param {ObjectId} categoryId
 * @returns {Promise<Category>}
 */
const deleteCategoryById = async (categoryId) => {
  const category = await getCategoryById(categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }

  /**
   * danh mục xóa là cha
   */
  if (category.childrentIds.length > 0) {
    category.childrentIds.forEach(async (item) => {
      deleteCategoryById(item);
    });
  }

  /**
   * Xóa trong danh mục cha
   */
  if (category.parentId) {
    const { _id, ...categoryParent } = await getCategoryById(category.parentId);
    const parentData = categoryParent._doc;
    parentData.childrentIds.splice(parentData.childrentIds.indexOf(categoryId), 1);
    await await updateCategoryById(_id, parentData);
  }
  await category.remove();
  return category;
};

module.exports = {
  createCategory,
  queryCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
