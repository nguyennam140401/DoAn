import TypeActions from "Redux/TypeActions";

const initialState = {
	isLogIn: false,
	isLogOut: false,
	isForgotPassword: false,
	isResetPassword: false,

	isGetAccounts: false,
	isGetCurrentAccount: false,
	isGetAccountById: false,
	isCreateAccount: false,
	isUpdateAccount: false,
	isDeleteAccount: false,
	isConfigPasswordAccount: false,
	isAccountChangePassword: false,
	accounts: { results: [] },
	currentAccount: {},
	account: {},

	errors: {
		logIn: "",
		logOut: "",
		forgotPassword: "",
		resetPassword: "",
		getAccounts: "",
		createAccount: "",
		updateAccount: "",
		deleteAccount: "",
		configPasswordAccount: "",
		getCurrentAccount: "",
		getAccountById: "",
		accountChangePassword: "",
	},
};

const accountReducer = (state = initialState, actions) => {
	switch (actions.type) {
		case TypeActions.ACCOUNT_LOGIN_REQUEST:
			return {
				...state,
				isLogIn: true,
				errors: {
					...state.errors,
					logIn: "",
				},
			};
		case TypeActions.ACCOUNT_LOGIN_SUCCESS:
			return {
				...state,
				isLogIn: false,
				errors: {
					...state.errors,
					logIn: "",
				},
			};
		case TypeActions.ACCOUNT_LOGIN_FAILED:
			return {
				...state,
				isLogIn: false,
				errors: {
					...state.errors,
					logIn: actions.error,
				},
			};

		case TypeActions.ACCOUNT_LOGOUT_REQUEST:
			return {
				...state,
				isLogOut: true,
				errors: {
					...state.errors,
					logOut: "",
				},
			};
		case TypeActions.ACCOUNT_LOGOUT_SUCCESS:
			return {
				...state,
				isLogOut: false,
				errors: {
					...state.errors,
					logOut: "",
				},
			};
		case TypeActions.ACCOUNT_LOGOUT_FAILED:
			return {
				...state,
				isLogOut: false,
				errors: {
					...state.errors,
					logOut: actions.error,
				},
			};

		case TypeActions.ACCOUNT_FORGOT_PASSWORD_REQUEST:
			return {
				...state,
				isForgotPassword: true,
				errors: {
					...state.errors,
					forgotPassword: "",
				},
			};
		case TypeActions.ACCOUNT_FORGOT_PASSWORD_SUCCESS:
			return {
				...state,
				isForgotPassword: false,
				errors: {
					...state.errors,
					forgotPassword: "",
				},
			};
		case TypeActions.ACCOUNT_FORGOT_PASSWORD_FAILED:
			return {
				...state,
				isForgotPassword: false,
				errors: {
					...state.errors,
					forgotPassword: actions.error,
				},
			};

		case TypeActions.ACCOUNT_RESET_PASSWORD_REQUEST:
			return {
				...state,
				isResetPassword: true,
				errors: {
					...state.errors,
					resetPassword: "",
				},
			};
		case TypeActions.ACCOUNT_RESET_PASSWORD_SUCCESS:
			return {
				...state,
				isResetPassword: false,
				errors: {
					...state.errors,
					resetPassword: "",
				},
			};
		case TypeActions.ACCOUNT_RESET_PASSWORD_FAILED:
			return {
				...state,
				isResetPassword: false,
				errors: {
					...state.errors,
					resetPassword: actions.error,
				},
			};

		case TypeActions.GET_ACCOUNTS_REQUEST:
			return {
				...state,
				// accounts: { results: [] },
				isGetAccounts: true,
				errors: {
					...state.errors,
					getAccounts: "",
				},
			};

		case TypeActions.GET_ACCOUNTS_SUCCESS:
			return {
				...state,
				accounts: actions.data || { results: [] },
				isGetAccounts: false,
				errors: {
					...state.errors,
					getAccounts: "",
				},
			};

		case TypeActions.GET_ACCOUNTS_FAILED:
			return {
				...state,
				accounts: { results: [] },
				isGetAccounts: false,
				errors: {
					...state.errors,
					getAccounts: actions.error,
				},
			};

		case TypeActions.GET_CURRENT_ACCOUNT_REQUEST:
			return {
				...state,
				// currentAccount: {},
				isGetAccounts: true,
				errors: {
					...state.errors,
					getCurrentAccount: "",
				},
			};

		case TypeActions.GET_CURRENT_ACCOUNT_SUCCESS:
			return {
				...state,
				currentAccount: actions.data || {},
				isGetAccounts: false,
				errors: {
					...state.errors,
					getCurrentAccount: "",
				},
			};

		case TypeActions.GET_CURRENT_ACCOUNT_FAILED:
			return {
				...state,
				currentAccount: {},
				isGetAccounts: false,
				errors: {
					...state.errors,
					getCurrentAccount: actions.error,
				},
			};

		case TypeActions.GET_ACCOUNT_BY_ID_REQUEST:
			return {
				...state,
				// account: {},
				isGetAccountById: true,
				errors: {
					...state.errors,
					getAccountById: "",
				},
			};

		case TypeActions.GET_ACCOUNT_BY_ID_SUCCESS:
			return {
				...state,
				account: actions.data || {},
				isGetAccountById: false,
				errors: {
					...state.errors,
					getAccountById: "",
				},
			};

		case TypeActions.GET_ACCOUNT_BY_ID_FAILED:
			return {
				...state,
				account: {},
				isGetAccountById: false,
				errors: {
					...state.errors,
					getAccountById: actions.error,
				},
			};

		case TypeActions.CREATE_ACCOUNT_REQUEST:
			return {
				...state,
				isCreateAccount: true,
				errors: {
					...state.errors,
					createAccount: "",
				},
			};

		case TypeActions.CREATE_ACCOUNT_SUCCESS:
			return {
				...state,
				isCreateAccount: false,
				errors: {
					...state.errors,
					createAccount: "",
				},
			};

		case TypeActions.CREATE_ACCOUNT_FAILED:
			return {
				...state,
				isCreateAccount: false,
				errors: {
					...state.errors,
					createAccount: actions.error,
				},
			};

		case TypeActions.UPDATE_ACCOUNT_REQUEST:
			return {
				...state,
				isUpdateAccount: true,
				errors: {
					...state.errors,
					updateAccount: "",
				},
			};

		case TypeActions.UPDATE_ACCOUNT_SUCCESS:
			return {
				...state,
				isUpdateAccount: false,
				errors: {
					...state.errors,
					updateAccount: "",
				},
			};

		case TypeActions.UPDATE_ACCOUNT_FAILED:
			return {
				...state,
				isUpdateAccount: false,
				errors: {
					...state.errors,
					updateAccount: actions.error,
				},
			};

		case TypeActions.DELETE_ACCOUNT_REQUEST:
			return {
				...state,
				isDeleteAccount: true,
				errors: {
					...state.errors,
					deleteAccount: "",
				},
			};

		case TypeActions.DELETE_ACCOUNT_SUCCESS:
			return {
				...state,
				isDeleteAccount: false,
				errors: {
					...state.errors,
					deleteAccount: "",
				},
			};

		case TypeActions.DELETE_ACCOUNT_FAILED:
			return {
				...state,
				isDeleteAccount: false,
				errors: {
					...state.errors,
					deleteAccount: actions.error,
				},
			};

		case TypeActions.CONFIG_PASSWORD_ACCOUNT_REQUEST:
			return {
				...state,
				isConfigPasswordAccount: true,
				errors: {
					...state.errors,
					configPasswordAccount: "",
				},
			};

		case TypeActions.CONFIG_PASSWORD_ACCOUNT_SUCCESS:
			return {
				...state,
				isConfigPasswordAccount: false,
				errors: {
					...state.errors,
					configPasswordAccount: "",
				},
			};

		case TypeActions.CONFIG_PASSWORD_ACCOUNT_FAILED:
			return {
				...state,
				isConfigPasswordAccount: false,
				errors: {
					...state.errors,
					configPasswordAccount: actions.error,
				},
			};

		case TypeActions.ACCOUNT_CHANGE_PASSWORD_REQUEST:
			return {
				...state,
				isAccountChangePassword: true,
				errors: {
					...state.errors,
					accountChangePassword: "",
				},
			};

		case TypeActions.ACCOUNT_CHANGE_PASSWORD_SUCCESS:
			return {
				...state,
				isAccountChangePassword: false,
				errors: {
					...state.errors,
					accountChangePassword: "",
				},
			};

		case TypeActions.ACCOUNT_CHANGE_PASSWORD_FAILED:
			return {
				...state,
				isAccountChangePassword: false,
				errors: {
					...state.errors,
					accountChangePassword: actions.error,
				},
			};
		//!Default
		default:
			return {
				...state,
			};
	}
};
export default accountReducer;
