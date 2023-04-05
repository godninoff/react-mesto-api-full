import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IUser } from "../types";

export const actionsApi = createApi({
  reducerPath: "actionsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3002/",
  }),
  endpoints: (build) => ({
    editUser: build.mutation<void, IUser>({
      query(id) {
        return {
          url: `users/${id}`,
          method: "PUT",
        };
      },
    }),
  }),
});

export const { useEditUserMutation } = actionsApi;
