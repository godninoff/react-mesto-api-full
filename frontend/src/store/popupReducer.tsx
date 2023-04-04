import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  popupIsOpen: false,
  authSuccess: false,
};

const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    changePopupState: (state) => {
      state.popupIsOpen = !state.popupIsOpen;
    },
    checkAuthSuccess: (state) => {
      state.authSuccess = !state.authSuccess;
    },
  },
});

export const { changePopupState, checkAuthSuccess } = popupSlice.actions;

export default popupSlice.reducer;
