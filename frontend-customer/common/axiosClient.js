import axios from "axios";
import { API_URL } from "../constant/apiPath";
import { refreshToken } from "./refreshToken";

export const axiosClient = axios.create({
	baseURL: API_URL,
	timeout: 15000,
});

axiosClient.interceptors.response.use(
	(response) => {
		// Nếu response trả về thành công, trả về response luôn
		return response;
	},
	async (error) => {
		const originalRequest = error.config;

		// Nếu lỗi là Unauthorized (mã lỗi 401) và chưa thực hiện refresh token
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			// Thực hiện refresh token
			const token = await refreshToken();

			// Cập nhật Authorization header của request bằng token mới
			axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;

			// Thực hiện lại request ban đầu với header mới
			return axiosClient(originalRequest);
		}

		// Nếu không phải lỗi Unauthorized hoặc đã thực hiện refresh token rồi, trả về lỗi luôn
		return Promise.reject(error);
	}
);
