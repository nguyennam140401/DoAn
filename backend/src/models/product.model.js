const { Schema, model, Types } = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const findByIdAndPopulate = require('./plugins/findByIdAndPopulate.plugin');

// const ReviewSchema = new Schema({
//   name: {
//     rating: {
//       type: Number,
//       required: true,
//     },
//     userId: {
//       type: Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//     comment: {
//       type: String,
//       required: true,
//     },
//   },
// });
const ReviewSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  comment: String,
  rating: Number,
});
const ProductScheam = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    brand: {
      type: Types.ObjectId,
      ref: 'Brand',
      required: true,
    },
    price: {
      type: Number,
    },
    description: {
      type: String,
      required: true,
    },
    specs: {
      type: Array,
      default: [],
    },
    review: {
      type: [ReviewSchema],
      default: [],
    },
    images: {
      type: Array,
      default: [],
    },
    category: {
      type: Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    options: {
      type: Array,
      default: [],
    },
    inventory: {
      type: Number,
      default: 0,
    },
    soldQuantity: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { collection: 'products', timestamps: true }
);

// add plugin that converts mongoose to json
ProductScheam.plugin(toJSON);
ProductScheam.plugin(paginate);
ProductScheam.plugin(findByIdAndPopulate);

/**
 * @typedef Product
 */
const Product = model('Product', ProductScheam);

module.exports = Product;
