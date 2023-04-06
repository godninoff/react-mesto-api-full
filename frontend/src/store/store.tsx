import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userDataReducer from "./userInfoSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { authApi } from "./api/authApi";
import showPopupReducer from "./popupReducer";
import { actionsApi } from "./api/actionsApi";

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [actionsApi.reducerPath]: actionsApi.reducer,
  auth: authReducer,
  popup: showPopupReducer,
  userData: userDataReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authApi.middleware, actionsApi.middleware),
});

export const persistor = persistStore(store);
setupListeners(store.dispatch);
