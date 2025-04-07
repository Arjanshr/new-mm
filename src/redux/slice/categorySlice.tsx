import { TCategory } from "@/schemas/category.schema";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TProduct } from "@/schemas/product.schema";
import {
  getBrandForCategory,
  getCategory,
  getCategoryProducts,
} from "../thunks/categoryThunk";
import { TBrand } from "@/schemas/brand.schema";

interface CategoryState {
  products: TProduct[];
  brands: TBrand[];
  data: TCategory[];
  total: number;
  loading: boolean;
  error: string | null;
  expires: number | null;
}

const initialState: CategoryState = {
  products: [],
  brands: [],
  data: [],
  total: 1,
  loading: false,
  error: null,
  expires: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    resetCategorysPage: (state) => {
      state.products = [];
    },
  },
  extraReducers: (builder) => {
    builder
      //!Fetch
      .addCase(getCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.expires = null;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getCategory.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch category data";
        state.expires = null;
      })
      .addCase(getBrandForCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.expires = null;
      })
      .addCase(getBrandForCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload;
        state.error = null;
      })
      .addCase(getBrandForCategory.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch category data";
        state.expires = null;
      })

      .addCase(getCategoryProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.expires = null;
      })
      .addCase(getCategoryProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload?.data;
        state.total = action.payload?.total;
        state.error = null;
      })
      .addCase(getCategoryProducts.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch category data";
        state.expires = null;
      });
  },
});
export const { resetCategorysPage } = categorySlice.actions;
export default categorySlice.reducer;
