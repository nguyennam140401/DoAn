import axios from "axios";
import { API_URL } from "../constant/apiPath";

export async function refreshToken() {
	const url = API_URL + "/auth/refresh-tokens";
	const res = await axios
		.post(url, {
			refreshToken: localStorage.getItem("refreshtoken"),
		})
		.catch((err) => {
			window.history.pushState("", "", "/authen/SignIn");
			window.location.reload(false);
		});
	localStorage.setItem("refreshtoken", res.data.refresh.token);
	localStorage.setItem("jwt", res.data.access.token);
	return res.data.access.token;
}

export function debounce(func, delay) {
	let timeoutId;
	return function () {
		const context = this;
		const args = arguments;
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			func.apply(context, args);
		}, delay);
	};
}
export default { refreshToken, debounce };
