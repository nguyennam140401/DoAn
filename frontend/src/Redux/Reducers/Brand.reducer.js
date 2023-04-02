const { default: TypeActions } = require("Redux/TypeActions");

const initialState = {
	brands: {
		results: [],
	},
	isGetBrands: false,
	isCreateBrand: false,
	errors: {
		getBrands: "",
		createBrand: "",
	},
};

const brandReducer = (state = initialState, actions) => {
	switch (actions.type) {
		case TypeActions.GET_BRANDS_REQUEST:
			return {
				...state,
				isGetBrands: true,
				brands: { results: [] },
				errors: { ...state.errors, getBrands: "" },
			};
		case TypeActions.GET_BRANDS_SUCCESS:
			return {
				...state,
				isGetBrands: false,
				brands: actions.data || { results: [] },
				errors: { ...state.errors, getBrands: "" },
			};
		case TypeActions.GET_BRANDS_FAILED:
			return {
				...state,
				isGetBrands: false,
				brands: { results: [] },
				errors: { ...state.errors, getBrands: actions.error },
			};
		default:
			return state;
	}
};

export default brandReducer;
