const { Schema, model } = require('mongoose');
const { EnumStatusOrder } = require('../common/enummeric');
const { toJSON, paginate } = require('./plugins');
const findByIdAndPopulate = require('./plugins/findByIdAndPopulate.plugin');

const OrderScheam = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    shipping: Object,
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
        },
        quantity: Number,
        option: Object,
      },
    ],
    status: {
      type: Number,
      enum: EnumStatusOrder,
      default: EnumStatusOrder.Pending,
    },
    paymentMethod: {
      type: String,
      enum: ['transfer', 'cart'],
      require,
    },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    buyerName: {
      type: String,
      required: true,
    },
    note: {
      type: String,
    },
  },
  { collection: 'orders', timestamps: true }
);

// add plugin that converts mongoose to json
OrderScheam.plugin(toJSON);
OrderScheam.plugin(paginate);
OrderScheam.plugin(findByIdAndPopulate);

/**
 * @typedef Order
 */
const Order = model('Order', OrderScheam);

module.exports = Order;
