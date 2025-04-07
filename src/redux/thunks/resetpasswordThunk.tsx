import { doPut } from "@/lib/axios";
import { TResetpassword } from "@/schemas/reset-password.schema";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const resetPassword = createAsyncThunk<TResetpassword, TResetpassword>(
  "resetPassword",
  async (data) => {
    try {
      await doPut(`/password/reset`, data);
      return data;
    } catch (error) {
      throw error;
    }
  }
);
