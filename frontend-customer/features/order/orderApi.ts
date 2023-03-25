import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { isExpired } from "../../common/commonFunction";
import { TokenModel } from "../../common/model";
import { refreshToken } from "../../common/refreshToken";
import { orderPath } from "../../constant/apiPath";
export const orderAPI = createApi({
	reducerPath: "orderApi",
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.API_URL + "/" + orderPath,
		prepareHeaders: async (headers, { getState }) => {
			const tokenData: TokenModel = JSON.parse(
				localStorage.getItem("jwt") || ""
			);
			let token = tokenData.token;
			console.log(tokenData);
			// kiểm tra xem token có hết hạn hay không
			const isTokenExpired = isExpired(token);
			// nếu token đã hết hạn, gọi hàm refresh token để lấy token mới
			if (isTokenExpired) {
				console.log("Het han");
				token = await refreshToken(); // Gọi hàm refresh token để lấy token mới
			}
			console.log(token);
			headers.set("Authorization", `Bearer ${token}`);
			return headers;
		},
	}),
	endpoints: (builder) => ({
		getOrderById: builder.query({
			query: ({ status }) => ({
				url: `/`,
				method: "GET",
				params: {
					status: status,
				},
			}),
		}),
		createOrder: builder.mutation({
			query: (payload) => ({
				url: "",
				method: "POST",
				body: payload,
			}),
		}),
		getOrder: builder.query({
			query: () => ({
				url: "",
				method: "GET",
			}),
		}),
		removeItem: builder.query({
			query: (idProduct) => ({
				url: "/" + idProduct,
				method: "DELETE",
			}),
		}),
	}),
});

const responseHandler = async (response, retry) => {
	if (response.status === 401) {
		const newAccessToken = await refreshToken(); // Gọi hàm refresh token để lấy token mới
		if (newAccessToken) {
			// Thêm Authorization header vào request mới
			const newHeaders = new Headers(response.headers);
			newHeaders.set("Authorization", `Bearer ${newAccessToken}`);
			// Thực hiện lại request với token mới
			const { headers, ...init } = response;
			const newRequest = new Request(response.url, {
				...init,
				headers: newHeaders,
			});
			return retry(newRequest, init);
		}
	}
};
export const {
	useGetOrderByIdQuery,
	useCreateOrderMutation,
	useGetOrderQuery,
	useRemoveItemQuery,
} = orderAPI;
