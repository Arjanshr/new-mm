import { errorToast } from "@/lib/toastify";
import { TCart } from "@/schemas/cart.schema";
import { createSlice } from "@reduxjs/toolkit";

interface BuyNowState {
  data: TCart[];
}

const initialState: BuyNowState = {
  data: [],
};

const buyNowSlice = createSlice({
  name: "buyNow",
  initialState,
  reducers: {
    addToBuyNow: (state, action) => {
      const existingCart = state.data.find(
        (cart) => cart.productId === action.payload.productId
      );
      if (existingCart) {
        // existingCart.quantity += action.payload.quantity || 1;
      } else {
        state.data.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });
      }
    },

    clearBuyNow: (state) => {
      state.data = [];
    },
  },
});

export const { addToBuyNow, clearBuyNow } = buyNowSlice.actions;
export default buyNowSlice.reducer;
