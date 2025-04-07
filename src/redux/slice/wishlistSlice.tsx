import { createSlice } from "@reduxjs/toolkit";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../thunks/wishlistThunk";
import { TWishlist } from "@/schemas/wishlist.schema";
import { TProduct } from "@/schemas/product.schema";

export type WishlistState = {
  loading: boolean;
  error: string | null;
  data: TProduct[] | [];
};

const initialState: WishlistState = {
  error: null,
  loading: false,
  data: [],
};

const wishlistSlice = createSlice({
  name: "wishlistSlice",
  initialState: initialState,
  reducers: {
    resetWishlistData: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getWishlist.rejected, (state) => {
        state.error = "Failed to fetch wishlist";
        state.loading = false;
        state.error = null;
      })
      .addCase(addToWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.data = [action.payload, ...state.data];
        state.loading = false;
        state.error = null;
      })
      .addCase(addToWishlist.rejected, (state) => {
        state.error = "Failed to add to wishlist";
        state.loading = false;
        state.error = null;
      })
      .addCase(removeFromWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.data = state.data.filter((item) => item.id !== action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(removeFromWishlist.rejected, (state) => {
        state.error = "Failed to remove from wishlist";
        state.loading = false;
        state.error = null;
      });
  },
});

export const { resetWishlistData } = wishlistSlice.actions;
export default wishlistSlice.reducer;
