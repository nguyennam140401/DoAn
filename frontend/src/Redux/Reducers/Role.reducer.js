const { default: TypeActions } = require("Redux/TypeActions");

const initialState = {
	roles: {
		results: [],
	},
	roleById: {},
	isGetRoles: false,
	isCreateRole: false,
	isUpdateRole: false,
	isDeleteRole: false,
	errors: {
		getRole: "",
		createRole: "",
		deleteRole: "",
		updateRole: "",
	},
};

const roleReducer = (state = initialState, actions) => {
	switch (actions.type) {
		case TypeActions.GET_ROLES_REQUEST:
			return {
				...state,
				roles: {
					results: [],
				},
				isGetRoles: true,
				errors: {
					...state.errors,
					getRoles: "",
				},
			};
		case TypeActions.GET_ROLES_SUCCESS:
			return {
				...state,
				roles: actions.data || { results: [] },
				isGetRoles: false,
				errors: {
					...state.errors,
					getRoles: "",
				},
			};
		case TypeActions.GET_ROLES_FAILED:
			return {
				...state,
				roles: {
					results: [],
				},
				isGetRoles: false,
				errors: {
					...state.errors,
					getRoles: actions.error,
				},
			};

		case TypeActions.CREATE_ROLE_REQUEST:
			return {
				...state,
				isCreateRole: true,
				errors: {
					...state.errors,
					createRole: "",
				},
			};
		case TypeActions.CREATE_ROLE_SUCCESS:
			return {
				...state,
				isCreateRole: false,
				errors: {
					...state.errors,
					createRole: "",
				},
			};
		case TypeActions.CREATE_ROLE_FAILED:
			return {
				...state,
				isCreateRole: false,
				errors: {
					...state.errors,
					createRole: actions.error,
				},
			};

		case TypeActions.UPDATE_ROLE_REQUEST:
			return {
				...state,
				isUpdateRole: true,
				errors: {
					...state.errors,
					updateRole: "",
				},
			};
		case TypeActions.UPDATE_ROLE_SUCCESS:
			return {
				...state,
				isUpdateRole: false,
				errors: {
					...state.errors,
					updateRole: "",
				},
			};
		case TypeActions.UPDATE_ROLE_FAILED:
			return {
				...state,
				isUpdateRole: false,
				errors: {
					...state.errors,
					updateRole: actions.error,
				},
			};

		case TypeActions.DELETE_ROLE_REQUEST:
			return {
				...state,
				isDeleteRole: true,
				errors: {
					...state.errors,
					deleteRole: "",
				},
			};
		case TypeActions.DELETE_ROLE_SUCCESS:
			return {
				...state,
				isDeleteRole: false,
				errors: {
					...state.errors,
					deleteRole: "",
				},
			};
		case TypeActions.DELETE_ROLE_FAILED:
			return {
				...state,
				isDeleteRole: false,
				errors: {
					...state.errors,
					deleteRole: actions.error,
				},
			};
		default:
			return state;
	}
};
export default roleReducer;
