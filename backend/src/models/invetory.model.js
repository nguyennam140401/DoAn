const { Schema, model } = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const findByIdAndPopulate = require('./plugins/findByIdAndPopulate.plugin');

const InvetoryScheam = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    // Tổng còn trong kho hàng
    quantity: {
      type: Number,
      default: 0,
    },
    // Danh sách những người mua nào với số lượng bao nhiêu
    reservation: {
      type: Array,
    },
  },

  { collection: 'invetories', timestamps: true }
);

// add plugin that converts mongoose to json
InvetoryScheam.plugin(toJSON);
InvetoryScheam.plugin(paginate);
InvetoryScheam.plugin(findByIdAndPopulate);

/**
 * @typedef Invetory
 */
const Invetory = model('Invetory', InvetoryScheam);

module.exports = Invetory;
