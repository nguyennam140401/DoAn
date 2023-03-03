const { Schema, model } = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const findByIdAndPopulate = require('./plugins/findByIdAndPopulate.plugin');

const Categoriescheam = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    childrentIds: {
      type: Array,
      default: null,
    },
    level: {
      type: Number,
      default: 0,
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    specs: {
      type: Array,
      default: null,
    },
  },
  { collection: 'categories', timestamps: true }
);

// add plugin that converts mongoose to json
Categoriescheam.plugin(toJSON);
Categoriescheam.plugin(paginate);
Categoriescheam.plugin(findByIdAndPopulate);

/**
 * @typedef Category
 */
const Category = model('Category', Categoriescheam);

module.exports = Category;
