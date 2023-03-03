const Joi = require('joi');
const { permissionArr } = require('../config/permission');
const { objectId } = require('./custom.validation');

const createrole = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    permission: Joi.array().items(Joi.string().valid(...permissionArr)),
  }),
};

const getroles = {
  query: Joi.object().keys({
    name: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    take: Joi.number().integer(),
  }),
};

const getrole = {
  params: Joi.object().keys({
    roleId: Joi.string().custom(objectId),
  }),
};

const updaterole = {
  params: Joi.object().keys({
    roleId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      permission: Joi.array()
        .items(Joi.string().valid(...permissionArr))
        .required(),
    })
    .min(1),
};

const deleterole = {
  params: Joi.object().keys({
    roleId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createrole,
  getroles,
  getrole,
  updaterole,
  deleterole,
};
