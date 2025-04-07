import { doPost } from "@/lib/axios";
import { TLoginResponse } from "@/schemas/login.schema";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk<
  TLoginResponse,
  { data: FormData }
>("registerUser", async ({ data }) => {
  try {
    const response = await doPost(`/register`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
});
