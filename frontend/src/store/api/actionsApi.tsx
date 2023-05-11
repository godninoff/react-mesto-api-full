import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUserInfo } from "../types";

export const actionsApi = createApi({
  reducerPath: "actionsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3002/",
    credentials: "include",
  }),
  tagTypes: ["User"],
  endpoints: (build) => ({
    editUser: build.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: `userinfo/${data.userId}`,
          method: "PATCH",
          body: data.name,
        };
      },
      invalidatesTags: ["User"],
    }),
    getUserInfo: build.query<IUserInfo, number | null>({
      query: (id) => `userinfo/${id}`,
    }),
  }),
});

export const { useEditUserMutation, useGetUserInfoQuery } = actionsApi;
