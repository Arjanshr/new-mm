import { doGet } from "@/lib/axios";
import {
  TProduct,
  TProductDetail,
  TProductSpecification,
} from "@/schemas/product.schema";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProductSpecification = createAsyncThunk<
  TProductSpecification[],
  { id: number }
>("getProductSpecification", async ({ id }) => {
  try {
    const response = await doGet(`/product_specifications/${id}`);
    return response;
  } catch (error: any) {
    throw error;
  }
});

export const getProductFeature = createAsyncThunk<any[], { id: number }>(
  "getProductFeature",
  async ({ id }) => {
    try {
      const response = await doGet(`/product_features/${id}`);
      return response;
    } catch (error: any) {
      throw error;
    }
  }
);

export const getProductReview = createAsyncThunk<any[], { id: number }>(
  "getProductReview",
  async ({ id }) => {
    try {
      const response = await doGet(`/product_reviews/${id}`);
      return response;
    } catch (error: any) {
      throw error;
    }
  }
);
export const getRelatedProduct = createAsyncThunk<TProduct[], { id: number }>(
  "getRelatedProduct",
  async ({ id }) => {
    try {
      const response = await doGet(`/related_products/${id}`);
      return response;
    } catch (error: any) {
      throw error;
    }
  }
);

export const getProductDetail = createAsyncThunk<
  TProductDetail,
  { id: number }
>("getProductDetail", async ({ id }) => {
  try {
    const response = await doGet(`/product_detail/${id}`);
    return response;
  } catch (error: any) {
    throw error;
  }
});

export const getProductCompareDetail = createAsyncThunk<
  TProductDetail,
  { products?: number[] }
>("getProductCompareDetail", async ({ products }) => {
  try {
    const productParams =
      products?.map((id) => `product_id[]=${id}`).join("&") || "";
    const response = await doGet(
      `/compare-specifications?${productParams ? `&${productParams}` : ""}`
    );
    return response;
  } catch (error: any) {
    throw error;
  }
});

export const getSearchProducts = createAsyncThunk<
  { data: TProduct[] },
  {
    query: string;
    page: number;
    pageSize: number;
    min_price: number;
    max_price: number;
  }
>(
  "getSearchProducts",
  async ({ query, page, pageSize, min_price, max_price }) => {
    try {
      const response = await doGet(
        `/products/search/${pageSize}?query=${query}&page=${page}&min_price=${min_price}&max_price=${max_price}`
      );
      return response;
    } catch (error: any) {
      throw error;
    }
  }
);

export const getFeaturedProduct = createAsyncThunk<
  { data: TProduct[] },
  { page: number; pageSize: number }
>("getFeaturedProduct", async ({ page, pageSize }) => {
  try {
    const response = await doGet(
      `/content/featured-products/${pageSize}?page=${page}`
    );
    return response;
  } catch (error: any) {
    throw error;
  }
});
export const getNewArrivalProduct = createAsyncThunk<
  { data: TProduct[] },
  { page: number; pageSize: number }
>("getNewArrivalProduct", async ({ page, pageSize }) => {
  try {
    const response = await doGet(
      `/content/new-arriavals/${pageSize}?page=${page}`
    );
    return response;
  } catch (error: any) {
    throw error;
  }
});

export const getPopularProduct = createAsyncThunk<
  { data: TProduct[] },
  { page: number; pageSize: number }
>("getPopularProduct", async ({ page, pageSize }) => {
  try {
    const response = await doGet(
      `/content/popular-products/${pageSize}?page=${page}`
    );
    return response;
  } catch (error: any) {
    throw error;
  }
});
export const getCampaignProduct = createAsyncThunk<TProduct[], { id: number }>(
  "getCampaignProduct",
  async ({ id }) => {
    try {
      const response = await doGet(`/campaign_products/${id}`);
      return response;
    } catch (error: any) {
      throw error;
    }
  }
);
