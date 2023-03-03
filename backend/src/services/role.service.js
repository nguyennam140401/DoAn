/**
 * QUản lý phân quyền
 */
const httpStatus = require('http-status');
const { Role } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a role
 * @param {Object} roleBody
 * @returns {Promise<role>}
 */
const createRole = async (roleBody) => {
  const role = await Role.create(roleBody);
  return role;
};

/**
 * Query for roles
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryRoles = async (filter, options) => {
  const roles = await Role.paginate(filter, options);
  return roles;
};

/**
 * Get role by id
 * @param {ObjectId} id
 * @returns {Promise<role>}
 */
const getRoleById = async (id) => {
  return Role.findById(id);
};

/**
 * Update role by id
 * @param {ObjectId} roleId
 * @param {Object} updateBody
 * @returns {Promise<role>}
 */
const updateRoleById = async (roleId, updateBody) => {
  const role = await getRoleById(roleId);
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'role not found');
  }
  if (role.name === 'admin' || role.name === 'user') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'admin or user role cannot be update');
  }
  Object.assign(role, updateBody);
  await role.save();
  return role;
};

/**
 * Delete role by id
 * @param {ObjectId} roleId
 * @returns {Promise<role>}
 */
const deleteRoleById = async (roleId) => {
  const role = await getRoleById(roleId);
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'role not found');
  }
  if (role.name === 'admin' || role.name === 'user') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'admin or user role cannot be delete');
  }
  await role.remove();
  return role;
};

module.exports = {
  createRole,
  queryRoles,
  getRoleById,
  updateRoleById,
  deleteRoleById,
};
