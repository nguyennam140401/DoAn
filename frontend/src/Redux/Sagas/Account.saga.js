import _ from "lodash";
import { call, put, takeLatest } from "redux-saga/effects";
import TypeActions from "Redux/TypeActions";
import ServiceURL from "Services/ServiceURL";
import { DELETE, GET, PATCH, POST } from "../../Services/ServiceBase";

export function* accountLogIn(data) {
	const url = ServiceURL.logIn;
	const callback = data.callback;
	try {
		const res = yield call(POST, url, data.body);

		if (res.message && !_.isEmpty(res?.message)) {
			yield put({
				type: TypeActions.ACCOUNT_LOGIN_FAILED,
				error: res?.error?.response?.data?.message,
			});
			!!callback?.failed &&
				callback.failed(res?.error?.response?.data?.message);
		} else {
			yield put({
				type: TypeActions.ACCOUNT_LOGIN_SUCCESS,
				data: res.data.user,
			});
			!!callback?.success && callback.success(res.data);
		}
	} catch (error) {
		yield put({
			type: TypeActions.ACCOUNT_LOGIN_FAILED,
			error: error?.response?.data?.message,
		});
		!!callback?.failed && callback.failed(error?.response?.data?.message);
	}
}

export function* accountLogOut(data) {
	const url = ServiceURL.logOut;
	localStorage.clear();
	try {
		const res = yield call(POST, url, data.body);

		if (res.message && !_.isEmpty(res?.message)) {
			yield put({
				type: TypeActions.ACCOUNT_LOGOUT_FAILED,
				error: res?.error?.response?.data?.message,
			});
		} else {
			yield put({
				type: TypeActions.ACCOUNT_LOGOUT_SUCCESS,
			});
		}
	} catch (error) {
		yield put({
			type: TypeActions.ACCOUNT_LOGOUT_FAILED,
			error: error?.response?.data?.message,
		});
	}
}

export function* forgotPassword(data) {
	const url = ServiceURL.forgotPassword;
	const callback = data.callback;
	try {
		const res = yield call(POST, url, data.body);
		if (res.message && !_.isEmpty(res?.message)) {
			yield put({
				type: TypeActions.ACCOUNT_FORGOT_PASSWORD_FAILED,
				error: res?.error?.response?.data?.message,
			});
			!!callback?.failed &&
				callback.failed(res?.error?.response?.data?.message);
		} else {
			yield put({
				type: TypeActions.ACCOUNT_FORGOT_PASSWORD_SUCCESS,
			});
			!!callback?.success && callback.success();
		}
	} catch (error) {
		yield put({
			type: TypeActions.ACCOUNT_FORGOT_PASSWORD_FAILED,
			error: error?.response?.data?.message,
		});
		!!callback?.failed && callback.failed(error?.response?.data?.message);
	}
}

export function* resetPassword(data) {
	const url = ServiceURL.resetPassword + "?" + data.query;
	const callback = data.callback;
	try {
		const res = yield call(POST, url, data.body);
		if (res.message && !_.isEmpty(res?.message)) {
			yield put({
				type: TypeActions.ACCOUNT_RESET_PASSWORD_FAILED,
				error: res?.error?.response?.data?.message,
			});
			!!callback?.failed &&
				callback.failed(res?.error?.response?.data?.message);
		} else {
			yield put({
				type: TypeActions.ACCOUNT_RESET_PASSWORD_SUCCESS,
			});
			!!callback?.success && callback.success();
		}
	} catch (error) {
		yield put({
			type: TypeActions.ACCOUNT_RESET_PASSWORD_FAILED,
			error: error?.response?.data?.message,
		});
		!!callback?.failed && callback.failed(error?.response?.data?.message);
	}
}

export function* getAccounts(data) {
	const url = ServiceURL.accounts + "?" + data.query;
	const callback = data.callback;
	try {
		const res = yield call(GET, url);

		if (res.message && !_.isEmpty(res?.message)) {
			yield put({
				type: TypeActions.GET_ACCOUNTS_FAILED,
				error: res?.error?.response?.data?.message,
			});
			!!callback?.failed &&
				callback.failed(res?.error?.response?.data?.message);
		} else {
			yield put({
				type: TypeActions.GET_ACCOUNTS_SUCCESS,
				data: res.data,
			});
			!!callback?.success && callback.success(res.data);
		}
	} catch (error) {
		yield put({
			type: TypeActions.GET_ACCOUNTS_FAILED,
			error: error?.response?.data?.message,
		});
		!!callback?.failed && callback.failed(error?.response?.data?.message);
	}
}

export function* getCurrentAccount(data) {
	const url = ServiceURL.accounts + "/" + data.params + "?" + data.query;
	const callback = data.callback;
	try {
		const res = yield call(GET, url);
		if (res.message && !_.isEmpty(res?.message)) {
			yield put({
				type: TypeActions.GET_CURRENT_ACCOUNT_FAILED,
				error: res?.error?.response?.data?.message,
			});
			!!callback?.failed &&
				callback.failed(res?.error?.response?.data?.message);
		} else {
			yield put({
				type: TypeActions.GET_CURRENT_ACCOUNT_SUCCESS,
				data: res.data,
			});
			!!callback?.success && callback.success(res);
		}
	} catch (error) {
		yield put({
			type: TypeActions.GET_CURRENT_ACCOUNT_FAILED,
			error: error?.response?.data?.message,
		});
		!!callback?.failed && callback.failed(error?.response?.data?.message);
	}
}

export function* getAccountById(data) {
	const url = ServiceURL.accounts + "/" + data.params + "?" + data.query;
	const callback = data.callback;
	try {
		const res = yield call(GET, url);
		if (res.message && !_.isEmpty(res?.message)) {
			yield put({
				type: TypeActions.GET_ACCOUNT_BY_ID_FAILED,
				error: res?.error?.response?.data?.message,
			});
			!!callback?.failed &&
				callback.failed(res?.error?.response?.data?.message);
		} else {
			yield put({
				type: TypeActions.GET_ACCOUNT_BY_ID_SUCCESS,
				data: res.data,
			});
			callback.success && callback.success(res.data);
		}
	} catch (error) {
		yield put({
			type: TypeActions.GET_ACCOUNT_BY_ID_FAILED,
			error: error?.response?.data?.message,
		});
		callback.failed && callback.failed(error?.response?.data?.message);
	}
}

export function* createAccount(data) {
	const url = ServiceURL.accounts;
	const callback = data.callback;
	try {
		const res = yield call(POST, url, data.body);
		if (res.message && !_.isEmpty(res?.message)) {
			yield put({
				type: TypeActions.CREATE_ACCOUNT_FAILED,
				error: res?.error?.response?.data?.message,
			});
			!!callback?.failed &&
				callback.failed(res?.error?.response?.data?.message);
		} else {
			yield put({
				type: TypeActions.CREATE_ACCOUNT_SUCCESS,
			});
			!!callback?.success && callback.success();
		}
	} catch (error) {
		yield put({
			type: TypeActions.CREATE_ACCOUNT_FAILED,
			error: error?.response?.data?.message,
		});
		!!callback?.failed && callback.failed(error?.response?.data?.message);
	}
}

export function* updateAccount(data) {
	const url = ServiceURL.accounts + "/" + data.params;
	const callback = data.callback;
	try {
		const res = yield call(PATCH, url, data.body);
		if (res.message && !_.isEmpty(res?.message)) {
			yield put({
				type: TypeActions.UPDATE_ACCOUNT_FAILED,
				error: res?.error?.response?.data?.message,
			});
			!!callback?.failed &&
				callback.failed(res?.error?.response?.data?.message);
		} else {
			yield put({
				type: TypeActions.UPDATE_ACCOUNT_SUCCESS,
			});
			!!callback?.success && callback.success();
		}
	} catch (error) {
		yield put({
			type: TypeActions.UPDATE_ACCOUNT_FAILED,
			error: error?.response?.data?.message,
		});
		!!callback?.failed && callback.failed(error?.response?.data?.message);
	}
}

export function* deleteAccount(data) {
	const url = ServiceURL.accounts + "/" + data.params;
	const callback = data.callback;
	try {
		const res = yield call(DELETE, url);
		if (res.message && !_.isEmpty(res?.message)) {
			yield put({
				type: TypeActions.DELETE_ACCOUNT_FAILED,
				error: res?.error?.response?.data?.message,
			});
			callback.failed && callback.failed(res?.error?.response?.data?.message);
		} else {
			yield put({
				type: TypeActions.DELETE_ACCOUNT_SUCCESS,
			});
			callback.success && callback.success();
		}
	} catch (error) {
		yield put({
			type: TypeActions.DELETE_ACCOUNT_FAILED,
			error: error?.response?.data?.message,
		});
		callback.failed && callback.failed(error?.response?.data?.message);
	}
}

// export function* configPasswordAccount(data) {
// 	const url = ServiceURL.accounts + "/" + ServiceURL.configPasswordAccount;
// 	const callback = data.callback;
// 	try {
// 		const res = yield call(POST, url, data.body);
// 		if (res.message && !_.isEmpty(res?.message)) {
// 			yield put({
// 				type: TypeActions.CONFIG_PASSWORD_ACCOUNT_FAILED,
// 				error: res?.error?.response?.data?.message,
// 			});
// 			!!callback?.failed &&
// 				callback.failed(res?.error?.response?.data?.message);
// 		} else {
// 			yield put({
// 				type: TypeActions.CONFIG_PASSWORD_ACCOUNT_SUCCESS,
// 			});
// 			!!callback?.success && callback.success();
// 		}
// 	} catch (error) {
// 		yield put({
// 			type: TypeActions.CONFIG_PASSWORD_ACCOUNT_FAILED,
// 			error: error?.response?.data?.message,
// 		});
// 		!!callback?.failed && callback.failed(error?.response?.data?.message);
// 	}
// }

// export function* accountChangePassword(data) {
// 	const url =
// 		ServiceURL.accounts + "/" + ServiceURL.changePassword + "/" + data.params;
// 	const callback = data.callback;
// 	try {
// 		const res = yield call(POST, url, data.body);
// 		if (res.message && !_.isEmpty(res?.message)) {
// 			yield put({
// 				type: TypeActions.ACCOUNT_CHANGE_PASSWORD_FAILED,
// 				error: res?.error?.response?.data?.message,
// 			});
// 			!!callback?.failed &&
// 				callback.failed(res?.error?.response?.data?.message);
// 		} else {
// 			yield put({
// 				type: TypeActions.ACCOUNT_CHANGE_PASSWORD_SUCCESS,
// 			});
// 			!!callback?.success && callback.success();
// 		}
// 	} catch (error) {
// 		yield put({
// 			type: TypeActions.ACCOUNT_CHANGE_PASSWORD_FAILED,
// 			error: error?.response?.data?.message,
// 		});
// 		!!callback?.failed && callback.failed(error?.response?.data?.message);
// 	}
// }

export default function* accountSaga() {
	yield takeLatest(TypeActions.ACCOUNT_LOGIN_REQUEST, accountLogIn);
	yield takeLatest(TypeActions.ACCOUNT_LOGOUT_REQUEST, accountLogOut);
	yield takeLatest(TypeActions.ACCOUNT_FORGOT_PASSWORD_REQUEST, forgotPassword);
	yield takeLatest(TypeActions.ACCOUNT_RESET_PASSWORD_REQUEST, resetPassword);

	yield takeLatest(TypeActions.GET_ACCOUNTS_REQUEST, getAccounts);
	yield takeLatest(TypeActions.GET_CURRENT_ACCOUNT_REQUEST, getCurrentAccount);
	// yield takeLatest(
	// 	TypeActions.CONFIG_PASSWORD_ACCOUNT_REQUEST,
	// 	configPasswordAccount
	// );
	yield takeLatest(TypeActions.DELETE_ACCOUNT_REQUEST, deleteAccount);
	yield takeLatest(TypeActions.GET_ACCOUNT_BY_ID_REQUEST, getAccountById);
	yield takeLatest(TypeActions.CREATE_ACCOUNT_REQUEST, createAccount);
	yield takeLatest(TypeActions.UPDATE_ACCOUNT_REQUEST, updateAccount);
	// yield takeLatest(
	// 	TypeActions.ACCOUNT_CHANGE_PASSWORD_REQUEST,
	// 	accountChangePassword
	// );
}
