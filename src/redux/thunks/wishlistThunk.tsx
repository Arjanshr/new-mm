import { doGet, doPost } from "@/lib/axios";
import { TProduct } from "@/schemas/product.schema";
import { TAddressData } from "@/schemas/useraddress.schema";
import { TWishlist } from "@/schemas/wishlist.schema";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getWishlist = createAsyncThunk<TProduct[], { token: string }>(
  "getWishlist",
  async ({ token }) => {
    try {
      const response = await doGet(`/wishlists`, {
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

export const addToWishlist = createAsyncThunk<
  TProduct,
  { productId: string; token: string; callback?: () => void }
>("addToWishlist", async ({ productId, token, callback }) => {
  try {
    const response = await doPost(`/add-to-wishlist/${productId}`, undefined, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    callback && callback();
    return response;
  } catch (error) {
    throw error;
  }
});

export const removeFromWishlist = createAsyncThunk<
  string,
  { productId: string; token: string; callback?: () => void }
>("removeFromWishlist", async ({ productId, token, callback }) => {
  try {
    const response = await doPost(
      `/remove-from-wishlist/${productId}`,
      undefined,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    callback && callback();
    return productId;
  } catch (error) {
    throw error;
  }
});
