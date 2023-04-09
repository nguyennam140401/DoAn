import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../../store";
import { ProductCart } from "./modal";

const initialState = {
	products: Array<ProductCart>,
	quantity: 0,
};

export const cartSlice = createSlice({
	name: "cartSlice",
	initialState,
	reducers: {
		setQuantity: (state, action: PayloadAction<number>) => {
			state.quantity = action.payload;
		},
	},
});

export const { setQuantity } = cartSlice.actions;

export const quantityProductInCart = (state: AppState) => state.cart.quantity;

export default cartSlice.reducer;
