import { createSlice } from "@reduxjs/toolkit";
import { changePassword } from "../thunks/changepasswordThunk";
import { TChangepassword } from "@/schemas/change-password.schema";

export type ChangepasswordState = {
  loading: boolean;
  error: string | null;
  data: TChangepassword | null;
};

const initialState: ChangepasswordState = {
  error: null,
  loading: false,
  data: null,
};

const changepasswordSlice = createSlice({
  name: "changepasswordSlice",
  initialState: initialState,
  reducers: {
    resetChangepasswordData: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(changePassword.rejected, (state) => {
        state.error = "Failed to changepassword user";
        state.loading = false;
        state.error = null;
      });
  },
});

export const { resetChangepasswordData } = changepasswordSlice.actions;
export default changepasswordSlice.reducer;
