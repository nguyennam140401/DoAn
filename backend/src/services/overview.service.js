/**
 * Dữ liệu bao quát (dashboard, trang chủ ,....)
 */

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

module.exports = {
  getOverviewUser,
};
