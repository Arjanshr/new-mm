import { TProfile } from "@/schemas/profile.schema";
import { createSlice } from "@reduxjs/toolkit";
import { getProfile, updateProfile } from "../thunks/profileThunk";

export type ProfileState = {
  loading: boolean;
  error: string | null;
  data: TProfile | null;
};

const initialState: ProfileState = {
  error: null,
  loading: false,
  data: null,
};

const profileSlice = createSlice({
  name: "profileSlice",
  initialState: initialState,
  reducers: {
    resetProfileData: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state) => {
        state.error = "Failed to profile user";
        state.loading = false;
        state.error = null;
      })
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getProfile.rejected, (state) => {
        state.error = "Failed to profile user";
        state.loading = false;
        state.error = null;
      });
  },
});

export const { resetProfileData } = profileSlice.actions;
export default profileSlice.reducer;
