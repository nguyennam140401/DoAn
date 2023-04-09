import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { brandPath } from "../../constant/apiPath";
export const brandAPI = createApi({
	reducerPath: "brandApi",
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.API_URL + "/" + brandPath,
	}),
	endpoints: (builder) => ({
		getBrands: builder.query({
			query: (params) => ({
				url: "",
				params: params,
			}),
		}),
		getBrandById: builder.query({
			query: (id) => `/${id}`,
		}),
		createBrand: builder.mutation({
			query: ({ name, email }) => ({
				url: "",
				method: "POST",
				body: { name, email },
			}),
		}),
		updateBrand: builder.mutation({
			query: ({ id, name, email }) => ({
				url: `/${id}`,
				method: "PUT",
				body: { name, email },
			}),
		}),
		deleteBrand: builder.mutation({
			query: (id) => ({
				url: `/${id}`,
				method: "DELETE",
			}),
		}),
	}),
});

export const {
	useGetBrandsQuery,
	useGetBrandByIdQuery,
	useCreateBrandMutation,
	useUpdateBrandMutation,
	useDeleteBrandMutation,
} = brandAPI;
