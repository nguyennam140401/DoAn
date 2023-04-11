const { Schema, model, Types } = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const findByIdAndPopulate = require('./plugins/findByIdAndPopulate.plugin');

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
      type: Array,
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
