import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../authSlice";
import { IUser } from "../types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3002/",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    signIn: build.mutation({
      query: (body: { email: string; password: string }) => {
        return {
          url: "signin",
          method: "POST",
          body,
        };
      },
    }),
    signUp: build.mutation({
      query: (body: { email: string; password: string }) => {
        return {
          url: "signup",
          method: "POST",
          body,
        };
      },
    }),
    getUser: build.query<IUser, number | null>({
      query: (id) => `users/${id}`,
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation, useGetUserQuery } =
  authApi;
