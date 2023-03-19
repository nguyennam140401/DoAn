import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLoggedIn: false,
	user: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		loginSuccess: (state, action) => {
			state.isLoggedIn = true;
			state.user = action.payload;
			localStorage.setItem("user", JSON.stringify(action.payload.user));
			localStorage.setItem("jwt", JSON.stringify(action.payload.tokens.access));
			localStorage.setItem(
				"refreshtoken",
				JSON.stringify(action.payload.tokens.refresh)
			);
		},
		logoutSuccess: (state) => {
			state.isLoggedIn = false;
			state.user = null;
			localStorage.removeItem("user");
			localStorage.removeItem("refreshtoken");
			localStorage.removeItem("jwt");
		},
		checkAuthen: (state) => {
			if (
				localStorage.getItem("user") &&
				localStorage.getItem("jwt") &&
				localStorage.getItem("refreshtoken")
			) {
				state.isLoggedIn = true;
				state.user = localStorage.getItem("user");
			}
		},
	},
});

export const { loginSuccess, logoutSuccess, checkAuthen } = authSlice.actions;
export default authSlice.reducer;
