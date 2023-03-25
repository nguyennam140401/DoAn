const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createProduct = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    code: Joi.string().required(),
    brand: Joi.string(),
    description: Joi.string().required(),
    release_date: Joi.string(),
    specs: Joi.array(),
    star: Joi.number().default(0),
    review: Joi.array().default([]),
    images: Joi.array(),
    category: Joi.string().required(),
    price: Joi.number().required(),
    options: Joi.array(),
  }),
};

const getProducts = {
  query: Joi.object().keys({
    name: Joi.string(),
    limit: Joi.number().integer(),
    sortBy: Joi.string(),
    populate: Joi.string(),
    page: Joi.number().integer(),
  }),
};

const getProduct = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateProduct = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
    code: Joi.string().required(),
    brand: Joi.string(),
    description: Joi.string().required(),
    release_date: Joi.string(),
    specs: Joi.array(),
    star: Joi.number().default(0),
    review: Joi.array().default([]),
    images: Joi.array(),
    category: Joi.string().required(),
    price: Joi.number().required(),
    options: Joi.array(),
  }),
};

const deleteProduct = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
};
