const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { categorieService } = require('../services');

const createCategory = catchAsync(async (req, res) => {
  const category = await categorieService.createCategory(req.body);
  res.status(httpStatus.CREATED).send(category);
});

const getCategories = catchAsync(async (req, res) => {
  // const filter = pick(req.query, ['name', 'Category']);
  const filter = pick(req.query, ['level', 'name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  const result = await categorieService.queryCategories(filter, options);
  res.send(result);
});

const getCategory = catchAsync(async (req, res) => {
  const category = await categorieService.getCategoryById(req.params.categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  res.send(category);
});

const updateCategory = catchAsync(async (req, res) => {
  const category = await categorieService.updateCategoryById(req.params.categoryId, req.body);
  res.send(category);
});

const deleteCategory = catchAsync(async (req, res) => {
  // try {
  await categorieService.deleteCategoryById(req.params.categoryId);
  res.status(httpStatus.NO_CONTENT).send();
  // } catch (e) {
  //   res.status(httpStatus[500]).send();
  // }
});

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
