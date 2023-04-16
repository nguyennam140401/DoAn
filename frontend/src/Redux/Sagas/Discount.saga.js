import _ from "lodash";
import { call, put, takeLatest } from "redux-saga/effects";
import TypeActions from "Redux/TypeActions";
import { DELETE } from "Services/ServiceBase";
import { GET } from "Services/ServiceBase";
import { PATCH } from "Services/ServiceBase";
import { POST } from "Services/ServiceBase";
import ServiceURL from "Services/ServiceURL";

export function* getDiscounts(data) {
	const url = ServiceURL.discount + "?" + data.query;
	const callback = data.callback;
	try {
		const res = yield call(GET, url);

		if (res.message && !_.isEmpty(res?.message)) {
			yield put({
				type: TypeActions.GET_DISCOUNTS_FAILED,
				error: res?.error?.response?.data?.message,
			});
			!!callback?.failed &&
				callback.failed(res?.error?.response?.data?.message);
		} else {
			yield put({
				type: TypeActions.GET_DISCOUNTS_SUCCESS,
				data: res.data,
			});
			!!callback?.success && callback.success(res.data);
		}
	} catch (error) {
		yield put({
			type: TypeActions.GET_DISCOUNTS_FAILED,
			error: error?.response?.data?.message,
		});
		!!callback?.failed && callback.failed(error?.response?.data?.message);
	}
}

export function* createDiscount(data) {
	const url = ServiceURL.discount;
	const callback = data.callback;
	try {
		const res = yield call(POST, url, data.body);
		if (res.message && !_.isEmpty(res?.message)) {
			yield put({
				type: TypeActions.CREATE_DISCOUNT_FAILED,
				error: res?.error?.response?.data?.message,
			});
			!!callback?.failed &&
				callback.failed(res?.error?.response?.data?.message);
		} else {
			yield put({
				type: TypeActions.CREATE_DISCOUNT_SUCCESS,
			});
			!!callback?.success && callback.success();
		}
	} catch (error) {
		yield put({
			type: TypeActions.CREATE_DISCOUNT_FAILED,
			error: error?.response?.data?.message,
		});
		!!callback?.failed && callback.failed(error?.response?.data?.message);
	}
}

export function* updateDiscount(data) {
	const url = ServiceURL.discount + "/" + data.params;
	const callback = data.callback;
	try {
		const res = yield call(PATCH, url, data.body);
		if (res.message && !_.isEmpty(res?.message)) {
			yield put({
				type: TypeActions.UPDATE_DISCOUNT_FAILED,
				error: res?.error?.response?.data?.message,
			});
			!!callback?.failed &&
				callback.failed(res?.error?.response?.data?.message);
		} else {
			yield put({
				type: TypeActions.UPDATE_DISCOUNT_SUCCESS,
			});
			!!callback?.success && callback.success();
		}
	} catch (error) {
		yield put({
			type: TypeActions.UPDATE_DISCOUNT_FAILED,
			error: error?.response?.data?.message,
		});
		!!callback?.failed && callback.failed(error?.response?.data?.message);
	}
}

export function* deleteDiscount(data) {
	const url = ServiceURL.discount + "/" + data.params;
	const callback = data.callback;
	try {
		const res = yield call(DELETE, url);
		if (res.message && !_.isEmpty(res?.message)) {
			yield put({
				type: TypeActions.DELETE_DISCOUNT_FAILED,
				error: res?.error?.response?.data?.message,
			});
			callback.failed && callback.failed(res?.error?.response?.data?.message);
		} else {
			yield put({
				type: TypeActions.DELETE_DISCOUNT_SUCCESS,
			});
			callback.success && callback.success();
		}
	} catch (error) {
		yield put({
			type: TypeActions.DELETE_DISCOUNT_FAILED,
			error: error?.response?.data?.message,
		});
		callback.failed && callback.failed(error?.response?.data?.message);
	}
}
export default function* discountSaga() {
	yield takeLatest(TypeActions.GET_DISCOUNTS_REQUEST, getDiscounts);
	yield takeLatest(TypeActions.CREATE_DISCOUNT_REQUEST, createDiscount);
	yield takeLatest(TypeActions.UPDATE_DISCOUNT_REQUEST, updateDiscount);
	yield takeLatest(TypeActions.DELETE_DISCOUNT_REQUEST, deleteDiscount);
}
