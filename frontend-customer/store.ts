import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import counterReducer from "./features/counter/counterSlice";
import cartReducer from "./features/cart/cartSlice";
import { productSlice } from "./features/product/productSlice";

export function makeStore() {
	return configureStore({
		reducer: {
			counter: counterReducer,
			cart: cartReducer,
			[productSlice.reducerPath]: productSlice.reducer,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(productSlice.middleware),
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
