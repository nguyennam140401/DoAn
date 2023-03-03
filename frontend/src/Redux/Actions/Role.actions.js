import TypeActions from "Redux/TypeActions";

export const getRoles = (query, callback) => {
	return {
		type: TypeActions.GET_ROLES_REQUEST,
		query,
		callback,
	};
};

export const createRole = (body, callback) => {
	return {
		type: TypeActions.CREATE_ROLE_REQUEST,
		body,
		callback,
	};
};

export const updateRole = (params, body, callback) => {
	return {
		type: TypeActions.UPDATE_ROLE_REQUEST,
		params,
		body,
		callback,
	};
};

export const deleteRole = (params, callback) => {
	return {
		type: TypeActions.DELETE_ROLE_REQUEST,
		params,
		callback,
	};
};
export default {
	getRoles,
	createRole,
	updateRole,
	deleteRole,
};
