import { doGet, doPost } from "@/lib/axios";
import {
  TCouponCheck,
  TCouponResponse,
  TMakeOrder,
  TOrder,
  TOrderItem,
} from "@/schemas/order.schema";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const makeOrder = createAsyncThunk<
  TMakeOrder,
  { data: TMakeOrder; token: string }
>("makeOrder", async ({ data, token }) => {
  try {
    const response = await doPost(`/orders/place`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
});

export const checkCoupon = createAsyncThunk<
  TCouponResponse,
  { data: TCouponCheck; token: string }
>("checkCoupon", async ({ data, token }) => {
  try {
    const response = await doPost(`/apply-coupon`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
});

export const getOrder = createAsyncThunk<TOrder[], { token: string }>(
  "getOrder",
  async ({ token }) => {
    try {
      const response = await doGet(`/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error: any) {
      throw error;
    }
  }
);

export const getOrderCancellations = createAsyncThunk<
  TOrder[],
  { token: string }
>("getOrderCancellations", async ({ token }) => {
  try {
    const response = await doGet(`/canceled-orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error: any) {
    throw error;
  }
});

export const getOrderItem = createAsyncThunk<
  TOrderItem[],
  { token: string; id: number }
>("getOrderItem", async ({ token, id }) => {
  try {
    const response = await doGet(`/order-items/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error: any) {
    throw error;
  }
});

export const cancelOrder = createAsyncThunk<
  TOrder,
  { id: number; token: string }
>("cancelOrder", async ({ id, token }) => {
  try {
    const response = await doPost(`/cancel-order/${id}`, undefined, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
});
