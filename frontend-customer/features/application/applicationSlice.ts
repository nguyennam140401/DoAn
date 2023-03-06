import { AppState } from "./../../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../../common/enum";

export interface AlertInterface {
	title?: string;
	description?: string;
	status: Status;
}
const initialState = {
	notifications: [],
};

const notificationsSlice = createSlice({
	name: "applicationSlice",
	initialState,
	reducers: {
		addNotification: (state, action: PayloadAction<AlertInterface>) => {
			let payload = action.payload;
			state.notifications.push(payload);
		},
		removeNotification: (state, action: PayloadAction<AlertInterface>) => {
			let payload = action.payload;
			state.notifications.splice(state.notifications.indexOf(payload), 1);
		},
	},
});

export const { addNotification, removeNotification } =
	notificationsSlice.actions;
export default notificationsSlice.reducer;
