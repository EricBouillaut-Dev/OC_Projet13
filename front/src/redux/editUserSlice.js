import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signIn } from "./authSlice";
import axios from "axios";

// Action asynchrone pour mettre à jour les informations de l'utilisateur
export const updateUserData = createAsyncThunk(
  "editUser/updateUserData",
  async ({ token, firstName, lastName }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/api/v1/user/profile",
        { firstName, lastName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(
        error.response.data.message || "Erreur de mise à jour inconnue"
      );
    }
  }
);

const initialState = {
  editedFirstName: "",
  editedLastName: "",
  isEditing: false,
};

const editUserSlice = createSlice({
  name: "editUser",
  initialState,
  reducers: {
    setEditedFirstName: (state, action) => {
      state.editedFirstName = action.payload;
    },
    setEditedLastName: (state, action) => {
      state.editedLastName = action.payload;
    },
    setIsEditing: (state, action) => {
      state.isEditing = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.editedFirstName = action.payload.firstName;
        state.editedLastName = action.payload.lastName;
        state.errorMessage = "";
        state.isEditing = false;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.errorMessage = action.payload || "Échec de la mise à jour";
        state.isEditing = false;
      })
      .addCase(updateUserData.pending, (state) => {
        state.errorMessage = "";
        state.isEditing = true;
      })
      .addCase(signIn.fulfilled, (state) => {
        state.isEditing = false; // Mettre isEditing à false lorsque l'authentification réussit
      });
  },
});

export const { setEditedFirstName, setEditedLastName, setIsEditing } =
  editUserSlice.actions;

export default editUserSlice.reducer;
