const httpStatus = require('http-status');
const { EnumStatusOrder } = require('../common/enummeric');
const { Order, Product } = require('../models');
const ApiError = require('../utils/ApiError');

const createOrder = async (userId, orderBody) => {
  //Kiểm tra số lượng hàng trong kho của từng sản phẩm
  for (const product of orderBody.products) {
    const detailProduct = await Product.findById(product.productId);
    const inventory = product.option
      ? detailProduct.options.find((item) => item.name === product.option.name).inventory
      : detailProduct.inventory;
    if (product.quantity > inventory) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Số lượng sản phẩm  vượt quá số lượng tồn trong kho, vui lòng kiểm tra lại'
      );
    }
  }
  const order = await Order.create({
    userId,
    ...orderBody,
    status: EnumStatusOrder.Pending,
  });
  return order;
};

const getOrders = async (filter, options) => {
  const orders = await Order.paginate(filter, options);
  return orders;
};

const updateStatusOrder = async (orderId, status) => {
  const order = await Order.findById(orderId);

  if (!order) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Không tìm thấy đơn hàng này');
  }

  order.status = status;

  await order.save();
  return order;
};

module.exports = {
  createOrder,
  getOrders,
  updateStatusOrder,
};
