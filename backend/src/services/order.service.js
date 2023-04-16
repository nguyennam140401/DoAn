const httpStatus = require('http-status');
const { EnumStatusOrder } = require('../common/enummeric');
const { Order, Product, Discount } = require('../models');
const ApiError = require('../utils/ApiError');

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
    await Discount.updateOne({ _id: orderBody.discountId }, { $inc: { quantity: -1 } }, (error, discount) => {
      console.log(discount);
      if (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, `Không thể cập nhật số lượng tồn cho phiếu giảm giá ${discount.name}`);
      }
    });
  }
  const order = await Order.create({
    userId,
    ...orderBody,
    status: EnumStatusOrder.Pending,
  });
  // .then(() => {
  //   //Sau khi tạo đơn hàng thành công thì cập nhật số lượng tồn cho từng sản phẩm
  //   orderBody.products.forEach(async (item) => {
  //     if (!item.option) {
  //       await Product.updateOne(
  //         { _id: item.productId },
  //         { $inc: { inventory: -item.quantity, soldQuantity: item.quantity } },
  //         (error, product) => {
  //           if (error) {
  //             throw new ApiError(httpStatus.BAD_REQUEST, `Không thể cập nhật số lượng tồn cho sản phẩm ${product.name}`);
  //           }
  //         }
  //       );
  //     } else {
  //       const product = await productService.getProductById(item.productId);
  //       if (!product) {
  //         throw new ApiError(httpStatus.BAD_REQUEST, `Không thể cập nhật số lượng tồn cho sản phẩm ${product.name}`);
  //       }
  //       // await Product.updateOne({ _id: item.productId }, { options: [...options] }, (error, productRes) => {
  //       //   if (error) {
  //       //     throw new ApiError(httpStatus.BAD_REQUEST, `Không thể cập nhật số lượng tồn cho sản phẩm ${productRes.name}`);
  //       //   }
  //       // });
  //       // Tìm option tương ứng
  //       const optionIdx = product.options.findIndex((opt) => opt.name === item.option.name);
  //       // Trừ số lượng sản phẩm từ kho
  //       const { options: optionsChange } = product;
  //       optionsChange[optionIdx].inventory = '100';

  //       // product.options = options;
  //       // // Cộng số lượng đã bán vào option tương ứng
  //       // // product.options[optionIdx].soldQuantity =
  //       // //   parseInt(product.options[optionIdx].soldQuantity || 0, 10) + parseInt(item.quantity, 10);
  //       // // Lưu lại thông tin của sản phẩm
  //       // try {
  //       //   await product.save();
  //       //   console.log(product);
  //       // } catch (err) {
  //       //   console.log(err);
  //       // }
  //       console.log(optionsChange);
  //       await Product.updateOne({ _id: item.productId }, { options: optionsChange }, (error, productRes) => {
  //         if (error) {
  //           throw new ApiError(httpStatus.BAD_REQUEST, `Không thể cập nhật số lượng tồn cho sản phẩm ${productRes.name}`);
  //         }
  //       });
  //     }
  //   });
  // });
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
