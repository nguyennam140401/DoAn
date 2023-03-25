import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { isExpired } from "../../common/commonFunction";
import { TokenModel } from "../../common/model";
import { refreshToken } from "../../common/refreshToken";
import { cartPath } from "../../constant/apiPath";
export const cartAPI = createApi({
	reducerPath: "cartApi",
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.API_URL + "/" + cartPath,
		prepareHeaders: async (headers, { getState }) => {
			const tokenData: TokenModel = JSON.parse(
				localStorage.getItem("jwt") || ""
			);
			let token = tokenData.token;
			const isTokenExpired = isExpired(token);
			if (!isTokenExpired) {
				token = await refreshToken(); // Gọi hàm refresh token để lấy token mới
			}
			headers.set("Authorization", `Bearer ${token}`);
			return headers;
		},
	}),
	endpoints: (builder) => ({
		getCartById: builder.query({
			query: (id) => `/${id}`,
		}),
		createCart: builder.mutation({
			query: (payload) => ({
				url: "",
				method: "POST",
				body: payload,
			}),
		}),
		getCart: builder.query({
			query: () => ({
				url: "",
				method: "GET",
			}),
		}),
		removeItem: builder.mutation({
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
	useGetCartByIdQuery,
	useCreateCartMutation,
	useGetCartQuery,
	useRemoveItemMutation,
} = cartAPI;
