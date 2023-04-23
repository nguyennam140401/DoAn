const httpStatus = require('http-status');
const { EnumStatusOrder } = require('../common/enummeric');
const { Order, Product, Discount } = require('../models');
const ApiError = require('../utils/ApiError');
const { productService } = require('.');

function mongooseArrayToArray(mongooseArray) {
  const array = [];
  for (let i = 0; i < mongooseArray.length; i += 1) {
    array.push(mongooseArray[i]);
  }
  return array;
}

const createOrder = async (userId, orderBody) => {
  //Kiểm tra số lượng tồn trong kho
  // const validData = await Promise.all(
  //   orderBody.products.map(async (productInCart) => {
  //     const productInDB = await Product.findById(productInCart.productId);
  //     //Lấy số lượng tồn
  //     const inventory = productInCart.option
  //       ? productInDB.options.find((item) => item.name === productInCart.option.name).inventory
  //       : productInDB.inventory;
  //     if (parseInt(productInCart.quantity, 10) > parseInt(inventory, 10)) {
  //       return false;
  //     }
  //     return true;
  //   })
  // );
  // if (validData.some((item) => item === false)) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Số lượng sản phẩm  vượt quá số lượng tồn trong kho, vui lòng kiểm tra lại');
  // }

  //Ghi giảm số lượng phiếu giảm giá
  if (orderBody.discountId) {
    const discount = await Discount.findById(orderBody.discountId);
    if (!discount) {
      throw new ApiError(httpStatus.BAD_REQUEST, `Không thể cập nhật số lượng tồn cho phiếu giảm giá ${discount.name}`);
    }
    discount.quantity -= 1;
    await discount.save();
  }
  const order = await Order.create({
    userId,
    ...orderBody,
    status: EnumStatusOrder.Pending,
  });
  //Sau khi tạo đơn hàng thành công thì cập nhật số lượng tồn cho từng sản phẩm
  const arrProductAfterUpdate = await Promise.all(
    orderBody.products.map(async (item) => {
      const productBuy = await productService.getProductById(item.productId);
      if (!productBuy) {
        throw new ApiError(httpStatus.BAD_REQUEST, `Không thể cập nhật số lượng tồn cho sản phẩm ${productBuy.name}`);
      }
      if (!item.option) {
        productBuy.inventory -= item.quantity;
        productBuy.soldQuantity += item.quantity;
      } else {
        productBuy.inventory = 0;
        productBuy.soldQuantity += item.quantity;
        // Tìm option tương ứng
        const arrOptions = JSON.parse(JSON.stringify(productBuy.options));
        const optionBuy = arrOptions.find((opt) => opt.name === item.option.name);
        optionBuy.inventory -= item.quantity;
        optionBuy.soldQuantity = parseInt(optionBuy.soldQuantity || 0, 10) + item.quantity;
        productBuy.options = arrOptions;
        await productBuy.save(); // Lưu lại productBuy sau khi đã cập nhật giá trị cho optionBuy
      }
      try {
        return await productBuy.save();
      } catch (error) {
        console.log(error);
      }
    })
  );
  order.products = arrProductAfterUpdate;
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
