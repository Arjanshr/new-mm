import { doGet, doPost, doPut } from "@/lib/axios";
import { TProfile, TProfileEditSchema } from "@/schemas/profile.schema";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProfile = createAsyncThunk<TProfile, { token: string }>(
  "getProfile",
  async ({ token }) => {
    try {
      const response = await doGet(`/profile`, {
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

export const updateProfile = createAsyncThunk<
  TProfile,
  { data: FormData; token: string; callback: () => void }
>("updateProfile", async ({ data, token, callback }) => {
  try {
    const response = await doPost(`/profile`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    callback && callback();
    return response;
  } catch (error: any) {
    throw error;
  }
});
