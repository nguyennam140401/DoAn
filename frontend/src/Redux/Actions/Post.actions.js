import TypeActions from "Redux/TypeActions";

export const getPosts = (query, callback) => {
	return {
		type: TypeActions.GET_POSTS_REQUEST,
		query,
		callback,
	};
};

export const createPost = (body, callback) => {
	return {
		type: TypeActions.CREATE_POST_REQUEST,
		body,
		callback,
	};
};

export const updatePost = (params, body, callback) => {
	return {
		type: TypeActions.UPDATE_POST_REQUEST,
		params,
		body,
		callback,
	};
};

export const deletePost = (params, callback) => {
	return {
		type: TypeActions.DELETE_POST_REQUEST,
		params,
		callback,
	};
};
export default {
	getPosts,
	createPost,
	deletePost,
	updatePost,
};
