import { TCategory } from "@/schemas/category.schema";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getBrand,
  getBrandProducts,
  getCategoryForBrand,
} from "../thunks/brandThunk";
import { TProduct } from "@/schemas/product.schema";
import { TBrand } from "@/schemas/brand.schema";

interface BrandState {
  categories: TCategory[];
  products: TProduct[];
  data: TBrand[];
  total: number;
  loading: boolean;
  error: string | null;
  expires: number | null;
}

const initialState: BrandState = {
  categories: [],
  products: [],
  data: [],
  total: 1,
  loading: false,
  error: null,
  expires: null,
};

const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    resetBrandPage: (state) => {
      state.categories = [];
      state.products = [];
    },
  },
  extraReducers: (builder) => {
    builder
      //!Fetch
      .addCase(getBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.expires = null;
      })
      .addCase(getBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getBrand.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch brand data";
        state.expires = null;
      })
      .addCase(getCategoryForBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.expires = null;
      })
      .addCase(getCategoryForBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
        state.error = null;
      })
      .addCase(getCategoryForBrand.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch brand data";
        state.expires = null;
      })
      .addCase(getBrandProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.expires = null;
      })
      .addCase(getBrandProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload?.data;
        state.total = action.payload?.total;
        state.error = null;
      })
      .addCase(getBrandProducts.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch brand data";
        state.expires = null;
      });
  },
});
export const { resetBrandPage } = brandSlice.actions;
export default brandSlice.reducer;
