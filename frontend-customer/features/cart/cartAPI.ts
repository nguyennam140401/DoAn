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
			// const isTokenExpired = isExpired(token);
			// if (!isTokenExpired) {
			// 	token = await refreshToken(); // Gọi hàm refresh token để lấy token mới
			// }
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
			query: (params) => ({
				url: "",
				method: "GET",
				params,
			}),
		}),
		removeItem: builder.mutation({
			query: (params) => ({
				url: "/",
				params: params,
				method: "DELETE",
			}),
		}),
	}),
});

export const {
	useGetCartByIdQuery,
	useCreateCartMutation,
	useGetCartQuery,
	useRemoveItemMutation,
} = cartAPI;
