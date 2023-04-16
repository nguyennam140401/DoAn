const express = require('express');
const postController = require('../../controllers/post.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.route('/').post(postController.createPost).get(postController.getPosts);

router
  .route('/:postId')
  .get(auth(), postController.getPost)
  .patch(auth(), postController.updatePost)
  .delete(auth(), postController.deletePost);

module.exports = router;
