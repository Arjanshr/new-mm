import { createSlice } from "@reduxjs/toolkit";
import { resetPassword } from "../thunks/resetpasswordThunk";
import { TResetpassword } from "@/schemas/reset-password.schema";

export type ResetpasswordState = {
  loading: boolean;
  error: string | null;
  data: TResetpassword | null;
};

const initialState: ResetpasswordState = {
  error: null,
  loading: false,
  data: null,
};

const resetpasswordSlice = createSlice({
  name: "resetpasswordSlice",
  initialState: initialState,
  reducers: {
    resetResetpasswordData: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state) => {
        state.error = "Failed to resetpassword user";
        state.loading = false;
        state.error = null;
      });
  },
});

export const { resetResetpasswordData } = resetpasswordSlice.actions;
export default resetpasswordSlice.reducer;
