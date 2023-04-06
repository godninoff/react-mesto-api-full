import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUserInfo } from "../types";

export const actionsApi = createApi({
  reducerPath: "actionsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3002/",
    credentials: "include",
  }),
  endpoints: (build) => ({
    editUser: build.mutation({
      query: (body: { name: string; about: string }) => {
        return {
          url: `userinfo`,
          method: "PATCH",
          body,
        };
      },
    }),
    getUserInfo: build.query<IUserInfo, number | null>({
      query: (id) => `userinfo/${id}`,
    }),
  }),
});

export const { useEditUserMutation, useGetUserInfoQuery } = actionsApi;
