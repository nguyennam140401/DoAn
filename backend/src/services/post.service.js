/**
 * QUản lý phiếu giảm giá
 */
const httpStatus = require('http-status');
const { Post } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a post
 * @param {Object} postBody
 * @returns {Promise<post>}
 */
const createPost = async (postBody) => {
  const post = await Post.create({
    ...postBody,
    createdDate: new Date(),
    updatedDate: new Date(),
  });
  return post;
};

/**
 * Query for posts
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryPosts = async (filter, options) => {
  const posts = await Post.paginate(filter, options);
  return posts;
};

/**
 * Get post by id
 * @param {ObjectId} id
 * @returns {Promise<post>}
 */
const getPostById = async (id) => {
  return Post.findById(id);
};

/**
 * Update post by id
 * @param {ObjectId} postId
 * @param {Object} updateBody
 * @returns {Promise<post>}
 */
const updatePostById = async (postId, updateBody) => {
  const post = await getPostById(postId);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy phiếu giảm giá');
  }
  Object.assign(post, {
    ...updateBody,
    updatedDate: new Date(),
  });
  await post.save();
  return post;
};

/**
 * Delete post by id
 * @param {ObjectId} postId
 * @returns {Promise<post>}
 */
const deletePostById = async (postId) => {
  const post = await getPostById(postId);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy phiếu giảm giá');
  }
  await post.remove();
  return post;
};

module.exports = {
  createPost,
  queryPosts,
  getPostById,
  updatePostById,
  deletePostById,
};
