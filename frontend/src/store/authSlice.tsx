import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { store } from "./store";

export interface Auth {
  token: string | null;
  userId: number | null;
  id: number | null;
}

const initialState: Auth = {
  token: null,
  userId: null,
  id: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getUserData: (
      state,
      action: PayloadAction<{ token: string; userId: number; id: number }>
    ) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.id = action.payload.id;
    },

    signOut(state) {
      state = initialState;
    },
  },
});

export const { getUserData, signOut } = authSlice.actions;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default authSlice.reducer;
