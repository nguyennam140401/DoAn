import axios from "axios";
import { API_URL } from "../constant/apiPath";

export async function refreshToken() {
	const url = API_URL + "/auth/refresh-tokens";
	const res = await axios
		.post(url, {
			refreshToken: JSON.parse(localStorage.getItem("refreshtoken")).token,
		})
		.catch((err) => {
			window.history.pushState("", "", "/authen/SignIn");
			window.location.reload(false);
		});
	localStorage.setItem("refreshtoken", JSON.stringify(res.data.refresh));
	localStorage.setItem("jwt", JSON.stringify(res.data.access));
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
