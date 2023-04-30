/**
 * Dữ liệu bao quát (dashboard, trang chủ ,....)
 */

const { TypeDiscountVoucherEnum } = require('../common/enummeric');
const { Product, User, Order } = require('../models');
const Service = require('./index');

/**
 * Lấy dữ liệu cho trang chủ bên khách hàng
 */
const getOverviewUser = async () => {
  const paramCategory = {
    level: 0,
  };
  const allCategory = await Service.categorieService.queryCategories(paramCategory, {});

  const res = await Promise.all(
    allCategory.results.map(async (item) => {
      const paramProduct = {
        category: item.id,
      };
      const resProduct = await Service.productService.getProducts(paramProduct, {});
      return { ...item._doc, products: resProduct.results };
    })
  );
  return res;
};

const calcDiscountPrice = (discountVoucher, totalPrice) => {
  if (!discountVoucher) return 0;
  const result = !discountVoucher
    ? 0
    : discountVoucher.type === TypeDiscountVoucherEnum.Price
    ? discountVoucher.amount
    : discountVoucher.amount * 0.01 * totalPrice;
  return result;
};

const getTotalAmountOrder = (data) => {
  const totalAmout = data.products.reduce((pre, curr) => pre + curr.quantity * curr.productId.price, 0);
  console.log(totalAmout);
  return totalAmout;
};
const getDashboardAdmin = async () => {
  //Lấy số sản phẩm
  const totalProduct = await Product.countDocuments();
  //Lấy số người dùng
  const totalUser = await User.countDocuments({ role: 'user' });
  //Lấy tổng doanh thu
  const allOrder = await Order.find().populate('products.productId');
  const totalRevenue = allOrder.reduce((pre, cur) => pre + getTotalAmountOrder(cur), 0);
  //Lấy tổng đơn hàng
  const totalOrder = await Order.countDocuments();
  //Lấy danh sách sản phẩm bán chạy nhất
  const listProductHot = await Product.find().select('name soldQuantity').sort({ soldQuantity: -1 });
  return {
    totalProduct,
    totalUser,
    totalOrder,
    totalRevenue,
    listProductHot,
  };
};
module.exports = {
  getOverviewUser,
  getDashboardAdmin,
};
