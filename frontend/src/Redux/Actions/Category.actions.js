import TypeActions from "Redux/TypeActions";

export const getCategories = (query, callback) => {
	return {
		type: TypeActions.GET_CATEGORIES_REQUEST,
		query,
		callback,
	};
};

export const createCategory = (body, callback) => {
	return {
		type: TypeActions.CREATE_CATEGORY_REQUEST,
		body,
		callback,
	};
};

export const updateCategory = (params, body, callback) => {
	return {
		type: TypeActions.UPDATE_CATEGORY_REQUEST,
		params,
		body,
		callback,
	};
};

export const deleteCategory = (params, callback) => {
	return {
		type: TypeActions.DELETE_CATEGORY_REQUEST,
		params,
		callback,
	};
};
export default {
	getCategories,
	createCategory,
	deleteCategory,
	updateCategory,
};
