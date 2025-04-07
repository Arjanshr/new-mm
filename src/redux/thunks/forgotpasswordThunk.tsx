import { doPost } from "@/lib/axios";
import { TForgotpassword } from "@/schemas/forgot-password.schema";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const forgotPassword = createAsyncThunk<
  TForgotpassword,
  TForgotpassword
>("forgotPassword", async (data) => {
  try {
    await doPost(`/password/email`, data);
    return data;
  } catch (error) {
    throw error;
  }
});
