import _ from "lodash";
import { call, put, takeLatest } from "redux-saga/effects";
import TypeActions from "Redux/TypeActions";
import { PATCHFILE } from "Services/ServiceBase";
import { POSTFILE } from "Services/ServiceBase";
import { DELETE } from "Services/ServiceBase";
import { GET } from "Services/ServiceBase";
import { PATCH } from "Services/ServiceBase";
import ServiceURL from "Services/ServiceURL";

export function* getProducts(data) {
	const url = ServiceURL.products + "?" + data.query;
	const callback = data.callback;
	try {
		const res = yield call(GET, url);

		if (res.message && !_.isEmpty(res?.message)) {
			yield put({
				type: TypeActions.GET_PRODUCTS_FAILED,
				error: res?.error?.response?.data?.message,
			});
			!!callback?.failed &&
				callback.failed(res?.error?.response?.data?.message);
		} else {
			yield put({
				type: TypeActions.GET_PRODUCTS_SUCCESS,
				data: res.data,
			});
			!!callback?.success && callback.success(res.data);
		}
	} catch (error) {
		yield put({
			type: TypeActions.GET_PRODUCTS_FAILED,
			error: error?.response?.data?.message,
		});
		!!callback?.failed && callback.failed(error?.response?.data?.message);
	}
}

export function* createProduct(data) {
	const url = ServiceURL.products;
	const callback = data.callback;
	try {
		const res = yield call(POSTFILE, url, data.body);
		if (res.message && !_.isEmpty(res?.message)) {
			yield put({
				type: TypeActions.CREATE_PRODUCT_FAILED,
				error: res?.error?.response?.data?.message,
			});
			!!callback?.failed &&
				callback.failed(res?.error?.response?.data?.message);
		} else {
			yield put({
				type: TypeActions.CREATE_PRODUCT_SUCCESS,
			});
			!!callback?.success && callback.success();
		}
	} catch (error) {
		yield put({
			type: TypeActions.CREATE_PRODUCT_FAILED,
			error: error?.response?.data?.message,
		});
		!!callback?.failed && callback.failed(error?.response?.data?.message);
	}
}

export function* updateProduct(data) {
	const url = ServiceURL.products + "/" + data.params;
	const callback = data.callback;
	try {
		const res = yield call(PATCHFILE, url, data.body);
		if (res.message && !_.isEmpty(res?.message)) {
			yield put({
				type: TypeActions.UPDATE_PRODUCT_FAILED,
				error: res?.error?.response?.data?.message,
			});
			!!callback?.failed &&
				callback.failed(res?.error?.response?.data?.message);
		} else {
			yield put({
				type: TypeActions.UPDATE_PRODUCT_SUCCESS,
			});
			!!callback?.success && callback.success();
		}
	} catch (error) {
		yield put({
			type: TypeActions.UPDATE_PRODUCT_FAILED,
			error: error?.response?.data?.message,
		});
		!!callback?.failed && callback.failed(error?.response?.data?.message);
	}
}

export function* deleteProduct(data) {
	const url = ServiceURL.products + "/" + data.params;
	const callback = data.callback;
	try {
		const res = yield call(DELETE, url);
		if (res.message && !_.isEmpty(res?.message)) {
			yield put({
				type: TypeActions.DELETE_PRODUCT_FAILED,
				error: res?.error?.response?.data?.message,
			});
			callback.failed && callback.failed(res?.error?.response?.data?.message);
		} else {
			yield put({
				type: TypeActions.DELETE_PRODUCT_SUCCESS,
			});
			callback.success && callback.success();
		}
	} catch (error) {
		yield put({
			type: TypeActions.DELETE_PRODUCT_FAILED,
			error: error?.response?.data?.message,
		});
		callback.failed && callback.failed(error?.response?.data?.message);
	}
}
export default function* productSaga() {
	yield takeLatest(TypeActions.GET_PRODUCTS_REQUEST, getProducts);
	yield takeLatest(TypeActions.CREATE_PRODUCT_REQUEST, createProduct);
	yield takeLatest(TypeActions.DELETE_PRODUCT_REQUEST, deleteProduct);
	yield takeLatest(TypeActions.UPDATE_PRODUCT_REQUEST, updateProduct);
}
