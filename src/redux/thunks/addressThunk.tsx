import { doGet } from "@/lib/axios";
import { TOrderAddress, TShippingPrice } from "@/schemas/address.schema";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProvinces = createAsyncThunk<TOrderAddress[]>(
  "getProvinces",
  async () => {
    try {
      const response = await doGet(`/address/get-provinces`);
      return response;
    } catch (error: any) {
      throw error;
    }
  }
);

export const getCities = createAsyncThunk<TOrderAddress[], { id: number }>(
  "getCities",
  async ({ id }) => {
    try {
      const response = await doGet(`/address/get-cities/${id}`);
      return response;
    } catch (error: any) {
      throw error;
    }
  }
);
export const getAreas = createAsyncThunk<TOrderAddress[], { id: number }>(
  "getAreas",
  async ({ id }) => {
    try {
      const response = await doGet(`/address/get-areas/${id}`);
      return response;
    } catch (error: any) {
      throw error;
    }
  }
);
export const getShippingPrice = createAsyncThunk<
  TShippingPrice,
  { id: number }
>("getShippingPrice", async ({ id }) => {
  try {
    const response = await doGet(`/address/get-shipping-price/${id}`);
    return response;
  } catch (error: any) {
    throw error;
  }
});
