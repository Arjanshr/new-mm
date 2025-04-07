import { doGet } from "@/lib/axios";
import { TAddressData } from "@/schemas/useraddress.schema";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUserAddress = createAsyncThunk<TAddressData[], { token: string }>(
    "getUserAddress",
    async ({ token }) => {
      try {
        const response = await doGet(`/addresses`, {
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