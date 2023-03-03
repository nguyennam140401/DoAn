const httpStatus = require('http-status');
const { productService } = require('../services');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');

const getProducts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  const result = await productService.getProducts(filter, options);
  res.send(result);
});

const getProductById = catchAsync(async (req, res) => {
  const product = await productService.getProductById(req.params.id);
  if (!product) throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy sản phẩm');
  res.send(product);
});

const createProduct = catchAsync(async (req, res) => {
  const product = await productService.createProduct(req.body);
  res.status(httpStatus.CREATED).send(product);
});

const updateProduct = catchAsync(async (req, res) => {
  const product = await productService.updateProduct(req.params.id, req.body);
  res.send(product);
});

const deleteProduct = catchAsync(async (req, res) => {
  await productService.deleteProduct(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
