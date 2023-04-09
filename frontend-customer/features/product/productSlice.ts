import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { productPath } from "../../constant/apiPath";
import { refreshToken } from "../../common/refreshToken";
export const productSlice = createApi({
	reducerPath: "productApi",
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.API_URL + "/" + productPath,
		prepareHeaders: (headers, { getState }) => {
			const token = localStorage.getItem("jwt");
			if (token) {
				headers.set("Authorization", `Bearer ${token}`);
			}
			return headers;
		},
	}),
	endpoints: (builder) => ({
		getProducts: builder.query({
			query: (params) => ({
				url: "",
				params: params,
			}),
		}),
		getProductById: builder.query({
			query: (id) => `/${id}`,
		}),
		createProduct: builder.mutation({
			query: ({ name, email }) => ({
				url: "",
				method: "POST",
				body: { name, email },
			}),
		}),
		updateProduct: builder.mutation({
			query: ({ id, name, email }) => ({
				url: `/${id}`,
				method: "PUT",
				body: { name, email },
			}),
		}),
		deleteProduct: builder.mutation({
			query: (id) => ({
				url: `/${id}`,
				method: "DELETE",
			}),
		}),
	}),
});

export const {
	useGetProductsQuery,
	useGetProductByIdQuery,
	useCreateProductMutation,
	useUpdateProductMutation,
	useDeleteProductMutation,
} = productSlice;
