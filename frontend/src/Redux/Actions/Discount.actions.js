import TypeActions from "Redux/TypeActions";

export const getDiscounts = (query, callback) => {
	return {
		type: TypeActions.GET_DISCOUNTS_REQUEST,
		query,
		callback,
	};
};

export const createDiscount = (body, callback) => {
	return {
		type: TypeActions.CREATE_DISCOUNT_REQUEST,
		body,
		callback,
	};
};

export const updateDiscount = (params, body, callback) => {
	return {
		type: TypeActions.UPDATE_DISCOUNT_REQUEST,
		params,
		body,
		callback,
	};
};

export const deleteDiscount = (params, callback) => {
	return {
		type: TypeActions.DELETE_DISCOUNT_REQUEST,
		params,
		callback,
	};
};
export default {
	getDiscounts,
	createDiscount,
	deleteDiscount,
	updateDiscount,
};
