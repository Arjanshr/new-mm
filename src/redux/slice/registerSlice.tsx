import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { registerUser } from "../thunks/registerThunk";
import { TLoginResponse } from "@/schemas/login.schema";

export type RegisterState = {
  loading: boolean;
  error: string | null;
  data: TLoginResponse | null;
};

const initialState: RegisterState = {
  error: null,
  loading: false,
  data: null,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    resetRegisterData: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(registerUser.rejected, (state) => {
        state.error = "Failed to register user";
        state.loading = false;
        state.data = null;
      });
  },
});

export const { resetRegisterData } = registerSlice.actions;
export default registerSlice.reducer;
