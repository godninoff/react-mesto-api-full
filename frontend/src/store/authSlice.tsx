import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { store } from "./store";

export interface Auth {
  token: string | null;
}

const initialState: Auth = {
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getUserData: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },
    signOut(state) {
      state.token = null;
    },
    getUserId: (state) => state,
  },
});

export const { getUserData, signOut, getUserId } = authSlice.actions;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const selectToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;
