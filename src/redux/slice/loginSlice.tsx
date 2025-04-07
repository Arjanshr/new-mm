import { createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  loginWithFacebook,
  loginWithGoogle,
} from "../thunks/loginThunk";
import { TLoginResponse } from "@/schemas/login.schema";

export type LoginState = {
  loading: boolean;
  error: string | null;
  data: TLoginResponse | null;
};

const initialState: LoginState = {
  error: null,
  loading: false,
  data: null,
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: initialState,
  reducers: {
    resetLoginData: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state) => {
        state.error = "Failed to login user";
        state.loading = false;
        state.error = null;
      })
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginWithGoogle.rejected, (state) => {
        state.error = "Failed to login user";
        state.loading = false;
        state.error = null;
      })
      .addCase(loginWithFacebook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithFacebook.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginWithFacebook.rejected, (state) => {
        state.error = "Failed to login user";
        state.loading = false;
        state.error = null;
      });
  },
});

export const { resetLoginData } = loginSlice.actions;
export default loginSlice.reducer;
