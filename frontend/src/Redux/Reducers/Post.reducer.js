const { default: TypeActions } = require("Redux/TypeActions");

const initialState = {
	posts: {
		results: [],
	},
	isGetPosts: false,
	isCreatePost: false,
	errors: {
		getPosts: "",
		createPost: "",
	},
};

const postReducer = (state = initialState, actions) => {
	switch (actions.type) {
		case TypeActions.GET_POSTS_REQUEST:
			return {
				...state,
				isGetPosts: true,
				posts: { results: [] },
				errors: { ...state.errors, getPosts: "" },
			};
		case TypeActions.GET_POSTS_SUCCESS:
			return {
				...state,
				isGetPosts: false,
				posts: actions.data || { results: [] },
				errors: { ...state.errors, getPosts: "" },
			};
		case TypeActions.GET_POSTS_FAILED:
			return {
				...state,
				isGetPosts: false,
				posts: { results: [] },
				errors: { ...state.errors, getPosts: actions.error },
			};
		default:
			return state;
	}
};

export default postReducer;
