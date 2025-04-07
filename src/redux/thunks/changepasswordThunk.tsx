import { doPost } from "@/lib/axios";
import { TChangepassword } from "@/schemas/change-password.schema";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const changePassword = createAsyncThunk<
  TChangepassword,
  { data: TChangepassword; token: string }
>("changePassword", async ({ data, token }) => {
  try {
    await doPost(`/password/change`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
});
