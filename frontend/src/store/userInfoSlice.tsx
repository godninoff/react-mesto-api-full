import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { store } from "./store";
import { IUserInfo } from "./types";

const initialState: IUserInfo = {
  avatar: "",
  name: "",
  about: "",
  userId: 0,
};

export const userInfoSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    getUserInfo: (
      state,
      action: PayloadAction<{ avatar: string; name: string; about: string }>
    ) => {
      state.avatar = action.payload.avatar;
      state.name = action.payload.name;
      state.about = action.payload.about;
    },
  },
});

export const { getUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;
