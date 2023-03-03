const { default: TypeActions } = require("Redux/TypeActions");

const initialState = {
	categories: {
		results: [],
	},
	isGetCategories: false,
	isCreateCategory: false,
	errors: {
		getCategories: "",
		createCategory: "",
	},
};

const categoryReducer = (state = initialState, actions) => {
	switch (actions.type) {
		case TypeActions.GET_CATEGORIES_REQUEST:
			return {
				...state,
				isGetCategories: true,
				categories: { results: [] },
				errors: { ...state.errors, getCategories: "" },
			};
		case TypeActions.GET_CATEGORIES_SUCCESS:
			return {
				...state,
				isGetCategories: false,
				categories: actions.data || { results: [] },
				errors: { ...state.errors, getCategories: "" },
			};
		case TypeActions.GET_CATEGORIES_FAILED:
			return {
				...state,
				isGetCategories: false,
				categories: { results: [] },
				errors: { ...state.errors, getCategories: actions.error },
			};
		default:
			return state;
	}
};

export default categoryReducer;
