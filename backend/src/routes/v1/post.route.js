const express = require('express');
const multer = require('multer');
const postController = require('../../controllers/post.controller');
const auth = require('../../middlewares/auth');
const { storage, uploadImageTest } = require('../../utils/uploadImage');

const router = express.Router();

const upload = multer({ storage });
router.route('/').post(upload.array('images', 12), uploadImageTest, postController.createPost).get(postController.getPosts);

router
  .route('/:postId')
  .get(postController.getPost)
  .patch(auth(), upload.array('images[]', 12), uploadImageTest, postController.updatePost)
  .delete(auth(), postController.deletePost);

module.exports = router;
