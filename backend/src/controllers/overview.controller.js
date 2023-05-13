const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const overviewService = require('../services/overview.service');
const { sendEmail } = require('../services/email.service');
const { createOrderTransfer } = require('../services/transfer.service');

const getOverviewUser = catchAsync(async (req, res) => {
  const result = await overviewService.getOverviewUser();
  res.send(result);
});

const getDashboardAdmin = catchAsync(async (req, res) => {
  const result = await overviewService.getDashboardAdmin();
  res.send(result);
});
const testMail = catchAsync(async (req, res) => {
  await sendEmail('nguyennam140401@gmail.com', 'This is subject email', 'alo alo 1234');
  res.send(httpStatus.OK);
});
const testTransfer = catchAsync(async (req, res) => {
  const response = await createOrderTransfer();
  res.send(response);
});
module.exports = {
  getOverviewUser,
  getDashboardAdmin,
  testMail,
  testTransfer,
};
