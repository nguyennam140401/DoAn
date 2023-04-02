const express = require('express');
const categoryController = require('../../controllers/category.controller');
const validate = require('../../middlewares/validate');
const categoryValidate = require('../../services/category.service');

const router = express.Router();

router.route('/').post(categoryController.createCategory).get(categoryController.getCategories);

router
  .route('/:categoryId')
  .get(validate(categoryValidate.createCategory), categoryController.getCategory)
  .patch(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

module.exports = router;
