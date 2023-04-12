const { Schema, model } = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const findByIdAndPopulate = require('./plugins/findByIdAndPopulate.plugin');

const DiscontScheam = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: Number, // Các loại giảm giá ( trực tiếp, %,...)
      required: true,
      unique: true,
    },
    fromDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  { collection: 'disconts', timestamps: true }
);

// add plugin that converts mongoose to json
DiscontScheam.plugin(toJSON);
DiscontScheam.plugin(paginate);
DiscontScheam.plugin(findByIdAndPopulate);

/**
 * @typedef Discont
 */
const Discont = model('Discont', DiscontScheam);

module.exports = Discont;
