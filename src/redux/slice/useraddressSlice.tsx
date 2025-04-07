
import { createSlice } from "@reduxjs/toolkit";
import { TAddressData } from "@/schemas/useraddress.schema";
import { getUserAddress } from "../thunks/useraddressThunk";

export type UseraddressState = {
  loading: boolean;
  error: string | null;
  data: TAddressData[] | [];
};

const initialState: UseraddressState = {
  error: null,
  loading: false,
  data: [],
};

const userAddressSlice = createSlice({
  name: "userAddressSlice",
  initialState: initialState,
  reducers: {
    resetUseraddressData: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder
     
      .addCase(getUserAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserAddress.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getUserAddress.rejected, (state) => {
        state.error = "Failed to profile user";
        state.loading = false;
        state.error = null;
      });
  },
});

export const { resetUseraddressData } = userAddressSlice.actions;
export default userAddressSlice.reducer;
