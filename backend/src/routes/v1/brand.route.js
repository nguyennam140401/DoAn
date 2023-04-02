const express = require('express');
const brandController = require('../../controllers/brand.controller');
const validate = require('../../middlewares/validate');
const brandValidate = require('../../services/brand.service');

const router = express.Router();

router.route('/').post(brandController.createBrand).get(brandController.getBrands);

router
  .route('/:brandId')
  .get(validate(brandValidate.createBrand), brandController.getBrand)
  .patch(brandController.updateBrand)
  .delete(brandController.deleteBrand);

module.exports = router;
