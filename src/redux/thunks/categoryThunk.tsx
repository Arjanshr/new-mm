import { doGet } from "@/lib/axios";
import { TBrand } from "@/schemas/brand.schema";
import { TCategory } from "@/schemas/category.schema";
import { TProduct } from "@/schemas/product.schema";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCategory = createAsyncThunk<TCategory[]>(
  "getCategory",
  async () => {
    try {
      const response = await doGet(`/categories`);
      return response;
    } catch (error: any) {
      throw error;
    }
  }
);

export const getBrandForCategory = createAsyncThunk<TBrand[], { id: number }>(
  "getBrandForCategory",
  async ({ id }) => {
    try {
      const response = await doGet(`/products/get_brands_for_category/${id}`);
      return response;
    } catch (error: any) {
      throw error;
    }
  }
);

export const getCategoryProducts = createAsyncThunk<
  { data: TProduct[]; total: number },
  {
    slug: string;
    page: number;
    pageSize: number;
    min_price: number;
    max_price: number;
    min_rating: number;
    max_rating: number;
    brands?: number[];
  }
>(
  "getCategoryProducts",
  async ({
    slug,
    page,
    pageSize,
    min_price,
    max_price,
    min_rating,
    max_rating,
    brands,
  }) => {
    try {
      const brandParams =
        brands?.map((cat) => `brands[]=${cat}`).join("&") || "";
      const response = await doGet(
        `/products/categories/${slug}/${pageSize}?page=${page}&min_price=${min_price}&max_price=${max_price}&min_rating=${min_rating}&max_rating=${max_rating}${
          brandParams ? `&${brandParams}` : ""
        }`
      );
      return response;
    } catch (error: any) {
      throw error;
    }
  }
);
