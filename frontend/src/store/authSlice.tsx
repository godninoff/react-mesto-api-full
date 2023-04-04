import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { store } from "./store";

export interface Auth {
  token: string | null;
  id: number | null;
}

const initialState: Auth = {
  token: null,
  id: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getUserData: (
      state,
      action: PayloadAction<{ token: string; id: number }>
    ) => {
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    signOut(state) {
      state.token = null;
      state.id = null;
    },
  },
});

export const { getUserData, signOut } = authSlice.actions;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const selectToken = (state: RootState) => state.auth.token;
export const selectUser = (state: RootState) => state.auth.id;

export default authSlice.reducer;
