const { Schema, model } = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const findByIdAndPopulate = require('./plugins/findByIdAndPopulate.plugin');

const CartScheam = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: [1, 2, 3],
      default: 1,
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
        },
        quantity: Number,
      },
    ],
  },
  { collection: 'carts', timestamps: true }
);

// add plugin that converts mongoose to json
CartScheam.plugin(toJSON);
CartScheam.plugin(paginate);
CartScheam.plugin(findByIdAndPopulate);

/**
 * @typedef Cart
 */
const Cart = model('Cart', CartScheam);

module.exports = Cart;
