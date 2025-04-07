import { doGet } from "@/lib/axios";
import { TBrand } from "@/schemas/brand.schema";
import { TCategory } from "@/schemas/category.schema";
import { TProduct } from "@/schemas/product.schema";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getBrand = createAsyncThunk<TBrand[]>("getBrand", async () => {
  try {
    const response = await doGet(`/brands`);
    return response;
  } catch (error: any) {
    throw error;
  }
});
export const getCategoryForBrand = createAsyncThunk<
  TCategory[],
  { id: number }
>("getCategoryForBrand", async ({ id }) => {
  try {
    const response = await doGet(`/products/get_categories_for_brand/${id}`);
    return response;
  } catch (error: any) {
    throw error;
  }
});

export const getBrandProducts = createAsyncThunk<
  { data: TProduct[]; total: number },
  {
    slug: string;
    page: number;
    pageSize: number;
    min_price: number;
    max_price: number;
    min_rating: number;
    max_rating: number;
    categories?: number[];
  }
>(
  "getBrandProducts",
  async ({
    slug,
    page,
    pageSize,
    min_price,
    max_price,
    min_rating,
    max_rating,
    categories,
  }) => {
    try {
      const categoryParams =
        categories?.map((cat) => `categories[]=${cat}`).join("&") || "";
      const response = await doGet(
        `/products/brands/${slug}/${pageSize}?page=${page}&min_price=${min_price}&max_price=${max_price}&min_rating=${min_rating}&max_rating=${max_rating}${
          categoryParams ? `&${categoryParams}` : ""
        }`
      );
      return response;
    } catch (error: any) {
      throw error;
    }
  }
);
