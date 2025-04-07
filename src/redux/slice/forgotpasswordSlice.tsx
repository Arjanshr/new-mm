import { createSlice } from "@reduxjs/toolkit";
import { forgotPassword } from "../thunks/forgotpasswordThunk";
import { TForgotpassword } from "@/schemas/forgot-password.schema";

export type ForgotpasswordState = {
  loading: boolean;
  error: string | null;
  data: TForgotpassword | null;
};

const initialState: ForgotpasswordState = {
  error: null,
  loading: false,
  data: null,
};

const forgotpasswordSlice = createSlice({
  name: "forgotpasswordSlice",
  initialState: initialState,
  reducers: {
    resetForgotpasswordData: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state) => {
        state.error = "Failed to forgotpassword user";
        state.loading = false;
        state.error = null;
      });
  },
});

export const { resetForgotpasswordData } = forgotpasswordSlice.actions;
export default forgotpasswordSlice.reducer;
