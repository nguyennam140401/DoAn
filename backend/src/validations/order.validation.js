const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createOrder = {
  body: Joi.object().keys({
    buyerName: Joi.string().required(),
    note: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    address: Joi.string().required(),
    products: Joi.array().items(
      Joi.object().keys({
        option: Joi.object(),
        productId: Joi.string().required(),
        quantity: Joi.number().min(1).required(),
        _id: Joi.string(),
      })
    ),
  }),
};

const getOrders = {
  query: Joi.object().keys({
    name: Joi.string(),
    limit: Joi.number().integer(),
    sortBy: Joi.string(),
    populate: Joi.string(),
    page: Joi.number().integer(),
  }),
};

const getOrder = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateOrder = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
    code: Joi.string().required(),
    brand: Joi.string().required(),
    description: Joi.string().required(),
    release_date: Joi.string(),
    specs: Joi.array(),
    star: Joi.number().default(0).min(0),
    review: Joi.array().default([]),
    images: Joi.array(),
    category: Joi.string().required(),
    price: Joi.number().default(0).min(0),
    options: Joi.array(),
    inventory: Joi.number().default(0).min(0),
    isActive: Joi.boolean(),
  }),
};

const deleteOrder = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createOrder,
  deleteOrder,
  getOrder,
  getOrders,
  updateOrder,
};
