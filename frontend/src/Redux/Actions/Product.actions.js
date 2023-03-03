import TypeActions from "Redux/TypeActions";

export const getProducts = (query, callback) => {
	return {
		type: TypeActions.GET_PRODUCTS_REQUEST,
		query,
		callback,
	};
};

export const createProduct = (body, callback) => {
	return {
		type: TypeActions.CREATE_PRODUCT_REQUEST,
		body,
		callback,
	};
};

export const updateProduct = (params, body, callback) => {
	return {
		type: TypeActions.UPDATE_PRODUCT_REQUEST,
		params,
		body,
		callback,
	};
};

export const deleteProduct = (params, callback) => {
	return {
		type: TypeActions.DELETE_PRODUCT_REQUEST,
		params,
		callback,
	};
};
export default {
	getProducts,
	createProduct,
	updateProduct,
	deleteProduct,
};
