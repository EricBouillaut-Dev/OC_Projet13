import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
// Importez d'autres slices si nécessaire

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // Ajoutez d'autres reducers ici si vous en avez
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      // Ajoutez d'autres middlewares si nécessaire
    }),
});

export default store;
