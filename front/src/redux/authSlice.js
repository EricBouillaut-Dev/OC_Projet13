import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/login",
        { email, password }
      );
      console.log("Réponse du serveur à signIn:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erreur dans signIn:", error);
      if (!error.response) {
        // Handle network errors
        throw error;
      }
      // Handle errors from the server
      return rejectWithValue(
        error.response.data.message || "Erreur de connexion inconnue"
      );
    }
  }
);

export const reauthenticate = createAsyncThunk(
  "auth/reauthenticate",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/profile",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Réponse du serveur à reauthenticate:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erreur dans reauthenticate:", error);
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(
        error.response.data.message || "Erreur de reconnexion inconnue"
      );
    }
  }
);

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null;
      state.token = null;
      // Retirer le token du localStorage
      localStorage.removeItem("jwt");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        console.log("signIn réussi, mise à jour de l'état:", action.payload);
        state.isLoading = false;
        state.user = action.payload.body.email;
        state.token = action.payload.body.token;
        state.error = null;
        // Stocker le token dans le localStorage
        localStorage.setItem("jwt", action.payload.body.token);
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(reauthenticate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.body.email;
        state.token = action.payload.body.token;
        state.error = null;
      })
      .addCase(reauthenticate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { signOut } = authSlice.actions;

export default authSlice.reducer;
