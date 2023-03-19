import TypeActions from "Redux/TypeActions";

export const getOrders = (query, callback) => {
	return {
		type: TypeActions.GET_ORDERS_REQUEST,
		query,
		callback,
	};
};

export const createOrder = (body, callback) => {
	return {
		type: TypeActions.CREATE_ORDER_REQUEST,
		body,
		callback,
	};
};

export const updateOrder = (params, body, callback) => {
	return {
		type: TypeActions.UPDATE_ORDER_REQUEST,
		params,
		body,
		callback,
	};
};

export const deleteOrder = (params, callback) => {
	return {
		type: TypeActions.DELETE_ORDER_REQUEST,
		params,
		callback,
	};
};
export default {
	getOrders,
	createOrder,
	updateOrder,
	deleteOrder,
};
