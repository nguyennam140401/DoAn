import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../../store";
import { ProductCart } from "./modal";

const initialState: Array<ProductCart> = [];

export const cartSlice = createSlice({
	name: "cartSlice",
	initialState,
	reducers: {
		addProduct: (state, action: PayloadAction<ProductCart>) => {
			if (state.find((item) => item.id === action.payload.id) !== null) {
				state.push(action.payload);
			} else {
				let productExist = state.find((item) => item.id === action.payload.id);
				if (productExist) {
					productExist.quantity += action.payload.quantity;
				}
			}
		},
		removeProduct: (state, action: PayloadAction<ProductCart>) => {
			state = state.filter((item) => item.id !== action.payload.id);
		},
	},
});

export const { addProduct, removeProduct } = cartSlice.actions;

export const quantityProductInCart = (state: AppState) =>
	state.cart.reduce((pre, current) => (pre += current.quantity), 0);

export default cartSlice.reducer;
