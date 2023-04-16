const { default: TypeActions } = require("Redux/TypeActions");

const initialState = {
	discounts: {
		results: [],
	},
	isGetDiscounts: false,
	isCreateDiscount: false,
	errors: {
		getDiscounts: "",
		createDiscount: "",
	},
};

const discountReducer = (state = initialState, actions) => {
	switch (actions.type) {
		case TypeActions.GET_DISCOUNTS_REQUEST:
			return {
				...state,
				isGetDiscounts: true,
				discounts: { results: [] },
				errors: { ...state.errors, getDiscounts: "" },
			};
		case TypeActions.GET_DISCOUNTS_SUCCESS:
			return {
				...state,
				isGetDiscounts: false,
				discounts: actions.data || { results: [] },
				errors: { ...state.errors, getDiscounts: "" },
			};
		case TypeActions.GET_DISCOUNTS_FAILED:
			return {
				...state,
				isGetDiscounts: false,
				discounts: { results: [] },
				errors: { ...state.errors, getDiscounts: actions.error },
			};
		default:
			return state;
	}
};

export default discountReducer;
