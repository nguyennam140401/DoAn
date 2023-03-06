import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authenPath } from "../../constant/apiPath";
export const authenApi = createApi({
	reducerPath: "authenApi",
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.API_URL + "/" + authenPath,
		prepareHeaders: (headers, { getState }) => {
			const token = localStorage.getItem("jwt");
			if (token) {
				headers.set("Authorization", `Bearer ${token}`);
			}
			return headers;
		},
	}),
	endpoints: (builder) => ({
		getUser: builder.query({
			query: (params) => ({
				url: "",
				params: params,
			}),
		}),
		login: builder.mutation({
			query: (data) => ({
				url: `/login`,
				method: "POST",
				body: data,
			}),
		}),
		signUp: builder.mutation({
			query: (data) => ({
				url: `/register`,
				method: "POST",
				body: data,
			}),
		}),
	}),
});

export const { useSignUpMutation, useLoginMutation, useGetUserQuery } =
	authenApi;
