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

// Fonction pour décoder un JWT
const decodeToken = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

// Fonction pour vérifier si le token est valide
const isTokenValid = (token) => {
  const decodedToken = decodeToken(token);
  if (!decodedToken) {
    return false;
  }

  // Vérifier si le token est expiré
  const currentTime = Date.now() / 1000; // Convertit en secondes
  if (decodedToken.exp < currentTime) {
    return false;
  }

  return true;
};

// Récupération du token du localStorage
const savedToken = localStorage.getItem("jwt");

// Vérification de la validité du token
const isValidToken = savedToken ? isTokenValid(savedToken) : false;

const initialState = {
  user: null,
  token: isValidToken ? savedToken : null,
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
      });
  },
});

export const { signOut } = authSlice.actions;

export default authSlice.reducer;
