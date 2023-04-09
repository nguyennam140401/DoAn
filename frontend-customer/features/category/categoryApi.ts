import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { categoryPath } from "../../constant/apiPath";
export const categoryAPI = createApi({
	reducerPath: "categoryApi",
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.API_URL + "/" + categoryPath,
	}),
	endpoints: (builder) => ({
		getCategories: builder.query({
			query: (params) => ({
				url: "",
				params: params,
			}),
		}),
		getCategoryById: builder.query({
			query: (id) => `/${id}`,
		}),
		createCategory: builder.mutation({
			query: ({ name, email }) => ({
				url: "",
				method: "POST",
				body: { name, email },
			}),
		}),
		updateCategory: builder.mutation({
			query: ({ id, name, email }) => ({
				url: `/${id}`,
				method: "PUT",
				body: { name, email },
			}),
		}),
		deleteCategory: builder.mutation({
			query: (id) => ({
				url: `/${id}`,
				method: "DELETE",
			}),
		}),
	}),
});

export const {
	useGetCategoriesQuery,
	useGetCategoryByIdQuery,
	useCreateCategoryMutation,
	useUpdateCategoryMutation,
	useDeleteCategoryMutation,
} = categoryAPI;
