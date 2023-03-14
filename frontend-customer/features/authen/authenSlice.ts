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
			localStorage.setItem("jwt", action.payload.tokens.access.token);
			localStorage.setItem("refreshtoken", action.payload.tokens.refresh.token);
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
