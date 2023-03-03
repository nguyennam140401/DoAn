const express = require('express');
const multer = require('multer');
const { productController } = require('../../controllers');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { storage, uploadImageTest } = require('../../utils/uploadImage');
const { productValidation } = require('../../validations');

const router = express.Router();

const upload = multer({ storage });

router
  .route('/')
  .get(validate(productValidation.getProducts), productController.getProducts)
  .post(
    auth('manage_product'),
    upload.array('images[]', 12),
    uploadImageTest,
    validate(productValidation.createProduct),
    productController.createProduct
  );

router
  .route('/:id')
  .get(validate(productValidation.getProduct), productController.getProductById)
  .patch(
    auth('manage_product'),
    upload.array('images[]', 12),
    uploadImageTest,
    validate(productValidation.updateProduct),
    productController.updateProduct
  )
  .delete(auth('manage_product'), validate(productValidation.deleteProduct), productController.deleteProduct);

module.exports = router;
