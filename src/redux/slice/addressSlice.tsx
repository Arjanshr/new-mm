import { createSlice } from "@reduxjs/toolkit";
import {
  getAreas,
  getCities,
  getProvinces,
  getShippingPrice,
} from "../thunks/addressThunk";
import { TOrderAddress, TShippingPrice } from "@/schemas/address.schema";

interface AddressState {
  provinces: TOrderAddress[];
  cities: TOrderAddress[];
  areas: TOrderAddress[];
  shippingPrice: TShippingPrice | null;
  loading: boolean;
  error: string | null;
  expires: number | null;
}

const initialState: AddressState = {
  provinces: [],
  cities: [],
  areas: [],
  shippingPrice: null,
  loading: false,
  error: null,
  expires: null,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    resetCities: (state) => {
      state.cities = [];
    },
    resetAreas: (state) => {
      state.areas = [];
    },
    resetShippingPrice: (state) => {
      state.shippingPrice = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProvinces.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.expires = null;
      })
      .addCase(getProvinces.fulfilled, (state, action) => {
        state.loading = false;
        state.provinces = action.payload;
        state.error = null;
      })
      .addCase(getProvinces.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch province data";
        state.expires = null;
      })
      .addCase(getCities.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.expires = null;
      })
      .addCase(getCities.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = action.payload;
        state.error = null;
      })
      .addCase(getCities.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch province data";
        state.expires = null;
      })
      .addCase(getAreas.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.expires = null;
      })
      .addCase(getAreas.fulfilled, (state, action) => {
        state.loading = false;
        state.areas = action.payload;
        state.error = null;
      })
      .addCase(getAreas.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch province data";
        state.expires = null;
      })
      .addCase(getShippingPrice.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.expires = null;
      })
      .addCase(getShippingPrice.fulfilled, (state, action) => {
        state.loading = false;
        state.shippingPrice = action.payload;
        state.error = null;
      })
      .addCase(getShippingPrice.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch province data";
        state.expires = null;
      });
  },
});
export const { resetAreas, resetShippingPrice, resetCities } =
  addressSlice.actions;
export default addressSlice.reducer;
