import { errorToast } from "@/lib/toastify";
import { TCart } from "@/schemas/cart.schema";
import { createSlice } from "@reduxjs/toolkit";

interface CartState {
  data: TCart[];
}

const initialState: CartState = {
  data: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingCart = state.data.find(
        (cart) => cart.productId === action.payload.productId
      );
      if (existingCart) {
        existingCart.quantity += action.payload.quantity || 1;
      } else {
        state.data.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });
      }
    },
    removeFromCart: (state, action) => {
      state.data = state.data.filter(
        (cart) => cart.productId !== action.payload.productId
      );
    },
    increaseQuantity: (state, action) => {
      const cart = state.data.find(
        (cart) => cart.productId === action.payload.productId
      );
      if (cart) {
        cart.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const cart = state.data.find(
        (cart) => cart.productId === action.payload.productId
      );
      if (cart) {
        if (cart.quantity > 1) {
          cart.quantity -= 1;
        } else {
          errorToast("Quantity maximum decreased");
        }
      }
    },
    clearCart: (state) => {
      state.data = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
