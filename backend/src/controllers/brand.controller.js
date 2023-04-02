const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { brandService } = require('../services');

const createBrand = catchAsync(async (req, res) => {
  const brand = await brandService.createBrand(req.body);
  res.status(httpStatus.CREATED).send(brand);
});

const getBrands = catchAsync(async (req, res) => {
  // const filter = pick(req.query, ['name', 'Brand']);
  const filter = pick(req.query, ['level', 'name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  const result = await brandService.queryBrands(filter, options);
  res.send(result);
});

const getBrand = catchAsync(async (req, res) => {
  const brand = await brandService.getBrandById(req.params.brandId);
  if (!brand) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Brand not found');
  }
  res.send(brand);
});

const updateBrand = catchAsync(async (req, res) => {
  const brand = await brandService.updateBrandById(req.params.brandId, req.body);
  res.send(brand);
});

const deleteBrand = catchAsync(async (req, res) => {
  // try {
  await brandService.deleteBrandById(req.params.brandId);
  res.status(httpStatus.NO_CONTENT).send();
  // } catch (e) {
  //   res.status(httpStatus[500]).send();
  // }
});

module.exports = {
  createBrand,
  getBrands,
  getBrand,
  updateBrand,
  deleteBrand,
};
