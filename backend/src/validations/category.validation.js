const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createCategory = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    level: Joi.number().default(0),
    childrentIds: Joi.array().default([]),
    parentId: Joi.string().default(null),
    specs: Joi.array().default(null),
  }),
};

const getCategories = {
  query: Joi.object().keys({
    name: Joi.string(),
    limit: Joi.number().integer(),
    sortBy: Joi.string(),
    populate: Joi.string(),
    page: Joi.number().integer(),
  }),
};

const getCategory = {
  params: Joi.object().keys({
    CategoryId: Joi.string().custom(objectId),
  }),
};

const updateCategory = {
  params: Joi.object().keys({
    CategoryId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      level: Joi.number().default(0),
      childrentIds: Joi.array().default([]),
      parentId: Joi.string().default(null),
      specs: Joi.array().default(null),
    })
    .min(1),
};

const deleteCategory = {
  params: Joi.object().keys({
    CategoryId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
