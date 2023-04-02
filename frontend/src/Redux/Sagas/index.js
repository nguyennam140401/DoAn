import { all, fork } from "redux-saga/effects";

import accountSaga from "./Account.saga";
import productSaga from "./Product.saga";
import categorySaga from "./Category.saga";
import roleSaga from "./Role.saga";
import orderSaga from "./Order.saga";
import brandSaga from "./Brand.saga";
export function* rootSagas() {
	yield all([fork(accountSaga)]);
	yield all([fork(productSaga)]);
	yield all([fork(categorySaga)]);
	yield all([fork(roleSaga)]);
	yield all([fork(orderSaga)]);
	yield all([fork(brandSaga)]);
}
export default rootSagas;
