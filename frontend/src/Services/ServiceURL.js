export const BASE_URL = process.env.REACT_APP_BASE_URL;
export const BASE_API = process.env.REACT_APP_BASE_API;
export const logIn = "auth/login";
export const register = "auth/register";
export const logOut = "auth/logout";
export const forgotPassword = "auth/forgot-password";
export const resetPassword = "auth/reset-password";
export const accounts = "users";
export const changePassword = "change-password";
export const configPasswordAccount = "set-password";
export const roles = "role";
export const brand = "brand";
export const discount = "discount";
export const orders = "order/admin";

export const products = "product";
export const category = "category";
export default {
	BASE_URL,
	logIn,
	logOut,
	forgotPassword,
	resetPassword,
	accounts,
	changePassword,
	configPasswordAccount,
	roles,
	products,
	category,
	orders,
	brand,
	discount,
};
