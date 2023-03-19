const { default: TypeActions } = require("Redux/TypeActions");

const initialState = {
	orders: {
		results: [],
	},
	orderById: {},
	isGetOrders: false,
	errors: {
		getOrders: "",
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
		default:
			return state;
	}
};
export default orderReducer;
