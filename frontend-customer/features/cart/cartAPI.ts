import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { cartPath } from "../../constant/apiPath";
export const CartAPI = createApi({
	reducerPath: "CartApi",
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.API_URL + "/" + cartPath,
		prepareHeaders: (headers, { getState }) => {
			const token = localStorage.getItem("jwt");
			if (token) {
				headers.set("Authorization", `Bearer ${token}`);
			}
			return headers;
		},
	}),
	endpoints: (builder) => ({
		getCartById: builder.query({
			query: (id) => `/${id}`,
		}),
		createCart: builder.mutation({
			query: ({ name, email }) => ({
				url: "",
				method: "POST",
				body: { name, email },
			}),
		}),
	}),
});

export const { useGetCartByIdQuery, useCreateCartMutation } = CartAPI;
