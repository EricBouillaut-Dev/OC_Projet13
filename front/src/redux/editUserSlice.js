import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Action asynchrone pour mettre à jour les informations de l'utilisateur
export const updateUserData = createAsyncThunk(
  "editUser/updateUserData",
  async (
    { token, firstName, lastName },
    { rejectWithValue, dispatch, getState }
  ) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/api/v1/user/profile",
        { firstName, lastName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Mise à jour des informations de l'utilisateur dans le userSlice après la mise à jour réussie
      const userSlice = getState().user;
      dispatch(userSlice.actions.updateUserDetails(response.data));
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
        state.isEditing = false;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        // Gérer l'état rejected
      })
      .addCase(updateUserData.pending, (state) => {
        // Gérer l'état pending
      });
  },
});

export const { setEditedFirstName, setEditedLastName, setIsEditing } =
  editUserSlice.actions;

export default editUserSlice.reducer;
