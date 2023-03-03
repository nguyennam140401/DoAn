import _ from "lodash";
import { call, put, takeLatest } from "redux-saga/effects";
import TypeActions from "Redux/TypeActions";
import { DELETE } from "Services/ServiceBase";
import { GET } from "Services/ServiceBase";
import { PATCH } from "Services/ServiceBase";
import { POST } from "Services/ServiceBase";
import ServiceURL from "Services/ServiceURL";

export function* getCategories(data) {
	const url = ServiceURL.category + "?" + data.query;
	const callback = data.callback;
	try {
		const res = yield call(GET, url);

		if (res.message && !_.isEmpty(res?.message)) {
			yield put({
				type: TypeActions.GET_CATEGORIES_FAILED,
				error: res?.error?.response?.data?.message,
			});
			!!callback?.failed &&
				callback.failed(res?.error?.response?.data?.message);
		} else {
			yield put({
				type: TypeActions.GET_CATEGORIES_SUCCESS,
				data: res.data,
			});
			!!callback?.success && callback.success(res.data);
		}
	} catch (error) {
		yield put({
			type: TypeActions.GET_CATEGORIES_FAILED,
			error: error?.response?.data?.message,
		});
		!!callback?.failed && callback.failed(error?.response?.data?.message);
	}
}

export function* createCategory(data) {
	const url = ServiceURL.category;
	const callback = data.callback;
	try {
		const res = yield call(POST, url, data.body);
		if (res.message && !_.isEmpty(res?.message)) {
			yield put({
				type: TypeActions.CREATE_CATEGORY_FAILED,
				error: res?.error?.response?.data?.message,
			});
			!!callback?.failed &&
				callback.failed(res?.error?.response?.data?.message);
		} else {
			yield put({
				type: TypeActions.CREATE_CATEGORY_SUCCESS,
			});
			!!callback?.success && callback.success();
		}
	} catch (error) {
		yield put({
			type: TypeActions.CREATE_CATEGORY_FAILED,
			error: error?.response?.data?.message,
		});
		!!callback?.failed && callback.failed(error?.response?.data?.message);
	}
}

export function* updateCategory(data) {
	const url = ServiceURL.category + "/" + data.params;
	const callback = data.callback;
	try {
		const res = yield call(PATCH, url, data.body);
		if (res.message && !_.isEmpty(res?.message)) {
			yield put({
				type: TypeActions.UPDATE_CATEGORY_FAILED,
				error: res?.error?.response?.data?.message,
			});
			!!callback?.failed &&
				callback.failed(res?.error?.response?.data?.message);
		} else {
			yield put({
				type: TypeActions.UPDATE_CATEGORY_SUCCESS,
			});
			!!callback?.success && callback.success();
		}
	} catch (error) {
		yield put({
			type: TypeActions.UPDATE_CATEGORY_FAILED,
			error: error?.response?.data?.message,
		});
		!!callback?.failed && callback.failed(error?.response?.data?.message);
	}
}

export function* deleteCategory(data) {
	const url = ServiceURL.category + "/" + data.params;
	const callback = data.callback;
	try {
		const res = yield call(DELETE, url);
		if (res.message && !_.isEmpty(res?.message)) {
			yield put({
				type: TypeActions.DELETE_CATEGORY_FAILED,
				error: res?.error?.response?.data?.message,
			});
			callback.failed && callback.failed(res?.error?.response?.data?.message);
		} else {
			yield put({
				type: TypeActions.DELETE_CATEGORY_SUCCESS,
			});
			callback.success && callback.success();
		}
	} catch (error) {
		yield put({
			type: TypeActions.DELETE_CATEGORY_FAILED,
			error: error?.response?.data?.message,
		});
		callback.failed && callback.failed(error?.response?.data?.message);
	}
}
export default function* categorySaga() {
	yield takeLatest(TypeActions.GET_CATEGORIES_REQUEST, getCategories);
	yield takeLatest(TypeActions.CREATE_CATEGORY_REQUEST, createCategory);
	yield takeLatest(TypeActions.UPDATE_CATEGORY_REQUEST, updateCategory);
	yield takeLatest(TypeActions.DELETE_CATEGORY_REQUEST, deleteCategory);
}
