const { default: TypeActions } = require("Redux/TypeActions");

const initialState = {
	products: {
		results: [],
	},
	productById: {},
	isGetProducts: false,
	errors: {
		getProducts: "",
	},
};

const productReducer = (state = initialState, actions) => {
	switch (actions.type) {
		case TypeActions.GET_PRODUCTS_REQUEST:
			return {
				...state,
				products: {
					results: [],
				},
				isGetProducts: true,
				errors: {
					...state.errors,
					getProducts: "",
				},
			};
		case TypeActions.GET_PRODUCTS_SUCCESS:
			return {
				...state,
				products: actions.data || { results: [] },
				isGetProducts: false,
				errors: {
					...state.errors,
					getProducts: "",
				},
			};
		case TypeActions.GET_PRODUCTS_FAILED:
			return {
				...state,
				products: {
					results: [],
				},
				isGetProducts: false,
				errors: {
					...state.errors,
					getProducts: actions.error,
				},
			};
		default:
			return state;
	}
};
export default productReducer;
