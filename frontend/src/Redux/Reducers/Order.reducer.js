const { default: TypeActions } = require("Redux/TypeActions");

const initialState = {
	orders: {
		results: [],
	},
	orderById: {},
	isGetOrders: false,
	isUpdateOrder: false,
	errors: {
		getOrders: "",
		updateOrder: "",
	},
};

const orderReducer = (state = initialState, actions) => {
	switch (actions.type) {
		case TypeActions.GET_ORDERS_REQUEST:
			return {
				...state,
				orders: {
					results: [],
				},
				isGetOrders: true,
				errors: {
					...state.errors,
					getOrders: "",
				},
			};
		case TypeActions.GET_ORDERS_SUCCESS:
			return {
				...state,
				orders: actions.data || { results: [] },
				isGetOrders: false,
				errors: {
					...state.errors,
					getOrders: "",
				},
			};
		case TypeActions.GET_ORDERS_FAILED:
			return {
				...state,
				orders: {
					results: [],
				},
				isGetOrders: false,
				errors: {
					...state.errors,
					getOrders: actions.error,
				},
			};

		//Cập nhật đơn hàng
		case TypeActions.UPDATE_ORDERS_REQUEST:
			return {
				...state,
				isUpdateOrders: true,
				errors: {
					...state.errors,
					updateOrders: "",
				},
			};
		case TypeActions.UPDATE_ORDERS_SUCCESS:
			return {
				...state,
				orders: actions.data || { results: [] },
				isUpdateOrders: false,
				errors: {
					...state.errors,
					updateOrders: "",
				},
			};
		case TypeActions.UPDATE_ORDERS_FAILED:
			return {
				...state,
				orders: {
					results: [],
				},
				isUpdateOrders: false,
				errors: {
					...state.errors,
					updateOrders: actions.error,
				},
			};
		default:
			return state;
	}
};
export default orderReducer;
