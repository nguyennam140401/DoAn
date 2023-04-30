const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const overviewService = require('../services/overview.service');

const getOverviewUser = catchAsync(async (req, res) => {
  const result = await overviewService.getOverviewUser();
  res.send(result);
});

const getDashboardAdmin = catchAsync(async (req, res) => {
  const result = await overviewService.getDashboardAdmin();
  res.send(result);
});
module.exports = {
  getOverviewUser,
  getDashboardAdmin,
};
