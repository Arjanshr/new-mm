import { createSlice } from "@reduxjs/toolkit";
import {
  cancelOrder,
  checkCoupon,
  getOrder,
  getOrderCancellations,
  getOrderItem,
  makeOrder,
} from "../thunks/orderThunk";
import {
  TCouponResponse,
  TMakeOrder,
  TOrder,
  TOrderItem,
} from "@/schemas/order.schema";

export type OrderState = {
  loading: boolean;
  error: string | null;
  checkout: TMakeOrder | null;
  coupon: TCouponResponse | null;
  data: TOrder[];
  cancellations: TOrder[];
  cancelOrderData: TOrder | null;
  orderItems: TOrderItem[];
};

const initialState: OrderState = {
  error: null,
  loading: false,
  checkout: null,
  data: [],
  cancellations: [],
  orderItems: [],
  coupon: null,
  cancelOrderData: null,
};

const orderSlice = createSlice({
  name: "orderSlice",
  initialState: initialState,
  reducers: {
    resetOrderData: (state) => {
      state.checkout = null;
      state.coupon = null;
    },
    resetCancelOrderData: (state) => {
      state.cancelOrderData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(makeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(makeOrder.fulfilled, (state, action) => {
        state.checkout = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(makeOrder.rejected, (state) => {
        state.error = "Failed to order user";
        state.loading = false;
        state.error = null;
      })
      .addCase(checkCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkCoupon.fulfilled, (state, action) => {
        state.coupon = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(checkCoupon.rejected, (state) => {
        state.error = "Failed to order user";
        state.loading = false;
        state.error = null;
      })
      .addCase(getOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getOrder.rejected, (state) => {
        state.error = "Failed to order user";
        state.loading = false;
        state.error = null;
      })
      .addCase(getOrderItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderItem.fulfilled, (state, action) => {
        state.orderItems = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getOrderItem.rejected, (state) => {
        state.error = "Failed to order user";
        state.loading = false;
        state.error = null;
      })
      .addCase(cancelOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.cancelOrderData = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(cancelOrder.rejected, (state) => {
        state.error = "Failed to order user";
        state.loading = false;
        state.error = null;
      })
      .addCase(getOrderCancellations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderCancellations.fulfilled, (state, action) => {
        state.cancellations = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getOrderCancellations.rejected, (state) => {
        state.error = "Failed to order user";
        state.loading = false;
        state.error = null;
      });
  },
});

export const { resetOrderData, resetCancelOrderData } = orderSlice.actions;
export default orderSlice.reducer;
