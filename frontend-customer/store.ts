import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import counterReducer from "./features/counter/counterSlice";
import cartReducer from "./features/cart/cartSlice";
import authenReducer from "./features/authen/authenSlice";
import applicationReducer from "./features/application/applicationSlice";
import { productSlice } from "./features/product/productSlice";
import { authenApi } from "./features/authen/authenApi";
import { cartAPI } from "./features/cart/cartAPI";
import { orderAPI } from "./features/order/orderApi";

export function makeStore() {
	return configureStore({
		reducer: {
			counter: counterReducer,
			cart: cartReducer,
			[productSlice.reducerPath]: productSlice.reducer,
			[authenApi.reducerPath]: authenApi.reducer,
			[cartAPI.reducerPath]: cartAPI.reducer,
			[orderAPI.reducerPath]: orderAPI.reducer,
			authenReducer: authenReducer,
			application: applicationReducer,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware()
				.concat(productSlice.middleware)
				.concat(authenApi.middleware)
				.concat(cartAPI.middleware)
				.concat(orderAPI.middleware),
	});
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	AppState,
	unknown,
	Action<string>
>;

export default store;
