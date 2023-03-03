import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://example.com/api",
		prepareHeaders: (headers, { getState }) => {
			const token = localStorage.getItem("jwt");
			if (token) {
				headers.set("Authorization", `Bearer ${token}`);
			}
			return headers;
		},
	}),
	endpoints: (builder) => ({
		getUsers: builder.query({
			query: () => "/users",
		}),
		getUserById: builder.query({
			query: (id) => `/users/${id}`,
		}),
		createUser: builder.mutation({
			query: ({ name, email }) => ({
				url: "/users",
				method: "POST",
				body: { name, email },
			}),
		}),
		updateUser: builder.mutation({
			query: ({ id, name, email }) => ({
				url: `/users/${id}`,
				method: "PUT",
				body: { name, email },
			}),
		}),
		deleteUser: builder.mutation({
			query: (id) => ({
				url: `/users/${id}`,
				method: "DELETE",
			}),
		}),
	}),
});

export const {
	useGetUsersQuery,
	useGetUserByIdQuery,
	useCreateUserMutation,
	useUpdateUserMutation,
	useDeleteUserMutation,
} = apiSlice;
