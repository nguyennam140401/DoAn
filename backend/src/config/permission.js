const permission = {
  // Customer module permisstion
  CUSTOMER: {
    GET_CUSTOMER: 'get_customer',
    MANAGE_CUSTOMER: 'manage_customer',
    DELETE_CUSTOMER: 'delete_customer',
  },

  // new permistion in here
  ROLE: {
    GET_ROLE: 'get_role',
    MANAGE_ROLE: 'manage_role',
    DELETE_ROLE: 'delete_role',
  },
  // user module for admin permistion
  USER: {
    GET_USERS: 'get_user',
    MANAGE_USER: 'manage_user',
    DELETE_USER: 'delete_user',
  },
  PRODUCT: {
    GET_PRODUCTS: 'get_product',
    MANAGE_PRODUCT: 'manage_product',
    DELETE_PRODUCT: 'delete_product',
  },
  CATEGORY: {
    GET_CATEGORYS: 'get_category',
    MANAGE_CATEGORY: 'manage_category',
    DELETE_CATEGORY: 'delete_category',
  },
  ORDER: {
    MANAGE_ORDER: 'manage_order',
  },
  DISCOUNT: {
    MANAGE_DISCOUNT: 'manage_discount',
  },
  POST: {
    MANAGE_POST: 'manage_post',
  },
};
const permissionArr = Object.values(permission).reduce((pNow, pCurren) => {
  let pNowTemp = pNow;
  if (typeof pNow === 'object') {
    pNowTemp = Object.values(pNow);
  }
  return [...pNowTemp, ...Object.values(pCurren)];
});
module.exports = {
  permission,
  permissionArr,
};
