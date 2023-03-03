// const { default: TypeActions } = require("Redux/TypeActions");

import TypeActions from "./../TypeActions";

export const accountLogin = (body, callback) => {
	return {
		type: TypeActions.ACCOUNT_LOGIN_REQUEST,
		body,
		callback,
	};
};

export const accountLogOut = (body, callback) => {
	return {
		type: TypeActions.ACCOUNT_LOGOUT_REQUEST,
		body,
		callback,
	};
};

export const forgotPassword = (body, callback) => {
	return {
		type: TypeActions.ACCOUNT_FORGOT_PASSWORD_REQUEST,
		body,
		callback,
	};
};

export const resetPassword = (body, query, callback) => {
	return {
		type: TypeActions.ACCOUNT_RESET_PASSWORD_REQUEST,
		body,
		query,
		callback,
	};
};

export const getAccounts = (query, callback) => {
	return {
		type: TypeActions.GET_ACCOUNTS_REQUEST,
		query,
		callback,
	};
};

export const getCurrentAccount = (params, query, callback) => {
	return {
		type: TypeActions.GET_CURRENT_ACCOUNT_REQUEST,
		params,
		query,
		callback,
	};
};

export const getAccountById = (params, query, callback) => {
	return {
		type: TypeActions.GET_ACCOUNT_BY_ID_REQUEST,
		query,
		params,
		callback,
	};
};

export const createAccount = (body, callback) => {
	return {
		type: TypeActions.CREATE_ACCOUNT_REQUEST,
		body,
		callback,
	};
};

export const updateAccount = (params, body, callback) => {
	return {
		type: TypeActions.UPDATE_ACCOUNT_REQUEST,
		params,
		body,
		callback,
	};
};

export const deleteAccount = (params, callback) => {
	return {
		type: TypeActions.DELETE_ACCOUNT_REQUEST,
		params,
		callback,
	};
};

// export const configPasswordAccount = (body, callback) => {
// 	return {
// 		type: TypeActions.CONFIG_PASSWORD_ACCOUNT_REQUEST,
// 		body,
// 		callback,
// 	};
// };

// export const accountChangePassword = (params, body, callback) => {
// 	return {
// 		type: TypeActions.ACCOUNT_CHANGE_PASSWORD_REQUEST,
// 		params,
// 		body,
// 		callback,
// 	};
// };

export default {
	accountLogin,
	accountLogOut,
	forgotPassword,
	resetPassword,
	getAccounts,
	getCurrentAccount,
	getAccountById,
	createAccount,
	updateAccount,
	deleteAccount,
	// configPasswordAccount,
	// accountChangePassword,
};
