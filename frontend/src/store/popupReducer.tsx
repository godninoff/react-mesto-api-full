import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  closeAllPopups: false,
  authSuccess: false,
  isEditProfilePopupOpen: false,
  isAddPlacePopupOpen: false,
  isEditAvatarPopupOpen: false,
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
      state.isEditProfilePopupOpen = !state.isEditProfilePopupOpen;
    },
    isAddPlacePopupOpen: (state) => {
      state.isAddPlacePopupOpen = !state.isAddPlacePopupOpen;
    },
    isEditAvatarPopupOpen: (state) => {
      state.isEditAvatarPopupOpen = !state.isEditAvatarPopupOpen;
    },
  },
});

export const {
  closeAllPopups,
  checkAuthSuccess,
  isEditProfilePopupOpen,
  isAddPlacePopupOpen,
  isEditAvatarPopupOpen,
} = popupSlice.actions;

export default popupSlice.reducer;
