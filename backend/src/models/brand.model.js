const { Schema, model } = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const findByIdAndPopulate = require('./plugins/findByIdAndPopulate.plugin');

const Brandscheam = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: null,
    },
  },
  { collection: 'brands', timestamps: true }
);

// add plugin that converts mongoose to json
Brandscheam.plugin(toJSON);
Brandscheam.plugin(paginate);
Brandscheam.plugin(findByIdAndPopulate);

/**
 * @typedef Brand
 */
const Brand = model('Brand', Brandscheam);

module.exports = Brand;
