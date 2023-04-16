const { Schema, model } = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const findByIdAndPopulate = require('./plugins/findByIdAndPopulate.plugin');

const PostScheam = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    createdDate: {
      type: Date,
      required: true,
    },
    updatedDate: {
      type: Date,
      required: true,
    },
  },
  { collection: 'posts', timestamps: true }
);

// add plugin that converts mongoose to json
PostScheam.plugin(toJSON);
PostScheam.plugin(paginate);
PostScheam.plugin(findByIdAndPopulate);

/**
 * @typedef Post
 */
const Post = model('Post', PostScheam);

module.exports = Post;
