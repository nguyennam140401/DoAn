import _ from "lodash";
import { call, put, takeLatest } from "redux-saga/effects";
import TypeActions from "Redux/TypeActions";
import { DELETE } from "Services/ServiceBase";
import { GET } from "Services/ServiceBase";
import { PATCH } from "Services/ServiceBase";
import { POST } from "Services/ServiceBase";
import ServiceURL from "Services/ServiceURL";

export function* getRoles(data) {
	const url = ServiceURL.roles + "?" + data.query;
	const callback = data.callback;
	try {
		const res = yield call(GET, url);

		if (res.message && !_.isEmpty(res?.message)) {
			yield put({
				type: TypeActions.GET_ROLES_FAILED,
				error: res?.error?.response?.data?.message,
			});
			!!callback?.failed &&
				callback.failed(res?.error?.response?.data?.message);
		} else {
			yield put({
				type: TypeActions.GET_ROLES_SUCCESS,
				data: res.data,
			});
			!!callback?.success && callback.success(res.data);
		}
	} catch (error) {
		yield put({
			type: TypeActions.GET_ROLES_FAILED,
			error: error?.response?.data?.message,
		});
		!!callback?.failed && callback.failed(error?.response?.data?.message);
	}
}

export function* createRole(data) {
	const url = ServiceURL.roles;
	const callback = data.callback;
	try {
		const res = yield call(POST, url, data.body);
		if (res.message && !_.isEmpty(res?.message)) {
			yield put({
				type: TypeActions.CREATE_ROLE_FAILED,
				error: res?.error?.response?.data?.message,
			});
			!!callback?.failed &&
				callback.failed(res?.error?.response?.data?.message);
		} else {
			yield put({
				type: TypeActions.CREATE_ROLE_SUCCESS,
			});
			!!callback?.success && callback.success();
		}
	} catch (error) {
		yield put({
			type: TypeActions.CREATE_ROLE_FAILED,
			error: error?.response?.data?.message,
		});
		!!callback?.failed && callback.failed(error?.response?.data?.message);
	}
}

export function* updateRole(data) {
	const url = ServiceURL.roles + "/" + data.params;
	const callback = data.callback;
	try {
		const res = yield call(PATCH, url, data.body);
		if (res.message && !_.isEmpty(res?.message)) {
			yield put({
				type: TypeActions.UPDATE_ROLE_FAILED,
				error: res?.error?.response?.data?.message,
			});
			!!callback?.failed &&
				callback.failed(res?.error?.response?.data?.message);
		} else {
			yield put({
				type: TypeActions.UPDATE_ROLE_SUCCESS,
			});
			!!callback?.success && callback.success();
		}
	} catch (error) {
		yield put({
			type: TypeActions.UPDATE_ROLE_FAILED,
			error: error?.response?.data?.message,
		});
		!!callback?.failed && callback.failed(error?.response?.data?.message);
	}
}

export function* deleteRole(data) {
	const url = ServiceURL.roles + "/" + data.params;
	const callback = data.callback;
	try {
		const res = yield call(DELETE, url);
		if (res.message && !_.isEmpty(res?.message)) {
			yield put({
				type: TypeActions.DELETE_ROLE_FAILED,
				error: res?.error?.response?.data?.message,
			});
			callback.failed && callback.failed(res?.error?.response?.data?.message);
		} else {
			yield put({
				type: TypeActions.DELETE_ROLE_SUCCESS,
			});
			callback.success && callback.success();
		}
	} catch (error) {
		yield put({
			type: TypeActions.DELETE_ROLE_FAILED,
			error: error?.response?.data?.message,
		});
		callback.failed && callback.failed(error?.response?.data?.message);
	}
}
export default function* roleSaga() {
	yield takeLatest(TypeActions.GET_ROLES_REQUEST, getRoles);
	yield takeLatest(TypeActions.CREATE_ROLE_REQUEST, createRole);
	yield takeLatest(TypeActions.DELETE_ROLE_REQUEST, deleteRole);
	yield takeLatest(TypeActions.UPDATE_ROLE_REQUEST, updateRole);
}
