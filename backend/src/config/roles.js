const { permissionArr } = require('./permission');

const allRoles = {
  user: [],
  admin: permissionArr,
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
