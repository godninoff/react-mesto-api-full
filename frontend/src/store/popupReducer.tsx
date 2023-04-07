import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  closeAllPopups: false,
  authSuccess: false,
  type: null,
};

const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    closeAllPopups: (state) => {
      state.closeAllPopups = !state.closeAllPopups;
    },
    checkAuthSuccess: (state, action) => {
      state.authSuccess = action.payload;
    },
    isEditProfilePopupOpen: (state) => {
      state.closeAllPopups = !state.closeAllPopups;
    },
    isAddPlacePopupOpen: (state) => {
      state.closeAllPopups = !state.closeAllPopups;
    },
    isEditAvatarPopupOpen: (state) => {
      state.closeAllPopups = !state.closeAllPopups;
    },
    setPopupType: (state, action) => {
      state.type = action.payload;
    },
  },
});

export const {
  closeAllPopups,
  checkAuthSuccess,
  isEditProfilePopupOpen,
  isAddPlacePopupOpen,
  isEditAvatarPopupOpen,
  setPopupType,
} = popupSlice.actions;

export default popupSlice.reducer;
